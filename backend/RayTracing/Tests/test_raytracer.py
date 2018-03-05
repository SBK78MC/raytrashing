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

    sCenter1 = Vector(-1, 1, 24)
    sCenter2 = Vector(-2.5, 0, 19)
    sCenter3 = Vector(3.5, 1.5, 20)
    sCenter4 = Vector(-8, 0, 19)

    s1 = Sphere(sCenter1, 2, Color(1.0, 0, 0), 700, 0.)
    s2 = Sphere(sCenter2, 3, Color(1, 1, 0.1), 500, 0., 0.6)
    s3 = Sphere(sCenter3, 1, Color(0, 0.3, 0.8), 500, 0.8)
    s4 = Sphere(sCenter4, 3, Color(0, 0, 1), 500, 0.3)

    light1 = Light(5, 0, 13, 0.7)
    light0 = AmbientLight(0.3)

    scene = Scene()

    scene.addLight(light0)
    scene.addLight(light1)
    scene.addObject3D(s1)
    scene.addObject3D(s2)
    scene.addObject3D(s3)
    scene.addObject3D(s4)

    imagepl = Imageplane(400, 400)

    camera = Camera(Vector(0, 0, 0), Vector(0, 0, 1), 30)

    raytrace = RayTracer(imagepl, scene, camera)

    plt.imsave('FirstImages.png', raytrace.startRayTracing())
    #unittest.main()
