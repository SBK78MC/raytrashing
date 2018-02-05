class Color:

    def __init__(self, r=0.0, g=0.0, b=0.0):
        if 0.0 >= r >= 1.0 or 0.0 >= g >= 1.0 or 0.0 >= b >= 1.0:
            raise ValueError("Invalid RGB values!")
        self.color = [r, g, b]

    def __init__(self, color=[0.0,0.0,0.0]):
        if 0.0 >= color[0] >= 1.0 or 0.0 >= color[1] >= 1.0 or 0.0 >= color[2] >= 1.0:
            raise ValueError("Invalid RGB values!")
        self.color = color

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
