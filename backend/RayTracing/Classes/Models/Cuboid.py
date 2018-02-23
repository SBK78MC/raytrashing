from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Object3D import Object3D
from RayTracing.Classes.Models.Vector import Vector


class Cuboid(Object3D):

    def __init__(self, x=0, y=0, z=0, w=0, h=0, d=0, color=Color(), reflection=10):
        super().__init__(x, y, z, color, reflection)
        self.w = w;
        self.h = h;
        self.d = d;

    def __init__(self, v=Vector(0,0,0), w=0, h=0, d=0, color=Color(), reflection=10):
        super().__init__(v, reflection)
        self.w = w;
        self.h = h;
        self.d = d;




