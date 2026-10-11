
const $ = (id) => document.getElementById(id);

const shapeSelect = $("shape");
const innerShapeSelect = $("innerShape");

function readDimension(id, label) {
    const input = $(id);
    const value = input.valueAsNumber;

    if (
        input.value.trim() === "" ||
        !Number.isFinite(value) ||
        value <= 0 ||
        value > 10000
    ) {
        throw new Error(
            `${label} must be greater than 0 and at most 10,000.`
        );
    }

    return value;
}

function getOuterShape() {
    const type = shapeSelect.value;

    if (type === "circle") {
        const radius = readDimension("radius", "Radius");
        return {
            type,
            radius,
            area: Math.PI * radius ** 2,
            perimeter: 2 * Math.PI * radius,
            width: radius * 2,
            height: radius * 2
        };
    }

    if (type === "triangle") {
        const a = readDimension("sideA", "Side A");
        const b = readDimension("sideB", "Side B");
        const c = readDimension("sideC", "Side C");

        if (a + b <= c || a + c <= b || b + c <= a) {
            throw new Error(
                "Invalid triangle: the sum of any two sides must exceed the third."
            );
        }

        const s = (a + b + c) / 2;
        const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        const height = (2 * area) / a;

        return {
            type,
            a,
            b,
            c,
            area,
            perimeter: a + b + c,
            width: a,
            height
        };
    }

    if (type === "square") {
        const side = readDimension("side", "Side length");
        return {
            type,
            width: side,
            height: side,
            area: side ** 2,
            perimeter: 4 * side
        };
    }

    const width = readDimension("width", "Width");
    const height = readDimension("height", "Height");

    return {
        type,
        width,
        height,
        area: width * height,
        perimeter: 2 * (width + height)
    };
}

function formatNumber(value) {
    return Number(value.toFixed(4)).toString();
}

function createPicture(width, height) {
    if (
        !Number.isInteger(width) ||
        !Number.isInteger(height) ||
        width > 50 ||
        height > 50
    ) {
        return "Picture available only for whole-number dimensions up to 50.";
    }

    return Array.from(
        { length: height },
        () => "*".repeat(width)
    ).join("\n") + "\n";
}

function updatePreview(shape) {
    const drawing = $("shapeDrawing");
    drawing.className = "shape-drawing";

    if (shape.type === "circle") {
        const diameter = Math.min(220, shape.radius * 2 * 20);
        drawing.classList.add("circle-preview");
        drawing.style.width = `${diameter}px`;
        drawing.style.height = `${diameter}px`;

        $("widthLabel").textContent = `Radius: ${formatNumber(shape.radius)}`;
        $("heightLabel").textContent = `Diameter: ${formatNumber(shape.radius * 2)}`;
    } else if (shape.type === "triangle") {
        drawing.classList.add("triangle-preview");
        drawing.style.width = "220px";
        drawing.style.height = "170px";

        $("widthLabel").textContent = `Side A: ${formatNumber(shape.a)}`;
        $("heightLabel").textContent = `Side B: ${formatNumber(shape.b)}`;
    } else {
        const scale = Math.min(
            240 / shape.width,
            170 / shape.height
        );

        drawing.style.width = `${shape.width * scale}px`;
        drawing.style.height = `${shape.height * scale}px`;

        $("widthLabel").textContent =
            `Width: ${formatNumber(shape.width)}`;
        $("heightLabel").textContent =
            `Height: ${formatNumber(shape.height)}`;
    }

    $("shapeBadge").textContent =
        shape.type.charAt(0).toUpperCase() + shape.type.slice(1);
}

function updatePicture(shape) {
    if (shape.type === "rectangle" || shape.type === "square") {
        $("picture").textContent = createPicture(
            shape.width,
            shape.height
        );
    } else if (shape.type === "circle") {
        $("picture").textContent =
            "Circle\n" +
            `Radius: ${formatNumber(shape.radius)}\n` +
            `Area: ${formatNumber(shape.area)}\n` +
            `Circumference: ${formatNumber(shape.perimeter)}`;
    } else {
        $("picture").textContent =
            "Triangle\n" +
            `Sides: ${formatNumber(shape.a)}, ` +
            `${formatNumber(shape.b)}, ${formatNumber(shape.c)}\n` +
            `Area: ${formatNumber(shape.area)}\n` +
            `Perimeter: ${formatNumber(shape.perimeter)}`;
    }
}

function calculateProperties() {
    $("error").textContent = "";

    try {
        const shape = getOuterShape();
        const diagonal =
            shape.type === "circle"
                ? shape.radius * 2
                : shape.type === "triangle"
                    ? Math.max(shape.a, shape.b, shape.c)
                    : Math.hypot(shape.width, shape.height);

        $("area").textContent = formatNumber(shape.area);
        $("perimeter").textContent = formatNumber(shape.perimeter);
        $("diagonal").textContent = formatNumber(diagonal);

        updatePreview(shape);
        updatePicture(shape);
    } catch (error) {
        $("error").textContent = error.message;
    }
}

function calculateFitting() {
    try {
        const outer = getOuterShape();

        if (outer.type === "circle" || outer.type === "triangle") {
            $("fitCount").textContent = "N/A";
            $("error").textContent =
                "Shape fitting is currently supported for rectangles and squares only.";
            return;
        }

        const innerWidth =
            innerShapeSelect.value === "square"
                ? readDimension("innerSide", "Inner side")
                : readDimension("innerWidth", "Inner width");

        const innerHeight =
            innerShapeSelect.value === "square"
                ? innerWidth
                : readDimension("innerHeight", "Inner height");

        $("fitCount").textContent = Math.floor(outer.width / innerWidth) *
            Math.floor(outer.height / innerHeight);

        $("error").textContent = "";
    } catch (error) {
        $("error").textContent = error.message;
    }
}

function updateShapeFields() {
    const type = shapeSelect.value;

    $("rectangleFields").classList.toggle("hidden", type !== "rectangle");
    $("squareFields").classList.toggle("hidden", type !== "square");
    $("circleFields").classList.toggle("hidden", type !== "circle");
    $("triangleFields").classList.toggle("hidden", type !== "triangle");

    calculateProperties();
    calculateFitting();
}

function updateInnerFields() {
    const isSquare = innerShapeSelect.value === "square";

    $("innerSquareFields").classList.toggle("hidden", !isSquare);
    $("innerRectangleFields").classList.toggle("hidden", isSquare);

    calculateFitting();
}

$("calculate").addEventListener("click", calculateProperties);
$("fitCalculate").addEventListener("click", calculateFitting);

shapeSelect.addEventListener("change", updateShapeFields);
innerShapeSelect.addEventListener("change", updateInnerFields);

[
    "width", "height", "side", "radius",
    "sideA", "sideB", "sideC"
].forEach((id) => {
    $(id).addEventListener("input", calculateProperties);
});

["innerWidth", "innerHeight", "innerSide"].forEach((id) => {
    $(id).addEventListener("input", calculateFitting);
});

updateShapeFields();
updateInnerFields();
