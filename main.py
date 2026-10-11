
from shapes import Rectangle, Square


def main():
    rect = Rectangle(10, 5)

    print("=== Rectangle ===")
    print(rect)
    print("Area:", rect.get_area())
    print("Perimeter:", rect.get_perimeter())
    print("Diagonal:", rect.get_diagonal())
    print("Picture:")
    print(rect.get_picture())

    sq = Square(4)

    print("=== Square ===")
    print(sq)
    print("Area:", sq.get_area())
    print("Perimeter:", sq.get_perimeter())
    print("Diagonal:", sq.get_diagonal())
    print("Picture:")
    print(sq.get_picture())

    rect.set_width(16)
    rect.set_height(8)

    print("Squares that fit inside rectangle:",
          rect.get_amount_inside(sq))


if __name__ == "__main__":
    main()
