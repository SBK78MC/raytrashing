import math

from RayTracing.Classes.Models.AmbientLight import AmbientLight
from RayTracing.Classes.Models.Camera import Camera
from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Cone import Cone
from RayTracing.Classes.Models.Cube import Cube

from RayTracing.Classes.Models.Cylinder import Cylinder
from RayTracing.Classes.Models.Imageplane import Imageplane
from RayTracing.Classes.Models.Light import Light
from RayTracing.Classes.Models.Plane import Plane
from RayTracing.Classes.Models.Scene import Scene
from RayTracing.Classes.Models.Sphere import Sphere
from RayTracing.Classes.Models.Vector import Vector
from RayTracing.Classes.RayTracer import RayTracer

import json as jsons


class JSONParser:

    def deserializeRayTracingTask(self, json):
        imageplane = self.createImageplane(json)
        camera = self.deserializeCamera(json)
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
                scene.addObject3D(self.deserializeCube(object[type]))
            elif (type == "Cylinder"):
                scene.addObject3D(self.deserializeCylinder(object[type]))
            elif (type == "Cone"):
                scene.addObject3D(self.deserializeCone(object[type]))

        for light in jsonScene["Light"]:
            scene.addLight(self.deserializeLight(light))

        scene.addLight(self.deserializeAmbientLight(jsonScene["AmbientLight"]))

        if self.deserializeFloor(jsonScene["Floor"]):
            scene.addObject3D(Plane(Vector(0, -3, 0), Vector(0, 1, 0), Color(1.0, 1.0, 1.0), 200, 0.3))

        return scene


    def createImageplane(self, json):
        jsonImagePlane = json["ImagePlane"]
        width = int(jsonImagePlane["width"])
        height = int(jsonImagePlane["height"])
        return Imageplane(width, height)



    def deserializeLight(self, json):
        light = Light()
        light.position = self.deserializeVector(json["center"])
        light.setBrightness(float(json["brightness"]))
        return light



    def deserializeVector(self, vector):
        return Vector(float(vector["x"]), float(vector["y"]), float(vector["z"]))



    def deserializeSphere(self, sphereJson):
        center = self.deserializeVector(sphereJson["center"])
        reflection = float(sphereJson["reflection"])
        radius = float(sphereJson["radius"])
        specular = float(sphereJson["specular"])
        transparency = float(sphereJson["transparency"])
        color = self.deserializeColor(sphereJson["color"])

        return Sphere(center, radius, color, specular, reflection, transparency)


    def deserializeCube(self, cubeJson):
        center = self.deserializeVector(cubeJson["center"])
        reflection = float(cubeJson["reflection"])
        sideLength = float(cubeJson["sideLength"])
        specular = float(cubeJson["specular"])
        transparency = float(cubeJson["transparency"])
        color = self.deserializeColor(cubeJson["color"])

        return Cube(center, sideLength, color, specular, reflection, transparency)

    def deserializeCylinder(self, cylinderJson):
        center = self.deserializeVector(cylinderJson["center"])
        reflection = float(cylinderJson["reflection"])
        height = float(cylinderJson["height"])
        radius = float(cylinderJson["radius"])
        specular = float(cylinderJson["specular"])
        transparency = float(cylinderJson["transparency"])
        color = self.deserializeColor(cylinderJson["color"])

        return Cylinder(center, height, radius, color, specular, reflection, transparency)

    def deserializeCamera(self, json):
        cameraJSON = json["Camera"]
        position = self.deserializeVector(cameraJSON["position"])
        pointOfView = self.deserializeVector(cameraJSON["pointOfView"])

        return Camera(position, pointOfView, Vector(0, 1, 0), math.pi / 4)

    def deserializeAmbientLight(self, ambientLightJson):
        active = bool(ambientLightJson["active"])
        brightness = 0

        if(bool(active) == True):
            brightness = float(ambientLightJson["brightness"])

        return AmbientLight(brightness)


    def deserializeColor(self, colorJson):
        r = float(colorJson["r"])
        g = float(colorJson["g"])
        b = float(colorJson["b"])

        return Color(r, g, b)

    def deserializeFloor(self, sceneJson):
        active = bool(sceneJson["active"])
        return active

    def deserializeCone(self, coneJson):
        center = self.deserializeVector(coneJson["center"])
        reflection = float(coneJson["reflection"])
        radius = float(coneJson["radius"])
        height = float(coneJson["height"])
        specular = float(coneJson["specular"])
        transparency = float(coneJson["transparency"])
        color = self.deserializeColor(coneJson["color"])

        return Cone(center, height, radius, color, specular, reflection, transparency)