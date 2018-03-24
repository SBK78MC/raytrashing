import math

from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Intersection import Intersection
from RayTracing.Classes.Models.MathUtil import MathUtil
from RayTracing.Classes.Models.Object3D import Object3D

from RayTracing.Classes.Models.Plane import Plane
from RayTracing.Classes.Models.Vector import Vector


class Cylinder(Object3D):

    def __init__(self, x=0, y=0, z=0, height=0, radius=0, color=Color(), specular=50, reflection=0.1, transparency=0, refractiveIndex=1.0):
        super().__init__(x, y, z, color, specular, reflection, transparency, refractiveIndex)
        self.radius = radius
        self.height = height
        self.top = Vector(x, y + height / 2, z)
        self.bottom = Vector(x, y - height / 2, z)
        self.va = self.top.sub(self.center).normalize()

    def __init__(self, v=Vector(0, 0, 0), height=0, radius=0, color=Color(), specular=50, reflection=0.1, transparency=0, refractiveIndex=1.0):
        super().__init__(v, color, specular, reflection, transparency, refractiveIndex)
        self.radius = radius
        self.height = height
        self.top = Vector(v.x, v.y + height / 2, v.z)
        self.bottom = Vector(v.x, v.y - height / 2, v.z)
        self.va = self.top.sub(self.center).normalize()

    def intersection(self, ray, tMin, tMax):

        deltaP = ray.startPoint.sub(self.center)

        partA = ray.direction.sub(self.va.multiply(ray.direction.dotProduct(self.va)))
        a = partA.dotProduct(partA)
        dotProd = deltaP.dotProduct(self.va)
        partB = deltaP.sub(self.va.multiply(dotProd))
        b = 2 * partA.dotProduct(partB)
        c = partB.dotProduct(partB) - self.radius * self.radius

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
                if self.isAbove(point):
                    tmp = self.intersect_base(ray, self.top, Vector(0, 1, 0))
                else:
                    tmp = self.intersect_base(ray, self.bottom, Vector(0, -1, 0))

                if tmp:
                    intersect.point = tmp.point
                else:
                    intersect = None

        return intersect

    def intersect_base(self, ray, center, normal):
        bottom = Plane(center, normal)
        intersection = bottom.intersection(ray, 0.001, 100000)
        if intersection:
            v = intersection.point.sub(bottom.center)
            if v.calcLength() > self.radius:
                intersection = None

        return intersection

    def getSurfaceNormal(self,point):

        surfaceNormal = Vector()

        if self.center.x - self.radius <= point.x <= self.center.x + self.radius and self.center.z - self.radius <= point.z <= self.center.z + self.radius:

            epsilon = 0.00001

            if point.y > self.top.y - epsilon:
                surfaceNormal.y = 1
                return Vector(0.0, 1.0, 0.0)
            elif self.bottom.y - epsilon < point.y < self.bottom.y + epsilon :
                surfaceNormal.y = -1
                return Vector(0.0, -1.0, 0.0)

            v = Vector(self.center.x, point.y, self.center.z)
            surfaceNormal = point.sub(v)

        return surfaceNormal.normalize()

    def inCylinder(self, point):
        if point.y < self.bottom.y or point.y > self.top.y:
            return False
        else:
            return True

    def isAbove(self, point):
        if point.y > self.center.y:
            return True
        else:
            return False