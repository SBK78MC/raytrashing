from Classes.Models import Object3D, Light


class Scene:

    def __init__(self, objects=list(), lights=list()):
        self.objects = objects
        self.lights = lights

    def addObject3D(self,obj):
        self.objects.append(obj)

    #Potential issue: different objects on the same position
    def removeObject3D(self, position):
        objectToBeRemoved = None
        for object in self.objects:
            if object.getCenter().equals(position):
                objectToBeRemoved = object

        del objectToBeRemoved


    def addLight(self, light):
        self.lights.append(light)

    def removeLight(self, position):
        lightToBeRemoved = None
        for light in self.lights:
            if light.getPosition().equals(position):
                lightToBeRemoved = light

        del lightToBeRemoved

    def getObjects(self):
        return self.objects

    def getLights(self):
        return self.lights
