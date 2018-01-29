from Classes.Models.Vector import Vector


class Object3D:

    def __init__(self, x=0, y=0, z=0):
        self.center = Vector(x, y, z)

    def __init__(self, center=Vector(0, 0, 0)):
        self.center = center
        self.reflection = 10

    def intersection(self, ray):
        pass

    def getCenter(self):
        return self.center
