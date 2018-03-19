from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Object3D import Object3D
from RayTracing.Classes.Models.Vector import Vector


class Cuboid(Object3D):

    def __init__(self, x=0, y=0, z=0, w=0, h=0, d=0, color=Color(), specular=100, reflection=0.1, transparency=0):
        super().__init__(x, y, z, color, specular, reflection, transparency)
        self.w = w;
        self.h = h;
        self.d = d;
        shiftVector = Vector(w,h,d).multiply(0.5)
        self.minPoint = self.center.sub(shiftVector)
        self.maxPoint = self.center.add(shiftVector)

    def __init__(self, v=Vector(0,0,0), w=0, h=0, d=0, color=Color(), specular=100, reflection=0.1, transparency=0):
        super().__init__(v, color, specular, reflection, transparency)
        self.w = w;
        self.h = h;
        self.d = d;
        shiftVector = Vector(w,h,d).multiply(0.5)
        self.minPoint = self.center.sub(shiftVector)
        self.maxPoint = self.center.add(shiftVector)

    def getSurfaceNormal(self, point):
        epsilon = 0.0001

        if point.x < self.center.x - self.w / 2 + epsilon:
            return Vector(-1, 0, 0)
        elif point.x > self.center.x + self.w / 2 - epsilon:
            return Vector(1, 0, 0)
        elif point.z > self.center.z + self.d / 2 - epsilon:
            return Vector(0, 0, 1)
        elif point.z < self.center.z - self.d / 2 + epsilon:
            return Vector(0, 0, -1)
        elif point.y > self.center.y + self.h / 2 - epsilon:
            return Vector(0, 1, 0)
        elif point.y < self.center.y - self.h / 2 + epsilon:
            return Vector(0, -1, 0)
        else:
            print("else")
            return Vector()


