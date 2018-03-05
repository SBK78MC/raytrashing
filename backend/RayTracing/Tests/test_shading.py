import unittest
import math

from RayTracing.Classes.Models.Camera import Camera
from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Imageplane import Imageplane
from RayTracing.Classes.Models.Light import Light
from RayTracing.Classes.Models.Ray import Ray
from RayTracing.Classes.Models.Scene import Scene
from RayTracing.Classes.Models.Sphere import Sphere
from RayTracing.Classes.Models.Vector import Vector
from RayTracing.Classes.RayTracer import RayTracer


class MyTestCase(unittest.TestCase):
    def test_specularReflection1(self):
        #Light
        light = Light(0, 0, 0, 1)

        # Sphere 1
        c1 = Vector(0, 0, 5)
        s1 = Sphere(c1, 1, Color(0, 1, 0), 1000, 0)

        scene = Scene()
        scene.addObject3D(s1)
        scene.addLight(light)

        camera = Camera(Vector(0, 0, 0), Vector(0, 0, 1), 30)

        imagepl = Imageplane(500, 500)

        raytracer = RayTracer(imagepl, scene, camera)

        pixelRay = Ray(camera.position, Vector(0.01, 0, 1))

        sphereIntersection = s1.intersection(pixelRay, 1, math.inf)

        arrColor = raytracer.getColorForIntersection(sphereIntersection, 0)
        testColor = arrColor

        green = Color()
        green.green()

        testValue = testColor.isBrighterOrEqualTo(green)
        self.assertTrue(testValue)

    def test_specularReflection2(self):
        #Light
        light = Light(0, 0, 0, 1)

        # Sphere 1
        c1 = Vector(0, 0, 12)
        s1 = Sphere(c1, 1, Color(0, 1, 0), 0)

        scene = Scene()
        scene.addObject3D(s1)
        scene.addLight(light)

        camera = Camera(Vector(0, 0, 0), Vector(0, 0, 1), 30)

        imagepl = Imageplane(500, 500)

        raytracer = RayTracer(imagepl, scene, camera)

        pixelRay = Ray(camera.position, Vector(0.001, 0, 1))

        sphereIntersection = s1.intersection(pixelRay, 1, math.inf)

        arrColor = raytracer.getColorForIntersection(sphereIntersection, 0)
        testColor = arrColor


        green = Color()
        green.green()

        testValue = testColor.isBrighterOrEqualTo(green)
        self.assertFalse(testValue)

    def test_diffusion1(self):
        #Light
        light = Light(0, 0, 0, 1)

        # Sphere 1
        c1 = Vector(0, 0, 12)
        s1 = Sphere(c1, 1, Color(0, 1, 0), 1000)

        scene = Scene()
        scene.addObject3D(s1)
        scene.addLight(light)

        camera = Camera(Vector(0, 0, 0), Vector(0, 0, 1), 30)

        imagepl = Imageplane(500, 500)

        raytracer = RayTracer(imagepl, scene, camera)

        pixelRay1 = Ray(camera.position, Vector(0.001, 0, 1))

        pixelRay2 = Ray(camera.position, Vector(0.01, 0, 1))

        pixelRay3 = Ray(camera.position, Vector(0.02, 0, 1))

        pixelRay4 = Ray(camera.position, Vector(0.03, 0, 1))

        sphereIntersection1 = s1.intersection(pixelRay1, 0, 1000)

        sphereIntersection2 = s1.intersection(pixelRay2, 0, 1000)

        sphereIntersection3 = s1.intersection(pixelRay3, 0, 1000)

        sphereIntersection4 = s1.intersection(pixelRay4, 0, 1000)

        arrColor1 = raytracer.getColorForIntersection(sphereIntersection1, 0)
        arrColor2 = raytracer.getColorForIntersection(sphereIntersection2, 0)
        arrColor3 = raytracer.getColorForIntersection(sphereIntersection3, 0)
        arrColor4 = raytracer.getColorForIntersection(sphereIntersection4, 0)

        testColor1 = arrColor1
        testColor2 = arrColor2
        testColor3 = arrColor3
        testColor4 = arrColor4

        testValue3 = testColor3.isBrighterOrEqualTo(testColor4)
        self.assertTrue(testValue3)

        testValue2 = testColor2.isBrighterOrEqualTo(testColor3)
        self.assertTrue(testValue2)

        testValue1 = testColor1.isBrighterOrEqualTo(testColor2)
        self.assertTrue(testValue1)


if __name__ == '__main__':
    unittest.main()