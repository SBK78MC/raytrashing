
from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Object3D import Object3D
from RayTracing.Classes.Models.Vector import Vector
from RayTracing.Classes.Models.Intersection import Intersection


class Plane(Object3D):

    def __init__(self, point, normal, color=Color()):
        super().__init__(point, color, 10)
        self.n = normal
        self.p = point

    def intersection(self, l):
        dot = l.direction.dotProduct(self.n)
        if dot == 0:
            return None
        else:
            dot = (self.p - l.startPoint).dotProduct(self.n) / dot

            return Intersection(l.startPoint + l.direction * dot, self, self.n, dot)




