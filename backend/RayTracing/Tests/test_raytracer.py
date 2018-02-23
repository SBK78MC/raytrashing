import unittest
import matplotlib.pyplot as plt

from RayTracing.Classes.Models.AmbientLight import AmbientLight
from RayTracing.Classes.Models.Camera import Camera
from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Imageplane import Imageplane
from RayTracing.Classes.Models.Light import Light
from RayTracing.Classes.Models.Scene import Scene
from RayTracing.Classes.Models.Sphere import Sphere
from RayTracing.Classes.Models.Vector import Vector
from RayTracing.Classes.RayTracer import RayTracer

if __name__ == '__main__':

    sCenter1 = Vector(3, 1, 16)
    sCenter2 = Vector(-1, 0, 19)
    sCenter3 = Vector(3.5, 0.5, 16.5)
    #sCenter4 = Vector(0, 0, -10)

    s1 = Sphere(sCenter1, 1, Color(1.0, 0, 0), 50, 0.05)
    s2 = Sphere(sCenter2, 3, Color(1, 1, 0.1), 1000, 0.7)
    s3 = Sphere(sCenter3, 1, Color(0, 0.3, 0.8), 500, 0.8)

    #s4 = Sphere(sCenter4, 3, Color(0.1, 0.1, 0.1), 500, 0.8)

    light1 = Light(5, 0, 8, 0.9)
    light0 = AmbientLight(0.3)

    scene = Scene()

    scene.addLight(light0)
    scene.addLight(light1)
    scene.addObject3D(s1)
    scene.addObject3D(s2)
    scene.addObject3D(s3)


    #scene.addObject3D(s4)

    imagepl = Imageplane(400, 400)

    camera = Camera(Vector(0, 0, 0), Vector(0, 0, 1), 30)

    raytrace = RayTracer(imagepl, scene, camera)

    plt.imsave('FirstImages.png', raytrace.startRayTracing())
    #unittest.main()
