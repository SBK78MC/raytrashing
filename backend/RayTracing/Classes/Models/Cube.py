from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Cuboid import Cuboid
from RayTracing.Classes.Models.Intersection import Intersection
from RayTracing.Classes.Models.Vector import Vector


class Cube(Cuboid):

    def __init__(self, x=0, y=0, z=0, l=0, color=Color(), specular=100, reflection=0.1, transparency=0):
        super().__init__(x, y, z, l, l, l, color, specular, reflection, transparency)


    def __init__(self, v=Vector(0,0,0), l=0, color=Color(), specular=100, reflection=0.1, transparency=0):
        super().__init__(v, l, l, l, color, specular, reflection, transparency)

    def intersection(self, ray, tMin, tMax):
        bounds = list()
        bounds.append(self.minPoint)
        bounds.append(self.maxPoint)

        tmin = (bounds[ray.inv[0]].x - ray.startPoint.x) * ray.inverseDirection.x;
        tmax = (bounds[1 - ray.inv[0]].x - ray.startPoint.x) * ray.inverseDirection.x;

        tymin = (bounds[ray.inv[1]].y - ray.startPoint.y) * ray.inverseDirection.y;
        tymax = (bounds[1 - ray.inv[1]].y - ray.startPoint.y) * ray.inverseDirection.y;

        if ((tmin > tymax) or (tymin > tmax)):
            return None
        if (tymin > tmin):
            tmin = tymin
        if (tymax < tmax):
            tmax = tymax

        tzmin = (bounds[ray.inv[2]].z - ray.startPoint.z) * ray.inverseDirection.z;
        tzmax = (bounds[1 - ray.inv[2]].z - ray.startPoint.z) * ray.inverseDirection.z;

        if ((tmin > tzmax) or (tzmin > tmax)):
            return None
        if (tzmin > tmin):
            tmin = tzmin
        if (tzmax < tmax):
            tmax = tzmax

        if not tMin < tmin < tMax:
            return None

        point = ray.getPointOfRay(tmin)
        intersection = Intersection(point, self, ray, tmin)

        return intersection