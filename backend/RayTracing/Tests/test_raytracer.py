import unittest
import matplotlib.pyplot as plt

from RayTracing.Classes.Models.AmbientLight import AmbientLight
from RayTracing.Classes.Models.Camera import Camera
from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Imageplane import Imageplane
from RayTracing.Classes.Models.Light import Light
from RayTracing.Classes.Models.Scene import Scene
from RayTracing.Classes.Models.Sphere import Sphere
from RayTracing.Classes.Models.Triangle import Triangle
from RayTracing.Classes.Models.Vector import Vector
from RayTracing.Classes.Models.Plane import Plane
from RayTracing.Classes.RayTracer import RayTracer

if __name__ == '__main__':

    sCenter1 = Vector(-1, 1, 24)
    sCenter2 = Vector(0.5, 0, 17)
    sCenter3 = Vector(3.5, 1.5, 20)
    sCenter4 = Vector(-8, 0, 17)
    sCenter4 = Vector(2.5, 3, -10)
    sCenter5 = Vector(-2.5, 3, -10)
    sCenter6 = Vector(0, 7, -10)

    pCenter1 = Vector(0, -3, 0)
    pDir1 = Vector(0, 1, 0)

    pCenter2 = Vector(0, 0, 22)
    pDir2 = Vector(0, 0, -1)

    p1 = Plane(pCenter1, pDir1, Color(0.1, 1.0, 1.0), 200, 0.3)
    p2 = Plane(pCenter2, pDir2, Color(0.7, 0.7, 1.0), 200, 0.1, 0.6)

    s1 = Sphere(sCenter1, 2, Color(1.0, 0, 0), 700, 0.6)
    s2 = Sphere(sCenter2, 2, Color(1, 1, 0.1), 500, 0., 0.7)
    s3 = Sphere(sCenter3, 1, Color(0, 0.3, 0.8), 500, 0.6)
    s4 = Sphere(sCenter4, 3, Color(1, 0.5, 0), 500, 0.3)
    s5 = Triangle(sCenter4, sCenter5, sCenter6, Color(0, 1.0, 0), 500)

    light1 = Light(5, 0, 13, 0.7)
    light0 = AmbientLight(0.3)

    scene = Scene()

    #scene.addLight(light0)
    #scene.addLight(light1)
    #scene.addObject3D(s1)
    #scene.addObject3D(s2)
    #scene.addObject3D(s3)
    #scene.addObject3D(s4)
    scene.addObject3D(s5)

    #scene.addObject3D(p1)
    #scene.addObject3D(p2)


    imagepl = Imageplane(400, 400)

    camera = Camera(Vector(0, 0, 0), Vector(0, 0, 1), 30)

    raytrace = RayTracer(imagepl, scene, camera)

    plt.imsave('FirstImages.png', raytrace.startRayTracing())
    #unittest.main()