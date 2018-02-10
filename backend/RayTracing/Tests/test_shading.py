import unittest

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
    def test_specularReflection(self):
        #Light
        light = Light(0, 0, 0, 1)

        # Sphere 1
        c1 = Vector(0, 0, 5)
        s1 = Sphere(c1, 1, Color(0, 1, 0), 1000)

        scene = Scene()
        scene.addObject3D(s1)
        scene.addLight(light)

        camera = Camera(Vector(0, 0, 0), Vector(0, 0, 1), 30)

        imagepl = Imageplane(500, 500)

        raytracer = RayTracer(imagepl, scene, camera)

        pixelRay = Ray(camera.position, Vector(0, 0, 1))

        sphereIntersection = s1.intersection(pixelRay)

        arrColor = raytracer.getColorForIntersection(sphereIntersection)
        testColor = Color(arrColor[0], arrColor[1], arrColor[2])

        green = Color()
        green.green()

        testValue = testColor.isBrighterOrEqualTo(green)
        self.assertTrue(testValue)


if __name__ == '__main__':
    unittest.main()
