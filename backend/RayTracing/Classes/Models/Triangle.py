from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Object3D import Object3D
from RayTracing.Classes.Models.Intersection import Intersection


class Triangle(Object3D):

    def __init__(self, p1, p2, p3, color=Color(), specular=50, reflection=1.0):
        super().__init__(color, specular, reflection)
        self.p1 = p1
        self.p2 = p2
        self.p3 = p3
        self.u = p2 - p1
        self.v = p3 - p1
        self.normal = self.u.crossProduct(self.v).normalize()

    def intersection(self, ray, tMin, tMax):
        cross = ray.direction.crossProduct(self.v)
        dot = cross.dotProduct(self.u)
        if dot == 0.0:
            return None

        a = ray.startPoint - self.p1
        b = a.crossProduct(self.u)
        c = cross.dotProduct(a) / dot
        if c < 0 or c > 1:
            return None

        s = b.dotProduct(ray.direction) / dot
        if s >= 0 and s <= 1 and r + s <= 1:
            return b.dotProduct(self.v) / dot
        else:
            return None

    def getSurfaceNormal(self, p):
            return self.normal