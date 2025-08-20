from PyQt6.QtWidgets import QApplication, QWidget, QMainWindow, QPushButton
import random

class MainWindow(QMainWindow):

  def __init__(self):
    super().__init__()

    self.setWindowTitle("My Girlfriend App")
    button = QPushButton("Press Me!")
    button.setCheckable(True)
    self.setCentralWidget(button)
    button.clicked.connect(self.no_button_clicked)

  def no_button_clicked(self):
    num = random.randint(0, 5)
    match num:
      case 0:
        print("You're so silly 😛")
      case 1:
        print("You hate me 😖")
      case 2:
        print("I'm taking Brandito back 😠")
      case 3:
        print("You have lost cuddle privileges 😤")
      case 4:
        print("Stinky poo 💩")
      case 5:
        print("One A 👊")

app = QApplication([])

window = MainWindow()
window.show()

app.exec()
