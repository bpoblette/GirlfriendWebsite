from PyQt6.QtWidgets import QApplication, QWidget, QMainWindow, QPushButton, QLabel
import random

class MainWindow(QMainWindow):

  def __init__(self):
    super().__init__()

    self.setWindowTitle("My Girlfriend App")
    label =  QLabel("Do you love me?")
    yesButton = QPushButton("Yes")
    noButton = QPushButton("No")
    noButton.setCheckable(True)
    self.setCentralWidget(noButton)
    noButton.clicked.connect(self.no_button_clicked)

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
