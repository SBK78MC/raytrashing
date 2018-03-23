import math

from RayTracing.Classes.Models.Ray import Ray
from RayTracing.Classes.Models.Vector import Vector


class Camera():

    angle = 0

    def __init__(self, position=Vector(0, 0, 0), pointOfView=Vector(0, 0, 1), upGuide=Vector(0, 1, 0), fov=40):
        self.position = position
        self.pointOfView = pointOfView
        self.forward = self.pointOfView.sub(self.position).normalize()
        self.fov = fov
        self.right = self.forward.crossProduct(upGuide).normalize()
        self.up = self.right.crossProduct(self.forward)
        self.h = math.tan(fov)
        self.w = self.h * 1
        self.angle = self.calculateAngle()

    def getRay(self, x, y):
        part1 = self.up.multiply(self.w * x)
        part2 = self.right.multiply(self.h * y)

        return Ray(self.position, self.forward.add(part1).add(part2))

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
        self.setAngle(self.calculateAngle())

    def getPosition(self):
        return self.position

    def setPosition(self, position):
        self.position = position

    def getPointOfView(self):
        return self.pointOfView

    def setPointOfView(self):
        return self.pointOfView