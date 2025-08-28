import random
import time
import subprocess
from layout_colorwidget import Color
from PyQt6.QtWidgets import QApplication, QWidget, QMainWindow, QPushButton, QLabel, QVBoxLayout, QHBoxLayout
from PyQt6.QtGui import QFont



class MainWindow(QMainWindow):

  def __init__(self):
    super().__init__()

    self.setWindowTitle("My Girlfriend App")
    self.vLayout = QVBoxLayout()
    hLayout = QHBoxLayout()
    widget = QWidget()

    self.label =  QLabel("Do you love me?")
    font = QFont("Segoe UI Emoji")
    font.setPointSize(30)
    self.label.setFont(font)
    self.label2 = QLabel()
    self.label2.setFont(font)
    self.label2.hide()

    self.yesButton = QPushButton("Yes")
    self.yesButton.setCheckable(True)

    self.noButton = QPushButton("No")
    self.noButton.setCheckable(True)

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
    try:
      process = subprocess.Popen(["node", "index.js"], shell=False)
      process.wait()
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

app = QApplication([])

window = MainWindow()
window.show()

app.exec()
