import math

import sys


class Vector:

    def __init__(self, x=0, y=0, z=0):
        self.x = x
        self.y = y
        self.z = z

    def normalize(self):
        length = self.calcLength()
        if length == 0:
            return self
        return Vector(self.x/length, self.y/length, self.z/length)

    def getNormalizedLength(self):
        return self.normalize().calcLength()

    def calcLength(self):
        return math.sqrt(self.dotProduct(self))

    def add(self, v):
        return Vector(self.x + v.x, self.y + v.y, self.z + v.z)

    def sub(self, v):
        return Vector(self.x - v.x, self.y - v.y, self.z - v.z)

    def multiply(self, d):
        v = Vector(self.x * d, self.y * d, self.z * d)
        return v

    def dotProduct(self, v):
        return (self.x * v.x) + (self.y * v.y) + (self.z * v.z)

    def crossProduct(self, v):
        newX = self.y * v.z - self.z * v.y
        newY = self.z * v.x - self.x * v.z
        newZ = self.x * v.y - self.y * v.x

        return Vector(newX, newY, newZ)

    def print(self):
        print("(", self.x, ",", self.y, ",", self.z, ")")

    def setX(self, x):
        self.x = x

    def setY(self, y):
        self.y = y

    def setZ(self, z):
        self.z = z

    def getX(self):
        return self.x

    def getY(self):
        return self.y

    def getZ(self):
        return self.z

    def equals(self, v):
        if self.x == v.getX() and self.y == v.getY() and self.z == v.getZ():
            return True
        else:
            return False

    def getNegative(self):
        v = Vector(- self.x, - self.y, - self.z)
        return v

    def getInverse(self):
        v = Vector()
        if self.x == 0:
            v.x = sys.float_info.max
        else:
            v.x = 1/self.x

        if self.y == 0:
            v.y = sys.float_info.max
        else:
            v.y = 1 / self.y

        if self.z == 0:
            v.z = sys.float_info.max
        else:
            v.z = 1 / self.z

        return v
