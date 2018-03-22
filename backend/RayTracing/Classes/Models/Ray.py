from RayTracing.Classes.Models.Vector import Vector


class Ray:

    def __init__(self, startp=Vector(0, 0, 0), directionPoint=Vector(0, 0, 0)):
        self.startPoint = startp
        self.direction = directionPoint
        #self.direction = directionPoint.sub(startp)

        self.inverseDirection = self.direction.getInverse()
        self.inv = list()
        self.inv.append(int(self.inverseDirection.x < 0))
        self.inv.append(int(self.inverseDirection.y < 0))
        self.inv.append(int(self.inverseDirection.z < 0))

        self.inverseDirection = self.direction.getInverse()
        self.inv = list()
        self.inv.append(int(self.inverseDirection.x < 0))
        self.inv.append(int(self.inverseDirection.y < 0))
        self.inv.append(int(self.inverseDirection.z < 0))

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

    def getReverse(self):
        temp = self.direction
        self.direction = self.startPoint
        self.startPoint = temp
        return self

    def calcLength(self, endPoint):
        tempVector = self.startPoint.sub(endPoint)
        return tempVector.calcLength()
