import math

from RayTracing.Classes.Models.Vector import Vector


class Camera():

    angle = 0

    def __init__(self, position=Vector(0, 0, 0), pointOfView=Vector(0, 0, 1), fov=40):
        self.position = position
        self.pointOfView = pointOfView
        self.fov = fov
        self.angle = self.calculateAngle()

    def calculateAngle(self):
        return math.tan(math.pi * 0.5 * self.fov/180.0)

    def getAngle(self):
        return self.angle

    def setAngle(self, angle):
        self.angle = angle

    def getFov(self):
        return self.fov

    def setFov(self, fov):
        self.fov = fov

    def getPosition(self):
        return self.position

    def setPosition(self, position):
        self.position = position

    def getPointOfView(self):
        return self.pointOfView

    def setPointOfView(self):
        return self.pointOfView