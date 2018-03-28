from RayTracing.Classes.Models.Object3D import Object3D
from RayTracing.Classes.Models.Ray import Ray
from RayTracing.Classes.Models.Vector import Vector


class Intersection:
    """The class Intersection can help keep track of an intersection after it is located
        The point of the intersection, the object that is intersected the initial Ray and the distance from
        the starting point are all kept here and can be returned using the getters
    """

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

    def getComparableLength(self):
        rayToPoint = self.ray.calcLength(self.point)
        rayToDirection = self.ray.calcLength(self.ray.getDirection())

        return rayToPoint/rayToDirection
