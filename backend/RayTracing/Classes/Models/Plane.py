
from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Object3D import Object3D
from RayTracing.Classes.Models.Vector import Vector
from RayTracing.Classes.Models.Intersection import Intersection


class Plane(Object3D):

    def __init__(self, point, normal, color=Color(), specular=100, reflection=0.1):
        super().__init__(point, color, specular, reflection)
        self.center = point
        self.direction = normal

    def intersection(self, ray, tMin, tMax):
        dot = ray.direction.dotProduct(self.direction)
        if dot > 1e-6:
            rayToCenter = self.center.sub(ray.getStartPoint())
            distance = rayToCenter.dotProduct(self.direction) / dot

            if tMin < distance < tMax:
                return Intersection(ray.startPoint.add(ray.direction.multiply(distance)), self, ray, distance)

        return None

    def getSurfaceNormal(self, point):
        surfaceNormal = self.direction.sub(point)
        surfaceNormal = surfaceNormal.normalize()

        return surfaceNormal
