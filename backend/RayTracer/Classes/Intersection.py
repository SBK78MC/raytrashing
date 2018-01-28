from Classes.Object3D import Object3D
from Classes.Ray import Ray
from Classes.Vector import Vector


class Intersection:

    def __init__(self, point=Vector(), object3d=Object3D(), ray=Ray(), distance=0):
        self.point = point
        self.object = object3d
        self.ray = ray
        self.distance = distance

    def getPoint(self):
        return self.point

    def setPoint(self, point):
        self.point = point

    def getObject(self):
        return self.object

    def setObject(self, object):
        self.object = object

    def getRay(self):
        return self.ray

    def setRay(self, ray):
        self.ray = ray

    def getDistance(self):
        return self.distance

    def setDistance(self, distance):
        self.distance = distance
