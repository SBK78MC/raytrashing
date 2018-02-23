from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Vector import Vector


class Object3D:

    def __init__(self, x=0, y=0, z=0, color=Color(), specular=100, reflection=0.1):
        self.center = Vector(x, y, z)
        self.color = color
        self.specular = specular
        self.reflection = self.reflectionCheck(reflection)

    def __init__(self, center=Vector(0, 0, 0), color=Color(), specular=100, reflection=0.1):
        self.center = center
        self.color = color
        self.specular = specular
        self.reflection = reflection

    def intersection(self, ray):
        pass

    def getSurfaceNormal(self,point):
        pass

    def getCenter(self):
        return self.center

    def getColor(self):
        return self.color

    def getSpecular(self):
        return self.specular

    def getReflection(self):
        return self.reflection
