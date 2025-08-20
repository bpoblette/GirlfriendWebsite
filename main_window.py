from PyQt6.QtWidgets import QApplication, QWidget, QMainWindow, QPushButton

class MainWindow(QMainWindow):

  def __init__(self):
    super().__init__()

    self.setWindowTitle("My Girlfriend App")
    button = QPushButton("Press Me!")
    button.setCheckable(True)
    self.setCentralWidget(button)


app = QApplication([])

window = MainWindow()
window.show()

app.exec()
