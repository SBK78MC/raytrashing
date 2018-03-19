import math

from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Cylinder import Cylinder
from RayTracing.Classes.Models.Intersection import Intersection
from RayTracing.Classes.Models.MathUtil import MathUtil
from RayTracing.Classes.Models.Vector import Vector


class Cone(Cylinder):

    def __init__(self, x=0, y=0, z=0, height=0, radius=0, color=Color(), specular=50, reflection=0.1, transparency=0):
        super().__init__(x, y, z, height, radius, color, specular, reflection, transparency)
        self.center = self.top
        self.bottom = Vector(self.center.x, self.center.y - self.height, self.center.z)
        self.top = Vector(self.center.x, self.center.y + self.height, self.center.z)
        self.alpha = self.calculateAlpha()

    def __init__(self, v=Vector(0, 0, 0), height=0, radius=0, color=Color(), specular=50, reflection=0.1, transparency=0):
        super().__init__(v, height, radius, color, specular, reflection, transparency)
        self.alpha = self.calculateAlpha()
        self.center = self.top
        self.bottom = Vector(self.center.x, self.center.y - self.height, self.center.z)
        self.top = Vector(self.center.x, self.center.y + self.height, self.center.z)

    '''def intersection(self, ray, tMin, tMax):

        CO = ray.startPoint.sub(self.bottom)

        DdotP = ray.direction.dotProduct(self.va)

        a = math.pow(DdotP, 2) - math.pow(math.cos(self.alpha), 2)

        COdotV = CO.dotProduct(self.va)

        DdotCO = ray.direction.dotProduct(CO)

        b = 2 * (DdotP * COdotV - (DdotCO * math.pow(math.cos(self.alpha), 2)))

        c = math.pow(COdotV, 2) - CO.dotProduct(CO) * math.pow(math.cos(self.alpha), 2)

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
            if not self.inCylinder(point):
                return None

            intersect = Intersection(point, self, ray, tSmallest)

        return intersect'''

    '''def intersection2(self, ray, tMin, tMax):

        deltaP = ray.startPoint.sub(self.bottom)

        dotProdVVa = ray.direction.dotProduct(self.va)
        partA = ray.direction.sub(self.va.multiply(dotProdVVa))
        part2 = math.pow(math.sin(self.alpha), 2) * math.pow(dotProdVVa, 2)
        part1 = math.pow(math.cos(self.alpha), 2) * partA.dotProduct(partA)
        a = part1 - part2
        #a = math.pow(math.cos(self.alpha), 2) * partA.dotProduct(partA) - math.pow(math.sin(self.alpha), 2) * math.pow(dotProdVVa, 2)

        dotProdDPVa = deltaP.dotProduct(self.va)
        partB = deltaP.sub(self.va.multiply(dotProdDPVa))
        b = 2 * math.pow(math.cos(self.alpha), 2) * partA.dotProduct(partB) - 2 * math.pow(math.sin(self.alpha), 2) * dotProdVVa * dotProdDPVa

        c = math.pow(math.cos(self.alpha), 2) * partB.dotProduct(partB) - math.pow(math.sin(self.alpha), 2) * math.pow(dotProdDPVa, 2)

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
            if not self.inCylinder(point):
                return None

            intersect = Intersection(point, self, ray, tSmallest)

        return intersect'''

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
            if not self.inCylinder(point):
                return None

            intersect = Intersection(point, self, ray, tSmallest)

        return intersect

    def calculateAlpha(self):
        return math.degrees(math.atan(self.radius / self.height))

    def getSurfaceNormal(self,point):
        x = point.x - self.center.x
        z = point.z - self.center.z

        r = math.sqrt(math.pow(x, 2) + math.pow(z, 2))
        surfaceNormal = Vector(x, r * (self.radius / self.height), z)
        return surfaceNormal.normalize()
