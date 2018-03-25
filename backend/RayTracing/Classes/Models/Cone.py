import math

from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Cylinder import Cylinder
from RayTracing.Classes.Models.Intersection import Intersection
from RayTracing.Classes.Models.MathUtil import MathUtil
from RayTracing.Classes.Models.Vector import Vector


class Cone(Cylinder):

    def __init__(self, x=0, y=0, z=0, height=0, radius=0, color=Color(), specular=50, reflection=0.1, transparency=0, refractiveIndex=1.0):
        super().__init__(x, y, z, height, radius, color, specular, reflection, transparency, refractiveIndex)
        self.alpha = self.calculateAlpha()
        self.center = self.top
        self.bottom = Vector(self.center.x, self.center.y - self.height, self.center.z)
        self.top = Vector(self.center.x, self.center.y + self.height, self.center.z)

    def __init__(self, v=Vector(0, 0, 0), height=0, radius=0, color=Color(), specular=50, reflection=0.1, transparency=0, refractiveIndex=1.0):
        super().__init__(v, height, radius, color, specular, reflection, transparency, refractiveIndex)
        self.alpha = self.calculateAlpha()
        self.center = self.top
        self.bottom = Vector(self.center.x, self.center.y - self.height, self.center.z)
        self.top = Vector(self.center.x, self.center.y + self.height, self.center.z)

    def intersection(self, ray, tMin, tMax):

        CO = ray.startPoint.sub(self.center)

        m = math.pow(self.radius, 2) / math.pow(self.height, 2)

        a = ray.direction.dotProduct(ray.direction) - m * math.pow(ray.direction.dotProduct(self.va), 2) - math.pow(ray.direction.dotProduct(self.va), 2)
        b = 2 * (ray.direction.dotProduct(CO) - m * ray.direction.dotProduct(self.va) * CO.dotProduct(self.va) - ray.direction.dotProduct(self.va) * CO.dotProduct(self.va))
        c = CO.dotProduct(CO) - m * math.pow(CO.dotProduct(self.va), 2) - math.pow(CO.dotProduct(self.va), 2)

        t = MathUtil().solveQuadraticFormula(a, b, c)

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

            if not self.inCylinder(point):
                tmp = None
                if not self.isAbove(point):
                    tmp = self.intersect_base(ray, self.bottom, Vector(0, -1, 0))

                if tmp:
                    intersect.point = tmp.point
                else:
                    intersect = None

        return intersect

    def inCylinder(self, point):
        if point.y < self.bottom.y or point.y > self.center.y:
            return False
        else:
            return True

    def calculateAlpha(self):
        return math.degrees(math.atan(self.radius / self.height))

    def getSurfaceNormal(self,point):

        surfaceNormal = Vector()

        epsilon = 0.00001

        if point.y > self.center.y - epsilon:
            surfaceNormal.y = 1
            return Vector(0.0, 1.0, 0.0)
        elif self.bottom.y - epsilon < point.y < self.bottom.y + epsilon:
            surfaceNormal.y = -1
            return Vector(0.0, -1.0, 0.0)

        x = point.x - self.center.x
        z = point.z - self.center.z

        r = math.sqrt(math.pow(x, 2) + math.pow(z, 2))
        surfaceNormal = Vector(x, r * (self.radius / self.height), z)
        return surfaceNormal.normalize()
