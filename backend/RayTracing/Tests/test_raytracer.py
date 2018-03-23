import unittest

import math
import matplotlib.pyplot as plt

from RayTracing.Classes.Models.AmbientLight import AmbientLight
from RayTracing.Classes.Models.Camera import Camera
from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Cone import Cone
from RayTracing.Classes.Models.Cube import Cube
from RayTracing.Classes.Models.Imageplane import Imageplane
from RayTracing.Classes.Models.Light import Light
from RayTracing.Classes.Models.Scene import Scene
from RayTracing.Classes.Models.Sphere import Sphere
from RayTracing.Classes.Models.Vector import Vector
from RayTracing.Classes.Models.Plane import Plane
from RayTracing.Classes.RayTracer import RayTracer

if __name__ == '__main__':

    sCenter1 = Vector(-1, 1, 24)
    sCenter2 = Vector(0.5, 0, 17)
    sCenter3 = Vector(3.5, 1.5, 20)
    sCenter4 = Vector(-8, 0, 17)

    pCenter1 = Vector(0, -3, 0)
    pDir1 = Vector(0, 1, 0)

    pCenter2 = Vector(0, 0, 22)
    pDir2 = Vector(0, 0, -1)

    p1 = Plane(pCenter1, pDir1, Color(0.1, 1.0, 1.0), 200, 0.3)
    p2 = Plane(pCenter2, pDir2, Color(0.7, 0.7, 1.0), 200, 0.1, 0.6)

    #s1 = Sphere(sCenter, 1, Color(1.0, 0, 0), 1000, 0.7)
    #s2 = Sphere(sCenter1, 2, Color(0, 1.0, 0), 500, 0.7)
    #s3 = Plane(pCenter3, pDir, Color(0.1, 1.0, 1.0), 200, 0.3)

    cube = Cube(Vector(0, 0, 4), 1, Color(1,0,0), 1000, 0.1, 0.0)
    sphere = Sphere(Vector(0, 0, 7), 2, Color(0, 1, 0), 1000, 0.1, 0.0)

    #cone = Cone(Vector(0, 0, 10), 1, 1, Color(1, 0, 0), 1000, 0.2, 1.0)

    light1 = Light(0, 3, 7, 0.7)
    light0 = AmbientLight(0.5)

    scene = Scene()

    scene.addLight(light0)
    scene.addLight(light1)
    #scene.addObject3D(s1)
    #scene.addObject3D(s2)
    #scene.addObject3D(s3)

    #scene.addObject3D(cone)
    scene.addObject3D(cube)
    scene.addObject3D(sphere)

    #scene.addObject3D(s4)

    imagepl = Imageplane(500, 500)

    #camera = Camera(Vector(0, 0, 0), Vector(0, 0, 1), Vector(0, 1, 0), math.pi / 4)
    #camera = Camera(Vector(0, 8, 5), Vector(0, -1, 5), Vector(-1, 0, 0), math.pi/4)
    #camera = Camera(Vector(10, 0, 5), Vector(-1, 0, 5), Vector(0, 0, 1), math.pi / 4)
    camera = Camera(Vector(-10, 0, 5), Vector(1, 0, 5), Vector(0, 1, 0), math.pi / 4)
    #camera = Camera(Vector(-10, 0, 10), Vector(1, 0, 10), Vector(0, 0, -1), math.pi / 4)
    #camera = Camera(Vector(-7, 3, 8), Vector(1, 0, 5), Vector(0, 1, 0), math.pi / 4)
    #camera = Camera(Vector(3, 5, 10), Vector(0, 0, 7), Vector(0, 1, 0), math.pi / 4)

    raytrace = RayTracer(imagepl, scene, camera)

    plt.imsave('FirstImages.png', raytrace.startRayTracing())

    #raytrace = RayTracer(imagepl, scene, camera)

    #plt.imsave('FirstImages2.png', raytrace.startRayTracing2())
    #unittest.main()