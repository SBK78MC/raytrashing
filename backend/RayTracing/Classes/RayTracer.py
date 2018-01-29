import math
import numpy
import matplotlib.pyplot as plt

from RayTracer.Classes.Models.Light import Light
from RayTracer.Classes.Models.Imageplane import Imageplane
from RayTracer.Classes.Models.Ray import Ray
from RayTracer.Classes.Models.Scene import Scene
from RayTracer.Classes.Models.Sphere import Sphere
from RayTracer.Classes.Models.Vector import Vector


class RayTracers:

    fov = 30

    def __init__(self, imageplane=Imageplane(), mainscene=Scene()):
        self.imageplane = imageplane
        self.scene = mainscene
        self.imageAspectRatio = imageplane.width/imageplane.height
        self.angle = math.tan(math.pi * 0.5 * self.fov/180.0)
        self.camera = Vector(0, 0, 0)
        self.img = numpy.zeros((imageplane.getHeight(), imageplane.getWidth(), 3))

    def startRayTracing(self):

        for x in range(0, self.imageplane.getWidth()):
            for y in range(0, self.imageplane.getHeight()):
                px = (2 * ((x + 0.5) / self.imageplane.getWidth()) - 1) * self.angle * self.imageAspectRatio
                py = (1 - 2 * ((y + 0.5) / self.imageplane.getHeight())) * self.angle

                pixelDirection = Vector(px, py, self.camera.getZ() + 1)

                pixelRay = Ray(self.camera, pixelDirection)

                for obj in self.scene.getObjects():
                    if obj.intersection(pixelRay):
                        self.img[x, y] = [1, 0, 0]

        plt.imsave('FirstImages.png', self.img)

    def getPixelColor(self, ray):
        return 0


if __name__ == "__main__":

    sCenter = Vector(1, 1, 15)
    s1 = Sphere(sCenter, 1)
    light1 = Light(2, 4, 5, 0.4)

    scene = Scene()
    scene.addLight(light1)
    scene.addObject3D(s1)

    imagepl = Imageplane(500, 500)

    raytrace = RayTracers(imagepl, scene)
    raytrace.startRayTracing()
