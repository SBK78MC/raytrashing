import math

from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.MathUtil import MathUtil
from RayTracing.Classes.Models.Intersection import Intersection
from RayTracing.Classes.Models.Object3D import Object3D
from RayTracing.Classes.Models.Tuple import Tuple
from RayTracing.Classes.Models.Vector import Vector


class Sphere(Object3D):

    def __init__(self, x=0, y=0, z=0, radius=0, color=Color(), specular=50, reflection=1.0, transparency=0):
        super().__init__(x, y, z, color, specular, reflection, transparency)
        self.radius = radius

    def __init__(self, v=Vector(0, 0, 0), radius=0, color=Color(), specular=50, reflection=1.0, transparency=0):
        super().__init__(v, color, specular, reflection, transparency)

        self.radius = radius

    def intersection(self, ray, tMin, tMax):
        startP=ray.getStartPoint()
        cameraToCenter = startP.sub(self.center)

        a = self.calculateA(ray.getDirection())
        b = self.calculateB(cameraToCenter, ray.getDirection())
        c = self.calculateC(cameraToCenter)

        t = MathUtil.solveQuadraticFormula(a, b, c)

        intersect = None

        if t is not None:
            tSmallest = math.inf
            if tMin < t.getx1() < tMax and t.getx1() < tSmallest:
                tSmallest = t.getx1()
            if tMin < t.getx2() < tMax and t.getx2() < tSmallest:
                tSmallest = t.getx2()

            if tSmallest == math.inf:
                return None

            point = ray.getPointOfRay(tSmallest)
            intersect = Intersection(point, self, ray, tSmallest)

        return intersect

    def getSurfaceNormal(self, point):
        pointToCenter = point.sub(self.getCenter())

        pointToCenter = pointToCenter.normalize()

        return pointToCenter

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
