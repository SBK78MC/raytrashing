import unittest

import math
import matplotlib.pyplot as plt

from RayTracing.Classes.Models.AmbientLight import AmbientLight
from RayTracing.Classes.Models.Camera import Camera
from RayTracing.Classes.Models.Color import Color

from RayTracing.Classes.Models.Cylinder import Cylinder
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

    sCenter1 = Vector(2, 1, 10)
    sCenter2 = Vector(-2, 1, 13)

    p1 = Plane(Vector(0, -3, 0), Vector(0, 1, 0), Color(1, 0, 0), 0, 0)
    p2 = Plane(Vector(0, 10, 0), Vector(0, -1, 0), Color(0.1, 1.0, 1.0), 0, 0)

    p3 = Plane(Vector(0, 0, 30), Vector(0, 0, -1), Color(0.7, 0.1, 0.2), 0, 0)
    p4 = Plane(Vector(0, 0, -1), Vector(0, 0, 1), Color(0.1, 0.4, 0.8), 0, 0)

    p5 = Plane(Vector(-10, 0, 0), Vector(1, 0, 0), Color(0.2, 0.1, 0.6), 0, 0)
    p6 = Plane(Vector(10, 0, 0), Vector(-1, 0, 0), Color(0.1, 0.7, 0.2), 0, 0)

    s1 = Sphere(sCenter1, 1, Color(1.0, 0, 0), 600, 0, 0)
    s2 = Sphere(sCenter2, 1.3, Color(0, 1.0, 0), 500, 0, 0)

    cube = Cube(Vector(0, 0, 25), 10, Color(0, 1, 0), 1000, 0, 0)

    cone = Cone(Vector(0, 0, 10), 1, 1, Color(1, 0, 0), 1000, 0, 0)
    cylinder = Cylinder(Vector(0, -3, 8), 1, 1, Color(1, 0, 0), 1000, 0.8, 0)

    light1 = Light(0, 3, 8, 0.5)
    light2 = Light(1, 3, 5, 0.3)

    light0 = AmbientLight(0.2)

    scene = Scene()

    scene.addLight(light0)
    scene.addLight(light1)
    scene.addLight(light2)

    scene.addObject3D(s1)
    scene.addObject3D(cylinder)



    scene.addObject3D(cone)
    scene.addObject3D(cube)

    scene.addObject3D(p1)
    #scene.addObject3D(p2)
    #scene.addObject3D(p3)
    #scene.addObject3D(p4)

    #scene.addObject3D(p5)
    #scene.addObject3D(p6)

    imagepl = Imageplane(300, 300)

    camera = Camera(Vector(0, 0, 0), Vector(0, 0, 1), Vector(1, 0, 0), math.pi / 8)
    #camera = Camera(Vector(0, 10, 10), Vector(0, 0, 10), Vector(1, 0, 0), math.pi/8)
    #camera = Camera(Vector(10, 0, 10), Vector(0, 0, 10), Vector(0, 0, 1), math.pi / 4)

    #camera = Camera(Vector(3, -4, 2), Vector(0, 0, 10), Vector(1, 1, 1), math.pi / 4)
    #camera = Camera(Vector(-10, 0, 10), Vector(1, 0, 10), Vector(0, 0, -1), math.pi / 4)
    #camera = Camera(Vector(-7, 3, 8), Vector(1, 0, 5), Vector(0, 1, 0), math.pi / 4)
    #camera = Camera(Vector(3, 5, 10), Vector(0, 0, 7), Vector(0, 1, 0), math.pi / 4)
    raytrace = RayTracer(imagepl, scene, camera)

    plt.imsave('FirstImages.png', raytrace.startRayTracing())

    #raytrace = RayTracer(imagepl, scene, camera)

    #plt.imsave('FirstImages2.png', raytrace.startRayTracing2())
    #unittest.main()