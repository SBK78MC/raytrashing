import unittest
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
    sCenter1 = Vector(-1, 0, 20)
    sCenter = Vector(3, 0, 18)

    pCenter3 = Vector(0, -3, 0)
    pDir = Vector(0, 1, 0)


    s1 = Sphere(sCenter, 1, Color(1.0, 0, 0), 1000, 0.7)
    s2 = Sphere(sCenter1, 2, Color(0, 1.0, 0), 500, 0.7)
    s3 = Plane(pCenter3, pDir, Color(0.1, 1.0, 1.0), 200, 0.3)

    cube = Cube(Vector(-1, 1, 10), 1, Color(0,1,0), 1000, 0.5, 0.8)

    cone = Cone(Vector(1.5, 3, 10), 3, 1, Color(1, 0, 0), 1000, 0.2, 1.0)

    light1 = Light(3, 3, 5, 0.7)
    light0 = AmbientLight(0.5)


    scene = Scene()

    scene.addLight(light0)
    scene.addLight(light1)
    #scene.addObject3D(s1)
    #scene.addObject3D(s2)
    #scene.addObject3D(s3)

    scene.addObject3D(cone)
    scene.addObject3D(cube)

    imagepl = Imageplane(500, 500)

    #scene.addObject3D(s4)

    imagepl = Imageplane(750, 750)

    camera = Camera(Vector(0, 0, 0), Vector(0, 0, 1), 30)

    raytrace = RayTracer(imagepl, scene, camera)

    plt.imsave('FirstImages.png', raytrace.startRayTracing())
    #unittest.main()