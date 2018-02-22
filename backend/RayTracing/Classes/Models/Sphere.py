import math

from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.MathUtil import MathUtil
from RayTracing.Classes.Models.Intersection import Intersection
from RayTracing.Classes.Models.Object3D import Object3D
from RayTracing.Classes.Models.Tuple import Tuple
from RayTracing.Classes.Models.Vector import Vector


class Sphere(Object3D):

    def __init__(self, x=0, y=0, z=0, radius=0, color=Color(), specular=50, reflection=0.1):
        super().__init__(x, y, z, color, specular, reflection)
        self.radius = radius

    def __init__(self, v=Vector(0, 0, 0), radius=0, color=Color(), specular=50, reflection=0.1):
        super().__init__(v, color, specular, reflection)
        self.radius = radius

    def intersection(self, ray):
        startP=ray.getStartPoint()
        cameraToCenter = startP.sub(self.center)

        a = self.calculateA(ray.getDirection())
        b = self.calculateB(cameraToCenter, ray.getDirection())
        c = self.calculateC(cameraToCenter)

        t = None
        if a != 0:
            t = MathUtil.solveQuadraticFormula(a, b, c)

        if t is not None:
            distanceT = t.getSmallestPositive()
            point = ray.getPointOfRay(distanceT)
            intersect = Intersection(point, self, ray, distanceT)
        else:
            intersect = None

        return intersect

    def intersectionv2(self, ray, tMin, tMax):
        sphereCenter = self.center
        r = self.radius
        originToCenter = ray.getStartPoint().sub(sphereCenter)

        k1 = ray.getDirection().dotProduct(ray.getDirection())
        k2 = 2 * originToCenter.dotProduct(ray.getDirection())
        k3 = originToCenter.dotProduct(originToCenter) - r*r

        discriminant = k2*k2 - 4*k1*k3
        if discriminant < 0:
            return None

        t1 = (-k2 + math.sqrt(discriminant)) / (2*k1)
        t2 = (-k2 - math.sqrt(discriminant)) / (2*k1)

        tSmallest = math.inf
        if tMin < t1 < tMax and t1 < tSmallest:
            tSmallest = t1
        if tMin < t2 < tMax and t2 < tSmallest:
            tSmallest = t2

        if tSmallest == math.inf:
            return None

        point = ray.getPointOfRay(tSmallest)
        intersect = Intersection(point, self, ray, tSmallest)

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
