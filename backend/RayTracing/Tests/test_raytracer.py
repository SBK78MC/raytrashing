import unittest
import matplotlib.pyplot as plt

from RayTracing.Classes.Models.AmbientLight import AmbientLight
from RayTracing.Classes.Models.Camera import Camera
from RayTracing.Classes.Models.Imageplane import Imageplane
from RayTracing.Classes.Models.Light import Light
from RayTracing.Classes.Models.Scene import Scene
from RayTracing.Classes.Models.Sphere import Sphere
from RayTracing.Classes.Models.Vector import Vector
from RayTracing.Classes.RayTracer import RayTracer

if __name__ == '__main__':
    sCenter = Vector(2, 2, 15)
    sCenter1 = Vector(1, 1, 19)

    s1 = Sphere(sCenter, 1, [1.0, 0.0, 0.0], 1000)
    s2 = Sphere(sCenter1, 2, [0.0, 1.0, 0.0], 500)
    light1 = Light(2, 3, 11, 0.7)
    light0 = AmbientLight(0.1)

    scene = Scene()
    scene.addLight(light0)
    scene.addLight(light1)
    scene.addObject3D(s1)
    scene.addObject3D(s2)

    imagepl = Imageplane(500, 500)

    camera = Camera(Vector(0, 0, 0), Vector(0, 0, 1), 30)

    raytrace = RayTracer(imagepl, scene, camera)

    plt.imsave('FirstImages.png', raytrace.startRayTracing())
    #unittest.main()
