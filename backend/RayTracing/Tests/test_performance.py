import unittest
import time

from RayTracing.Classes.Models.AmbientLight import AmbientLight
from RayTracing.Classes.Models.Camera import Camera
from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Imageplane import Imageplane
from RayTracing.Classes.Models.Light import Light
from RayTracing.Classes.Models.Scene import Scene
from RayTracing.Classes.Models.Sphere import Sphere
from RayTracing.Classes.Models.Vector import Vector
from RayTracing.Classes.RayTracer import RayTracer

class PerformanceTest(unittest.TestCase):

    def test_SimpleScene(self):

        light = Light(0, 2, 6, 1)

        center = Vector(.8, .1, 1.)

        sphere = Sphere(center, .4, Color(1, 0, 0), 0)

        scene = Scene()
        scene.addObject3D(sphere)
        scene.addLight(light)

        camera = Camera(Vector(0, 0, 0), Vector(0, 0, 1), 30)

        imagepl = Imageplane(500, 500)

        raytracer = RayTracer(imagepl, scene, camera)

        startTime = time.time()
        raytracer.startRayTracing()
        endTime = time.time()

        self.assertLessEqual(endTime - startTime, 30)


    def test_largeScene(self):
        light = Light(0, 2, 6, 1)
        ambientLight = AmbientLight(0.3)

        # Sphere 1
        c1 = Vector(.8, .5, 1.5)
        s1 = Sphere(c1, .4, Color(0, 1, 0), 10)

        # Sphere 2
        c2 = Vector(.7, .1, 1.)
        s2 = Sphere(c2, .7, Color(0, 0, 1), 10)

        # Sphere 3
        c3 = Vector(.4, .4, .7)
        s3 = Sphere(c3, .2, Color(1, 0, 0), 10)

        # Create Scene
        scene = Scene()
        scene.addObject3D(s1)
        scene.addObject3D(s2)
        scene.addObject3D(s3)
        scene.addLight(light)
        scene.addLight(ambientLight)

        camera = Camera(Vector(0, 0, 0), Vector(0, 0, 1), 30)

        imagepl = Imageplane(500, 500)

        raytracer = RayTracer(imagepl, scene, camera)

        startTime = time.time()

        raytracer.startRayTracing()

        endTime = time.time()

        self.assertLessEqual(endTime - startTime, 60)


if __name__ == '__main__':
    unittest.main()
