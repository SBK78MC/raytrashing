from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Vector import Vector


class Object3D:

    def __init__(self, x=0, y=0, z=0, colorRGB=[0, 0, 0]):
        self.center = Vector(x, y, z)
        self.color = Color(colorRGB)

    def __init__(self, center=Vector(0, 0, 0), colorRGB=[0, 0, 0]):
        self.center = center
        self.color = Color(colorRGB)
        self.reflection = 10

    def intersection(self, ray):
        pass

    def getCenter(self):
        return self.center

    def getColor(self):
        return self.color
