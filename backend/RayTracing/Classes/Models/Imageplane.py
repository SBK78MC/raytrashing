class Imageplane:
    """ This class helps to specify the plane that represents the final image in the Scene
        It gives the specifications for width and height on the desired image
    """

    def __init__(self, width=500, height=500):
        self.width = width
        self.height = height

    def getWidth(self):
        return self.width

    def getHeight(self):
        return self.height

    def setWidth(self, width):
        self.width = width

    def setHeight(self, height):
        self.height = height