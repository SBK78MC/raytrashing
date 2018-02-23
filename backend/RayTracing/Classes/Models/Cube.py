from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Cuboid import Cuboid
from RayTracing.Classes.Models.Vector import Vector


class Cube(Cuboid):

    def __init__(self, x=0, y=0, z=0, l=0, color=Color(), reflection=10):
        super().__init__(x, y, z, l, l, l, color, reflection)

    def __init__(self, v=Vector(0,0,0), l=0, color=Color(), reflection=10):
        super().__init__(v, l, l, l, color, reflection)

    def intersection(self, ray):
