class Tuple:
    """This class is used to save two numbers and return the smallest of the two when needed"""

    def __init__(self, x1=0.0, x2=1.0):
        self.x1 = x1
        self.x2 = x2

    def getSmallestPositive(self):
        if self.x1 > 0 and self.x2 > 0:
            return self.x1 if self.x1 < self.x2 else self.x2
        elif self.x1 > 0:
            return self.x1
        elif self.x2 > 0:
            return self.x2
        else:
            return 0

    def getx1(self):
        return self.x1

    def getx2(self):
        return self.x2

    def setx1(self, x1):
        self.x1 = x1

    def setx2(self, x2):
        self.x2 = x2
