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

    def multiply(self, multiplier):
        redV = self.checkNotOutbound(self.color[0] * multiplier)
        greenV = self.checkNotOutbound(self.color[1] * multiplier)
        blueV = self.checkNotOutbound(self.color[2] * multiplier)
        newColor = Color(redV, greenV, blueV)
        return newColor

    def multiplyColor(self, color):
        redV = self.checkNotOutbound(self.color[0] * color.getR())
        greenV = self.checkNotOutbound(self.color[1] * color.getG())
        blueV = self.checkNotOutbound(self.color[2] * color.getB())
        newColor = Color(redV, greenV, blueV)
        return newColor

    def add(self, addition):
        redV = self.checkNotOutbound(self.color[0] + addition.getR())
        greenV = self.checkNotOutbound(self.color[1] + addition.getG())
        blueV = self.checkNotOutbound(self.color[2] + addition.getB())
        newColor = Color(redV, greenV, blueV)
        return newColor

    def averageColors(self, colors):
        totalR = self.getR()
        totalG = self.getG()
        totalB = self.getB()
        for rgb in colors:
            totalR += rgb.getR()
            totalG += rgb.getG()
            totalB += rgb.getB()

        rValue = totalR/ (len(colors)+1)
        gValue = totalG / (len(colors)+1)
        bValue = totalB / (len(colors)+1)
        return Color(rValue, gValue, bValue)


    def checkNotOutbound(self, value):
        if value > 1:
            value = 1

        if value < 0:
            value = 0

        return value

