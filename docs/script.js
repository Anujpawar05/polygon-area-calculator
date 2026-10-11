
const $ = (id) => document.getElementById(id);

const shapeSelect = $("shape");
const innerShapeSelect = $("innerShape");

function readDimension(id, label) {
    const input = $(id);
    const value = input.valueAsNumber;

    if (
        input.value.trim() === "" ||
        !Number.isFinite(value) ||
        !Number.isInteger(value) ||
        value < 1 ||
        value > 10000
    ) {
        throw new Error(
            `${label} must be a whole number between 1 and 10,000.`
        );
    }

    return value;
}

function getOuterDimensions() {
    if (shapeSelect.value === "square") {
        const side = readDimension("side", "Side length");
        return { width: side, height: side };
    }

    return {
        width: readDimension("width", "Width"),
        height: readDimension("height", "Height")
    };
}

function getInnerDimensions() {
    if (innerShapeSelect.value === "square") {
        const side = readDimension("innerSide", "Inner side");
        return { width: side, height: side };
    }

    return {
        width: readDimension("innerWidth", "Inner width"),
        height: readDimension("innerHeight", "Inner height")
    };
}

function formatNumber(value) {
    return Number(value.toFixed(6)).toString();
}

function createPicture(width, height) {
    if (width > 50 || height > 50) {
        return "Too big for picture.";
    }

    return Array.from(
        { length: height },
        () => "*".repeat(width)
    ).join("\n") + "\n";
}

function renderPreview(width, height) {
    // Scale the preview to fit the available screen space.
    const scale = Math.min(260 / width, 180 / height);

    const drawing = $("shapeDrawing");
    drawing.style.width = `${width * scale}px`;
    drawing.style.height = `${height * scale}px`;

    $("widthLabel").textContent = `Width: ${width}`;
    $("heightLabel").textContent = `Height: ${height}`;
    $("shapeBadge").textContent =
        shapeSelect.value === "square" ? "Square" : "Rectangle";
}

function calculateProperties() {
    $("error").textContent = "";

    try {
        const { width, height } = getOuterDimensions();

        const area = width * height;
        const perimeter = 2 * (width + height);
        const diagonal = Math.hypot(width, height);

        $("area").textContent = formatNumber(area);
        $("perimeter").textContent = formatNumber(perimeter);
        $("diagonal").textContent = formatNumber(diagonal);
        $("picture").textContent = createPicture(width, height);

        renderPreview(width, height);
    } catch (error) {
        $("error").textContent = error.message;
    }
}

function calculateFitting() {
    $("error").textContent = "";

    try {
        const outer = getOuterDimensions();
        const inner = getInnerDimensions();

        const horizontal = Math.floor(outer.width / inner.width);
        const vertical = Math.floor(outer.height / inner.height);
        const count = horizontal * vertical;

        $("fitCount").textContent = count;
    } catch (error) {
        $("error").textContent = error.message;
    }
}

function updateShapeFields() {
    const isSquare = shapeSelect.value === "square";

    $("squareFields").classList.toggle("hidden", !isSquare);
    $("rectangleFields").classList.toggle("hidden", isSquare);

    calculateProperties();
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

// Recalculate when visible dimensions change.
["width", "height", "side"].forEach((id) => {
    $(id).addEventListener("input", calculateProperties);
});

["innerWidth", "innerHeight", "innerSide"].forEach((id) => {
    $(id).addEventListener("input", calculateFitting);
});

// Initial display
updateShapeFields();
updateInnerFields();
