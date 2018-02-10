class Color(object):

    def __init__(self):
        self.color = [0, 0, 0]

    def __init__(self, r=float(0), g=float(0), b=float(0)):
        if self.isValid(r, g, b) == False:
            raise ValueError("Invalid RGB values!")
        self.color = [r, g, b]

    def isValid(self, r, g, b):
        if 0.0 <= r <= 1.0 or 0.0 <= g <= 1.0 or 0.0 <= b <= 1.0:
            return True
        else:
            return False

    def red(self):
        self.color = [1.0, 0.0, 0.0]

    def green(self):
        self.color = [0.0, 1.0, 0.0]

    def blue(self):
        self.color = [0.0, 0.0, 1.0]

    def black(self):
        self.color = [0.0, 0.0, 0.0]

    def white(self):
        self.color = [1.0, 1.0, 1.0]

    def getArray(self):
        return self.color

    def getR(self):
        return self.color[0]

    def getG(self):
        return self.color[1]

    def getB(self):
        return self.color[2]

    def isBrighterOrEqualTo(self, otherColor):
        if self.getR() >= otherColor.getR() and self.getB() >= otherColor.getB() and self.getG() >= otherColor.getG():
            return True
        else:
            return False
