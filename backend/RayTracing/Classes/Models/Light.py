from RayTracing.Classes.Models.AmbientLight import AmbientLight
from RayTracing.Classes.Models.Ray import Ray
from RayTracing.Classes.Models.Vector import Vector


class Light(AmbientLight):

    def __init__(self, position=Vector(0, 0, 0),brightness=0.1):
        AmbientLight.__init__(self, brightness)
        self.position = position

    def __init__(self, x=0, y=0, z=0, brightness=0.1):
        AmbientLight.__init__(self, brightness)
        self.position = Vector(x, y, z)

    def getLightRay(self, point):
        lightRay = Ray(self.position, point)
        return lightRay

    def getLightVector(self, point):
        lightVector = self.position.sub(point)
        return lightVector

    def getPosition(self):
        return self.position
