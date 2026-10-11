
import unittest
import math

from shapes import Rectangle, Square


class TestRectangle(unittest.TestCase):

    def test_area(self):
        self.assertEqual(Rectangle(3, 6).get_area(), 18)

    def test_perimeter(self):
        self.assertEqual(Rectangle(3, 6).get_perimeter(), 18)

    def test_diagonal(self):
        self.assertAlmostEqual(
            Rectangle(3, 6).get_diagonal(),
            math.sqrt(45)
        )

    def test_set_width(self):
        rect = Rectangle(3, 6)
        rect.set_width(5)
        self.assertEqual(rect.width, 5)

    def test_set_height(self):
        rect = Rectangle(3, 6)
        rect.set_height(8)
        self.assertEqual(rect.height, 8)

    def test_string_representation(self):
        self.assertEqual(
            str(Rectangle(3, 6)),
            "Rectangle(width=3, height=6)"
        )

    def test_picture(self):
        self.assertEqual(
            Rectangle(3, 2).get_picture(),
            "***\n***\n"
        )

    def test_picture_too_big(self):
        self.assertEqual(
            Rectangle(51, 2).get_picture(),
            "Too big for picture."
        )

    def test_amount_inside(self):
        self.assertEqual(
            Rectangle(15, 10).get_amount_inside(Square(5)),
            6
        )

    def test_rectangle_inside_rectangle(self):
        self.assertEqual(
            Rectangle(4, 8).get_amount_inside(Rectangle(3, 6)),
            1
        )

    def test_shape_does_not_fit(self):
        self.assertEqual(
            Rectangle(2, 3).get_amount_inside(Rectangle(3, 6)),
            0
        )


class TestSquare(unittest.TestCase):

    def test_inheritance(self):
        square = Square(5)
        self.assertIsInstance(square, Square)
        self.assertIsInstance(square, Rectangle)
        self.assertIsNot(type(square), Rectangle)

    def test_area(self):
        self.assertEqual(Square(5).get_area(), 25)

    def test_perimeter(self):
        self.assertEqual(Square(5).get_perimeter(), 20)

    def test_diagonal(self):
        self.assertAlmostEqual(
            Square(5).get_diagonal(),
            math.sqrt(50)
        )

    def test_string_representation(self):
        self.assertEqual(str(Square(5)), "Square(side=5)")

    def test_set_side(self):
        square = Square(5)
        square.set_side(4)
        self.assertEqual(square.width, 4)
        self.assertEqual(square.height, 4)
        self.assertEqual(str(square), "Square(side=4)")

    def test_set_width(self):
        square = Square(5)
        square.set_width(7)
        self.assertEqual(square.width, 7)
        self.assertEqual(square.height, 7)

    def test_set_height(self):
        square = Square(5)
        square.set_height(3)
        self.assertEqual(square.width, 3)
        self.assertEqual(square.height, 3)

    def test_picture(self):
        self.assertEqual(
            Square(2).get_picture(),
            "**\n**\n"
        )


if __name__ == "__main__":
    unittest.main()
