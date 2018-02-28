import unittest
import matplotlib.pyplot as plt

from RayTracing.Classes.Models.AmbientLight import AmbientLight
from RayTracing.Classes.Models.Camera import Camera
from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Imageplane import Imageplane
from RayTracing.Classes.Models.Light import Light
from RayTracing.Classes.Models.Plane import Plane
from RayTracing.Classes.Models.Scene import Scene
from RayTracing.Classes.Models.Sphere import Sphere
from RayTracing.Classes.Models.Vector import Vector
from RayTracing.Classes.RayTracer import RayTracer

if __name__ == '__main__':

    sCenter1 = Vector(-1, 0, 30)
    sCenter = Vector(3, 0, 17)
    pCenter3 = Vector(0, -4, 0)
    pDir = Vector(0, 1, 0)

    s1 = Sphere(sCenter, 1, Color(1.0, 0, 0), 500, 0.5)
    s2 = Sphere(sCenter1, 3, Color(0, 1.0, 0), 800, 0.2)
    s3 = Plane(pCenter3, pDir, Color(0.1, 0.5, 0.3), 200, 0.3)
    light1 = Light(5, 4, 15, 0.7)
    light0 = AmbientLight(0.5)

    scene = Scene()

    scene.addLight(light0)
    scene.addLight(light1)
    scene.addObject3D(s1)
    scene.addObject3D(s2)
    scene.addObject3D(s3)

    imagepl = Imageplane(400, 400)

    camera = Camera(Vector(0, 0, 0), Vector(0, 0, 1), 30)

    raytrace = RayTracer(imagepl, scene, camera)

    plt.imsave('FirstImages.png', raytrace.startRayTracing())
    #unittest.main()
