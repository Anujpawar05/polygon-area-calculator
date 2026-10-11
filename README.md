
# 📐 Polygon Area Calculator

An interactive geometry calculator built with **Python, HTML, CSS, and JavaScript**. Calculate geometric properties, visualize shapes, and explore dimensions through a responsive web interface.

🌐 **Live Demo:** https://anujpawar05.github.io/polygon-area-calculator/

📦 **Repository:** https://github.com/Anujpawar05/polygon-area-calculator

## ✨ Features

- **Rectangle:** Calculate area, perimeter, diagonal, and fitting capacity.
- **Square:** Calculate area, perimeter, and diagonal.
- **Circle:** Calculate area and circumference using the radius.
- **Triangle:** Calculate area using Heron's formula and calculate perimeter.
- **Shape Visualization:** View a graphical preview of the selected shape.
- **ASCII Pictures:** Generate star-based pictures of rectangles and squares.
- **Input Validation:** Handle invalid dimensions and triangle side lengths.
- **Responsive Design:** Use the calculator on desktop and mobile devices.
- **Automated Testing:** Test the Python implementation with `unittest`.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Python | Object-oriented geometry classes |
| HTML5 | Web page structure |
| CSS3 | Styling, animations, responsive layout |
| JavaScript | Interactive calculations and visualization |
| Git | Version control |
| GitHub Pages | Website hosting |

## 📂 Project Structure

```text
Polegon-Area-Calculator/
├── shapes.py
├── main.py
├── tests/
│   └── test_shapes.py
├── docs/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── README.md
└── .gitignore
```

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Anujpawar05/polygon-area-calculator.git
cd polygon-area-calculator
```

### 2. Run the Python application

```bash
python main.py
```

### 3. Open the website

Open `docs/index.html` in your browser.

No additional packages are required for the current Python implementation or static website.

## 🧪 Run Tests

```bash
python -m unittest discover -s tests -v
```

## 📐 Formulas

| Shape | Area | Perimeter |
|---|---|---|
| Rectangle | width × height | 2 × (width + height) |
| Square | side² | 4 × side |
| Circle | π × radius² | 2 × π × radius |
| Triangle | √[s(s − a)(s − b)(s − c)] | a + b + c |

For a triangle, `s = (a + b + c) / 2` is the semiperimeter.

## 🧠 Concepts Demonstrated

- Object-oriented programming
- Classes, objects, and constructors
- Inheritance and method overriding
- Mathematical calculations
- DOM manipulation and event handling
- Input validation
- Unit testing
- Git and GitHub deployment

## 🔮 Future Improvements

- Add more geometric shapes.
- Improve accessibility and keyboard navigation.
- Add automated browser tests.
- Improve shape-fitting calculations.
- Enhance visualizations and measurement labels.

## 👨‍💻 Author

**Anuj Pawar**

GitHub: https://github.com/Anujpawar05

---

If you find this project useful, consider giving the repository a ⭐ on GitHub.
