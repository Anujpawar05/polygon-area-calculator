# Polygon Area Calculator

A Python project that calculates geometric properties of rectangles and squares using Object-Oriented Programming (OOP).

## Features

- Calculate area, perimeter, and diagonal.
- Change rectangle dimensions dynamically.
- Create ASCII pictures using asterisks (`*`).
- Calculate how many shapes fit inside another shape without rotation.
- Implement inheritance and method overriding with the `Square` subclass.
- Run automated unit tests using Python's built-in `unittest` framework.

## Project Structure

```text
Polegon-Area-Calculator/
├── shapes.py
├── main.py
├── tests/
│   └── test_shapes.py
├── README.md
└── .gitignore
```

## Requirements

- Python 3.10 or newer
- Git (optional, for version control)

No external Python packages are required.

## Getting Started

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Polegon-Area-Calculator
```

Run the application:

```bash
python main.py
```

Run the automated tests:

```bash
python -m unittest discover -s tests -v
```

## Example

```python
from shapes import Rectangle, Square

rectangle = Rectangle(10, 5)
print(rectangle.get_area())  # 50

square = Square(4)
print(square.get_area())     # 16
```

## Concepts Demonstrated

- Classes and objects
- Constructors
- Inheritance
- Method overriding
- Encapsulation through methods
- Unit testing

## License

This project is available for learning and educational purposes.