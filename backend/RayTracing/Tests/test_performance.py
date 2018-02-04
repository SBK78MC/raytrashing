import unittest
import time

from RayTracing.Classes import RayTracer
from RayTracing.Classes.Models.AmbientLight import AmbientLight
from RayTracing.Classes.Models.Light import Light
from RayTracing.Classes.Models.Scene import Scene
from RayTracing.Classes.Models.Sphere import Sphere
from RayTracing.Classes.Models.Vector import Vector


class PerformanceTest(unittest.TestCase):

    def test_SimpleScene(self):
        light = Light(0, 2, 6, 1)
        center = Vector(.8, .1, 1.)
        sphere = Sphere(center, .4)
        sphere.setColorRGB(255, 0, 0)
        sphere.setReflection(0)
        scene = Scene()
        scene.addObject3D(sphere)
        raytracer = RayTracer.getInstance().setScene(scene)
        startTime = time.time()
        raytracer.startRayTracing()
        endTime = time.time()
        self.assertLessEqual(endTime - startTime, 10)


    def test_largeScene(self):
        light = Light(0, 2, 6, 1)
        ambientLight = AmbientLight(0.3)

        # Sphere 1
        c1 = Vector(.8, .5, 1.5)
        s1 = Sphere(c1, .4)
        s1.setColorRGB(0, 255, 0)
        s1.setReflection(0.7)

        # Sphere 2
        c2 = Vector(.7, .1, 1.)
        s2 = Sphere(c2, .7)
        s2.setColorRGB(0, 0, 255)
        s2.setReflection(0.3)

        # Sphere 3
        c3 = Vector(.4, .4, .7)
        s3 = Sphere(c3, .2)
        s3.setColorRGB(255, 0, 0)
        s3.setReflection(0.5)

        # Create Scene
        scene = Scene()
        scene.addObject3D(s1)
        scene.addObject3D(s2)
        scene.addObject3D(s3)
        scene.addLight(light)
        scene.addLight(ambientLight)

        raytracer = RayTracer.getInstance().setScene(scene)

        startTime = time.time()

        raytracer.startRayTracing()

        endTime = time.time()

        self.assertLessEqual(endTime - startTime, 30)



if __name__ == '__main__':
    unittest.main()