from PyQt6.QtWidgets import QWidget
from PyQt6.QtGui import QColor, QPalette

class Color(QWidget):
  def __init__(self,color):
    super().__init__()
    self.setAutoFillBackground(True)

    palette = self.palette()
    palette.setColor(QPalette.ColorRole.Window, QColor(color))
    self.setPalette(palette)
