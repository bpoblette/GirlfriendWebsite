from PyQt6.QtWidgets import QApplication, QWidget, QMainWindow, QPushButton, QLabel
import random
import time
import subprocess

class MainWindow(QMainWindow):

  def __init__(self):
    super().__init__()

    self.setWindowTitle("My Girlfriend App")
    self.label =  QLabel("Do you love me?")
    
    self.yesButton = QPushButton("Yes")
    self.yesButton.setCheckable(True)

    self.noButton = QPushButton("No")
    self.noButton.setCheckable(True)

    #set the positions of the widgets
    self.setCentralWidget(self.noButton)

    #connecting the buttons to methods
    self.noButton.clicked.connect(self.no_button_clicked)
    self.yesButton.clicked.connect(self.yes_button_clicked)


  def yes_button_clicked(self):
    self.label.setText("You're cute :)") #change this so that the label updates its text
    time.sleep(5)
    try:
      process = subprocess.Popen(["node", "index.js"], shell=False)
      process.wait()
    except Exception as e:
      print(f"An error occurred: {e}")

  def no_button_clicked(self):
    num = random.randint(0, 5)
    match num:
      case 0:
        self.label.setText("You're so silly 😛")
      case 1:
        self.label.setText("You hate me 😖")
      case 2:
        self.label.setText("I'm taking Brandito back 😠")
      case 3:
        self.label.setText("You have lost cuddle privileges 😤")
      case 4:
        self.label.setText("Stinky poo 💩")
      case 5:
        self.label.setText("One A 👊")

app = QApplication([])

window = MainWindow()
window.show()

app.exec()
