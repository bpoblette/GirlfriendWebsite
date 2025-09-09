import random
import subprocess
from layout_colorwidget import Color
from PyQt6.QtWidgets import QApplication, QWidget, QMainWindow, QPushButton, QLabel, QVBoxLayout, QHBoxLayout
from PyQt6.QtGui import QFont, QScreen
from PyQt6.QtCore import Qt, QTimer

class MainWindow(QMainWindow):

  def __init__(self):
    super().__init__()
    self.setFixedSize(1000, 400)
    self.center_window()
    self.setWindowTitle("My Girlfriend App")
    self.vLayout = QVBoxLayout()
    hLayout = QHBoxLayout()
    widget = QWidget()

    self.label =  QLabel("Do you love me?")
    font = QFont("Noto Color Emoji")
    font.setPointSize(30)
    self.label.setFont(font)
    self.label.setAlignment(Qt.AlignmentFlag.AlignCenter)

    self.label2 = QLabel()
    self.label2.setFont(font)
    self.label2.setFixedHeight(50)
    self.label2.setAlignment(Qt.AlignmentFlag.AlignCenter)
    self.label2.hide()

    self.yesButton = QPushButton("Yes")
    self.yesButton.setCheckable(False) 

    self.noButton = QPushButton("No")
    self.noButton.setCheckable(False)

    #adding widgets to layout
    self.vLayout.addWidget(self.label)
    self.vLayout.addWidget(self.label2)
    hLayout.addWidget(self.yesButton)
    hLayout.addWidget(self.noButton)
    self.vLayout.addLayout(hLayout)
    widget.setLayout(self.vLayout)

    #set the positions of the widgets
    self.setCentralWidget(widget)

    #connecting the buttons to methods
    self.noButton.clicked.connect(self.no_button_clicked)
    self.yesButton.clicked.connect(self.yes_button_clicked)

  def yes_button_clicked(self):
    self.label.setText("You're cute :)") #change this so that the label updates its text
    def wait_and_close_browser():
      self.close()
      url = "http://localhost:3000"
      subprocess.Popen(["explorer.exe", url])

    try:
      subprocess.Popen(["node", "index.js"], shell=False)
      QTimer.singleShot(2000, wait_and_close_browser)
    except Exception as e:
      print(f"An error occurred: {e}")

  def no_button_clicked(self):
    num = random.randint(0, 5)
    self.label2.show()
    match num:
      case 0:
        self.label2.setText("You're so silly 😛")
      case 1:
        self.label2.setText("You hate me 😖")
      case 2:
        self.label2.setText("I'm taking Brandito back 😠")
      case 3:
        self.label2.setText("You have lost cuddle privileges 😤")
      case 4:
        self.label2.setText("Stinky poo 💩")
      case 5:
        self.label2.setText("One A 👊")

  def center_window(self):
    screen = self.screen().availableGeometry()
    window = self.frameGeometry()
    window.moveCenter(screen.center())
    self.move(window.topLeft())

app = QApplication([])

window = MainWindow()
window.show()

app.exec()
