from RayTracing.Classes.Models.Imageplane import Imageplane
from RayTracing.Classes.Models.Light import Light
from RayTracing.Classes.Models.Scene import Scene
from RayTracing.Classes.Models.Sphere import Sphere
from RayTracing.Classes.Models.Vector import Vector


class JSONParser:

    def deserializeScene(self, json):
        scene = Scene()

        imageplane = self.createImageplane(json)

        jsonScene = json["scene"]

        for object in jsonScene["Object3D"]:
            type = list(object.keys())[0]
            if(type == "Sphere"):
                scene.addObject3D(self.deserializeSphere(object[type]))
            elif(type == "Cube"):
                print("CUBE")

        for light in jsonScene["Light"]:
            scene.addLight(self.deserializeLight(light))

        return scene


    def createImageplane(self, json):
        width = json["imageplane"]["width"]
        height = json["imageplane"]["height"]
        return Imageplane(width, height)



    def deserializeLight(self, json):
        light = Light()
        light.position = self.deserializeVector(json["center"])
        light.setBrightness(json["brightness"])
        return light



    def deserializeVector(self, vector):
        return Vector(vector["x"], vector["y"], vector["z"])



    def deserializeSphere(self, sphereJson):
        center = self.deserializeVector(sphereJson["center"])
        reflection = sphereJson["reflection"]
        radius = sphereJson["radius"]

        return Sphere(center, radius, reflection)



    '''def deserializeCube(self, cubeJson):
        center = self.deserializeVector(cubeJson["center"])
        reflection = cubeJson["reflection"]
        sideLength = cubeJson["sideLength"]

        return Cube(center, sideLength, reflection)'''