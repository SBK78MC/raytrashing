from RayTracing.Classes.Models.AmbientLight import AmbientLight
from RayTracing.Classes.Models.Camera import Camera
from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Imageplane import Imageplane
from RayTracing.Classes.Models.Light import Light
from RayTracing.Classes.Models.Scene import Scene
from RayTracing.Classes.Models.Sphere import Sphere
from RayTracing.Classes.Models.Vector import Vector
from RayTracing.Classes.RayTracer import RayTracer


class JSONParser:

    def deserializeRayTracingTask(self, json):
        imageplane = self.createImageplane(json)
        camera = Camera()
        scene = self.deserializeScene(json)

        return RayTracer(imageplane, scene, camera)


    def deserializeScene(self, json):
        scene = Scene()

        jsonScene = json["Scene"]

        for object in jsonScene["Object3D"]:
            type = list(object.keys())[0]
            if(type == "Sphere"):
                scene.addObject3D(self.deserializeSphere(object[type]))
            elif(type == "Cube"):
                print("CUBE")

        for light in jsonScene["Light"]:
            scene.addLight(self.deserializeLight(light))

        scene.addLight(self.deserializeAmbientLight(jsonScene["AmbientLight"]))

        return scene


    def createImageplane(self, json):
        width = json["Imageplane"]["width"]
        height = json["Imageplane"]["height"]
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
        color = self.deserializeColor(sphereJson["color"])

        return Sphere(center, radius, color, reflection)


    '''def deserializeCube(self, cubeJson):
        center = self.deserializeVector(cubeJson["center"])
        reflection = cubeJson["reflection"]
        sideLength = cubeJson["sideLength"]

        return Cube(center, sideLength, reflection)'''


    def deserializeAmbientLight(self, ambientLightJson):
        active = ambientLightJson["active"]
        brightness = 0
        if(bool(active) == True):
            brightness = float(ambientLightJson["brightness"])

        return AmbientLight(brightness)


    def deserializeColor(self, colorJson):
        r = colorJson["r"]
        g = colorJson["g"]
        b = colorJson["b"]

        return Color(r, g, b)