from Classes.Models.AmbientLight import AmbientLight
from Classes.Models.Vector import Vector


class Light(AmbientLight):

    def __init__(self, position=Vector(0, 0, 0),brightness=0.1):
        AmbientLight.__init__(self, brightness)
        self.position = position

    def getLightRay(self,point):
        lightRay = self.position.sub(point)
        return lightRay
