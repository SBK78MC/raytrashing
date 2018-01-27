import math


class Vector:

    def __init__(self, x=0, y=0, z=0):
        self.x = x
        self.y = y
        self.z = z

    def normalize(self):
        length = self.calcLength()
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
        return Vector(self.x * d, self.y * d, self.z * d)

    def dotProduct(self, v):
        return (self.x * v.x) + (self.y * v.y) + (self.z * v.z)

    def crossProduct(self, v):
        newX = self.y * v.z - self.z * v.y
        newY = self.z * v.x - self.x * v.z
        newZ = self.x * v.y - self.y * v.y

        return Vector(newX, newY, newZ)

    def print(self):
        print("(", self.x, ",", self.y, ",", self.z, ")")

    def setX(self, x):
        self.x = x

    def setY(self,y):
        self.y = y

    def setZ(self, z):
        self.z = z


if __name__ == '__main__':
    v1 = Vector()
    v2 = Vector()

    v2.setZ(1)

    v2.print()
