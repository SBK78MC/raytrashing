import math

from Classes.Models.MathUtil import MathUtil
from Classes.Models.Intersection import Intersection
from Classes.Models.Object3D import Object3D
from Classes.Models.Vector import Vector


class Sphere(Object3D):

    def __init__(self, v=Vector(0, 0, 0), radius=0):
        Object3D.__init__(self, v)
        self.radius = radius

    def intersection(self, ray):
        cameraToCenter = ray.getStartPoint().sub(self.center)

        a = self.calculateA(ray.getDirection())
        b = self.calculateB(cameraToCenter, ray.getDirection())
        c = self.calculateC(cameraToCenter)

        t = MathUtil.solveQuadraticFormula(a, b, c)

        if t is not None:
            distanceT = t.getSmallestPositive()
            point = ray.getPointOfRay(distanceT)
            intersect = Intersection(point, self, ray, distanceT)
        else:
            intersect = None

        return intersect


    def getCenter(self):
        return self.center

    def getRadius(self):
        return self.radius


    def calculateA(self, ray):
        return ray.dotProduct(ray)

    def calculateB(self, cameraToCenter, ray):
        return 2 * (cameraToCenter.dotProduct(ray))

    def calculateC(self, cameraToCenter):
        return cameraToCenter.dotProduct(cameraToCenter) - math.pow(self.radius, 2)
