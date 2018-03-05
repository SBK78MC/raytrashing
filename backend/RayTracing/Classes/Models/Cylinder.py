from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Intersection import Intersection
from RayTracing.Classes.Models.Object3D import Object3D
from RayTracing.Classes.Models.Vector import Vector


class Cylinder(Object3D):

    def __init__(self, x=0, y=0, z=0, height=0, radius=0, color=Color(), specular=50, reflection=0.1):
        super().__init__(x, y, z, color, specular, reflection)
        self.radius = radius
        self.height = height

    def __init__(self, v=Vector(0, 0, 0), height=0, radius=0, color=Color(), specular=50, reflection=0.1):
        super().__init__(v, color, specular, reflection)
        self.radius = radius
        self.height = height

    def intersection(self, ray):
        return Intersection()
