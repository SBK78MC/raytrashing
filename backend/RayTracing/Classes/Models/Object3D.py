from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Vector import Vector


class Object3D:
    """Object3D is the superclass of every other shape that can exist, it includes the basic properties that
    all objects share, like a center, a color, their refractiveIndex and also the degree of specular reflection,
     reflectivity and transparency"""

    def __init__(self, x=0, y=0, z=0, color=Color(), specular=100, reflection=0.1, transparency=0, refractiveIndex=1.0):
        self.center = Vector(x, y, z)
        self.color = color
        self.specular = specular
        self.reflection = reflection
        self.transparency = transparency
        self.checkReflectionAndTransparencyLimit()
        self.refractiveIndex = refractiveIndex

    def __init__(self, center=Vector(0, 0, 0), color=Color(), specular=100, reflection=0.1, transparency=0, refractiveIndex=1.0):
        self.center = center
        self.color = color
        self.specular = specular
        self.reflection = reflection
        self.transparency = transparency
        self.checkReflectionAndTransparencyLimit()
        self.refractiveIndex = refractiveIndex

    def intersection(self, ray, tMin, tMax):
        pass

    def getSurfaceNormal(self, point):
        pass

    def getCenter(self):
        return self.center

    def getColor(self):
        return self.color

    def getMaterial(self):
        return self.material

    def getRefractiveIndex(self):
        return self.refractiveIndex

    def getSpecular(self):
        return self.specular

    def getReflection(self):
        return self.reflection

    def getTransparency(self):
        return self.transparency

    # Checks that the sum of reflection and transparency is not over 1.0 and if it is it reduces them accordingly
    def checkReflectionAndTransparencyLimit(self):
        totalReflAndTrans = self.reflection + self.transparency
        if totalReflAndTrans > 1.0:
            self.reflection = self.reflection / totalReflAndTrans
            self.transparency = self.transparency / totalReflAndTrans
