import math

from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Intersection import Intersection
from RayTracing.Classes.Models.MathUtil import MathUtil
from RayTracing.Classes.Models.Object3D import Object3D
from RayTracing.Classes.Models.Vector import Vector


class Cylinder(Object3D):

    def __init__(self, x=0, y=0, z=0, height=0, radius=0, color=Color(), specular=50, reflection=0.1, transparency=0):
        super().__init__(x, y, z, color, specular, reflection, transparency)
        self.radius = radius
        self.height = height
        self.top = Vector(x, y + height / 2, z)
        self.bottom = Vector(x, y - height / 2, z)
        self.va = self.top.sub(self.center).normalize()


    def __init__(self, v=Vector(0, 0, 0), height=0, radius=0, color=Color(), specular=50, reflection=0.1, transparency=0):
        super().__init__(v, color, specular, reflection, transparency)
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
            if not self.inCylinder(point):
                return None

            intersect = Intersection(point, self, ray, tSmallest)

        return intersect


    def getSurfaceNormal(self,point):
        surfaceNormal = Vector()
        surfaceNormal.x = point.x - self.center.x
        surfaceNormal.y = point.y
        surfaceNormal.z = point.z - self.center.z
        return surfaceNormal.normalize()

    def inCylinder(self, point):
        if point.y < self.bottom.y or point.y > self.top.y:
            return False
        else:
            return True

