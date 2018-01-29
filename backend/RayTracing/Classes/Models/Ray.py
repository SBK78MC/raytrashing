from RayTracing.Classes.Models.Vector import Vector


class Ray:

    def __init__(self, startp=Vector(0, 0, 0), direction=Vector(0, 0, 0)):
        self.startPoint = startp
        self.direction = direction

    def getPointOfRay(self, t):
        result = Vector()
        result.setX(self.startPoint.x + (t * self.direction.x))
        result.setY(self.startPoint.y + (t * self.direction.y))
        result.setZ(self.startPoint.z + (t * self.direction.z))
        return result

    def getDirection(self):
        return self.direction

    def getStartPoint(self):
        return self.startPoint

    def setDirection(self, newDirection):
        self.direction = newDirection

    def setStartPoint(self, newStartPoint):
        self.startPoint = newStartPoint
