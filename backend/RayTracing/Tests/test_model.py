import unittest

import math

import sys

from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Camera import Camera
from RayTracing.Classes.Models.Color import Color

from RayTracing.Classes.Models.Cube import Cube
from RayTracing.Classes.Models.Cylinder import Cylinder

from RayTracing.Classes.Models.Cube import Cube
from RayTracing.Classes.Models.Light import Light
from RayTracing.Classes.Models.MathUtil import MathUtil
from RayTracing.Classes.Models.Object3D import Object3D
from RayTracing.Classes.Models.Ray import Ray
from RayTracing.Classes.Models.Sphere import Sphere
from RayTracing.Classes.Models.Tuple import Tuple
from RayTracing.Classes.Models.Vector import Vector
from RayTracing.Classes.Models.Cone import Cone

class VectorTest(unittest.TestCase):

    def test_constructor(self):
        v = Vector()
        v.setX(3)
        v.setY(2)
        self.assertEqual(v.x, 3)
        self.assertEqual(v.y, 2)
        self.assertEqual(v.z, 0)
        v.setZ(1)
        self.assertEqual(v.z, 1)

    def test_normalize(self):
        v = Vector(3, 2, 0)
        self.assertEqual(v.getNormalizedLength(), 1)

    def test_dotproduct(self):
        v = Vector(2, 2, 2)
        self.assertEqual(v.dotProduct(v), 12)

    def test_calcLength(self):
        v = Vector(4, 0, 3)
        self.assertEqual(v.calcLength(), 5)
        b = Vector(-6, 6, 7)
        self.assertEqual(b.calcLength(), 11)

    def test_add(self):
        v = Vector(3, 5, 1)
        b = Vector(1, 0, 2)
        r = v.add(b)
        self.assertEqual(r.x, 4)
        self.assertEqual(r.y, 5)
        self.assertEqual(r.z, 3)

    def test_sub(self):
        v = Vector(3, 5, 1)
        b = Vector(1, 0, 2)
        r = v.sub(b)
        self.assertEqual(r.x, 2)
        self.assertEqual(r.y, 5)
        self.assertEqual(r.z, -1)

    def test_getNormalizedLength(self):
        v = Vector(3, 2, 0)
        self.assertEqual(v.getNormalizedLength(), 1)

    def test_multiply(self):
        v = Vector(3, 2, 5)
        r = v.multiply(2)
        self.assertEqual(r.x, 6)
        self.assertEqual(r.y, 4)
        self.assertEqual(r.z, 10)

    def test_crossProduct(self):
        v = Vector(3, 2, 5)
        b = Vector(4, 1, 2)
        r = v.crossProduct(b)
        self.assertEqual(r.x, -1)
        self.assertEqual(r.y, 14)
        self.assertEqual(r.z, -5)

    def test_equals(self):
        v = Vector(3, 2, 5)
        b = Vector(4, 1, 2)
        v2 = Vector(3, 2, 5)
        vb = v.equals(b)
        vv = v.equals(v2)
        self.assertFalse(vb)
        self.assertTrue(vv)

    def test_negative(self):
        v = Vector(3, 2, 5)
        b = Vector(-3, -2, -5)
        v2 = Vector(-1, 2, 3)
        v3 = Vector(1, -2, -3)
        vb = v.equals(b.getNegative())
        vv = v2.equals(v3.getNegative())
        self.assertTrue(vb)
        self.assertTrue(vv)

    def test_getInverse(self):
        v = Vector(0, 0, 0.5)
        invV = v.getInverse()

        self.assertEqual(invV.x, sys.float_info.max)
        self.assertEqual(invV.y, sys.float_info.max)
        self.assertEqual(invV.z, 2)


class SphereTest(unittest.TestCase):

    def test_intersection(self):
        startPoint = Vector(0, 0, 0)
        direction = Vector(2.0, 2.0, 0)
        line = Ray(startPoint, direction)
        center = Vector(5.0, 3.0, 0.0)
        sphere = Sphere(center, 2.0)
        intersection = sphere.intersection(line, 0, math.inf)
        self.assertEqual(intersection.point.x, 3)
        self.assertEqual(intersection.point.y, 3)
        self.assertEqual(intersection.point.z, 0)

    def test_NoIntersection(self):
        startPoint = Vector(1, 1, 4)
        direction = Vector(2, 3, 1)
        line = Ray(startPoint, direction)
        center = Vector(5.0, 1, 3)
        sphere = Sphere(center, 2)
        intersection = sphere.intersection(line, 0, math.inf)
        self.assertIsNone(intersection)


class MathUtilTest(unittest.TestCase):

    def test_solveQuadraticFormula(self):
        a = 8
        b = -32
        c = 30
        result = MathUtil.solveQuadraticFormula(a, b, c)
        self.assertEqual(result.x1, 2.5)
        self.assertEqual(result.x2, 1.5)

    def test_solveQuadraticFormulaFail(self):
        a = 3
        b = 1
        c = 13
        self.assertEqual(None, MathUtil.solveQuadraticFormula(a, b, c))


class TupleTest(unittest.TestCase):

    def test_getSmallestPositiv(self):
        t = Tuple(-1, 4)
        self.assertEqual(t.getSmallestPositive(), 4)


class LightTest(unittest.TestCase):

    def test_getLightVector(self):
        point = Vector(7, 3, 1)
        light = Light(2, 2, 2, 1)
        lightray = light.getLightVector(point)
        self.assertEqual(lightray.x, -5)
        self.assertEqual(lightray.y, -1)
        self.assertEqual(lightray.z, 1)


class CameraTest(unittest.TestCase):

    def test_calculateAngle(self):
        c = Camera(Vector(0, 0, 0), Vector(1, 2, 3), Vector(1, 0, 0), 30)
        self.assertEqual(0.2679491924311227, c.getAngle())

class ColorTest(unittest.TestCase):

    def test_compareBrightness(self):
        red = Color()
        red.red()
        white = Color()
        white.white()
        test1 = red.isBrighterOrEqualTo(white)
        test2 = white.isBrighterOrEqualTo(red)
        self.assertFalse(test1)
        self.assertTrue(test2)

class RayTest(unittest.TestCase):

    def test_constructor(self):
        ray = Ray(Vector(0, 0, 0), Vector(0, 0, 1))


class CubeTest(unittest.TestCase):

    def test_constructor(self):
        cube = Cube(Vector(1, 1, 1), 2, Color().red(), 10)
        self.assertEqual(cube.minPoint.x, 0)
        self.assertEqual(cube.minPoint.y, 0)
        self.assertEqual(cube.minPoint.z, 0)
        self.assertEqual(cube.maxPoint.x, 2)
        self.assertEqual(cube.maxPoint.y, 2)
        self.assertEqual(cube.maxPoint.z, 2)

    def test_intersection(self):
        cube = Cube(Vector(0, 0, 5), 2, 10, 10)
        ray = Ray(Vector(0,0,0), Vector(0,0.25,1))
        intersection = cube.intersection(ray)

    def test_multiply(self):
        black = Color(0.0, 0.0, 0.0)
        small = Color(0.1, 0.1, 0.1)
        multiplier = 0.3
        multiplicationResultblack = black.multiply(multiplier)
        multiplicationResultsmall = small.multiply(multiplier)
        self.assertEqual(multiplicationResultblack.getArray(), black.getArray())
        self.assertEqual(multiplicationResultsmall.getArray(), [0.03, 0.03, 0.03])

    def test_addition(self):
        black = Color(0.3, 0.2, 0.16)
        small = Color(0.2, 0.8, 0.62)
        additionResult = black.add(small)
        additionResult2 = small.add(black)
        self.assertEqual(additionResult.getArray(), [0.5, 1.0, 0.78])
        self.assertEqual(additionResult2.getArray(), [0.5, 1.0, 0.78])

    def test_compareBrightness(self):
        red = Color()
        red.red()
        white = Color()
        white.white()
        test1 = red.isBrighterOrEqualTo(white)
        test2 = white.isBrighterOrEqualTo(red)
        self.assertFalse(test1)
        self.assertTrue(test2)

class RayTest(unittest.TestCase):

    def test_constructor(self):
        ray = Ray(Vector(0, 0, 0), Vector(0, 0, 1))
        self.assertEqual(ray.direction.x, 0)

class CubeTest(unittest.TestCase):

    def test_constructor(self):
        cube = Cube(Vector(1, 1, 1), 2, Color().red(), 10)
        self.assertEqual(cube.minPoint.x, 0)
        self.assertEqual(cube.minPoint.y, 0)
        self.assertEqual(cube.minPoint.z, 0)
        self.assertEqual(cube.maxPoint.x, 2)
        self.assertEqual(cube.maxPoint.y, 2)
        self.assertEqual(cube.maxPoint.z, 2)

    def test_intersection(self):
        cube = Cube(Vector(0, 0, 5), 2, 10, 10)
        ray = Ray(Vector(0, 0, 0), Vector(0, 0.25, 1))
        intersection = cube.intersection(ray, 1, 10000)
        self.assertEqual(intersection.point.x, 0)
        self.assertEqual(intersection.point.y, 1)
        self.assertEqual(intersection.point.z, 4)

class CylinderTest(unittest.TestCase):

    def test_constructor(self):
        cylinder = Cylinder(Vector(0, 0, 5), 2, 1, Color().red(), 10, 0.1)
        self.assertEqual(cylinder.center.x, 0)
        self.assertEqual(cylinder.center.y, 0)
        self.assertEqual(cylinder.center.z, 5)
        self.assertEqual(cylinder.radius, 1)
        self.assertEqual(cylinder.height, 2)

    def test_intersection(self):
        cylinder = Cylinder(Vector(0, 0, 5), 2, 1, Color().red(), 10, 0.1)
        ray = Ray(Vector(0,0,0), Vector(0.00, 0.0, 1.0))
        intersection = cylinder.intersection(ray, 0, 1000)
        self.assertEqual(intersection.point.x, 0.0)
        self.assertEqual(intersection.point.y, 0.0)
        self.assertEqual(intersection.point.z, 4.0)

    def test_intersection2(self):
        cylinder = Cylinder(Vector(0, 0, 5), 2, 1, Color().red(), 10, 0.1)
        ray = Ray(Vector(0,0,0), Vector(0, 0.1, 1))
        intersection = cylinder.intersection(ray, 0, 1000)
        self.assertEqual(intersection.point.x, 0.0)
        self.assertEqual(intersection.point.y, 0.4)
        self.assertEqual(intersection.point.z, 4.0)

    def test_intersection3(self):
        cylinder = Cylinder(Vector(0, 0, 5), 2, 1, Color().red(), 10, 0.1)
        ray = Ray(Vector(0,0,0), Vector(0, 1, 1))
        intersection = cylinder.intersection(ray, 0, 1000)
        self.assertIsNone(intersection)

    def test_intersection4(self):
        cylinder = Cylinder(Vector(0, 8, 14), 10, 1.5, Color().red(), 10, 0.1)
        ray = Ray(Vector(0, 0, 0), Vector(0.0, 1.8, 1))
        intersection = cylinder.intersection(ray, 0, 1000)
        self.assertIsNone(intersection)

    def test_intersection5(self):
        cylinder = Cylinder(Vector(0, 0, 5), 2, 1, Color().red(), 10, 0.1)
        ray = Ray(Vector(0, 0, 0), Vector(0.1, -0.2, 1))
        intersection = cylinder.intersection(ray, 0, 1000)
        self.assertAlmostEqual(intersection.point.x, 0.4087346744)
        self.assertAlmostEqual(intersection.point.y, -0.8174693488)
        self.assertAlmostEqual(intersection.point.z, 4.0873467439)

    def test_intersection6(self):
        cylinder = Cylinder(Vector(0, 8, 14), 10, 1.5, Color().red(), 10, 0.1)
        ray = Ray(Vector(0, 0, 0), Vector(0.0, 0.2, 1))
        intersection = cylinder.intersection(ray, 0, 1000)
        self.assertAlmostEqual(intersection.point.x, 0.0)
        self.assertAlmostEqual(intersection.point.y, 3)
        self.assertAlmostEqual(intersection.point.z, 15)

    def test_getSurfaceNormal(self):
        cylinder = Cylinder(Vector(0, 8, 14), 10, 1.5, Color().red(), 10, 0.1)
        point = Vector(0, 3, 15)
        surfaceNormal = cylinder.getSurfaceNormal(point)
        self.assertEqual(surfaceNormal.x, 0)
        self.assertEqual(surfaceNormal.y, -1)
        self.assertEqual(surfaceNormal.z, 0)

    def test_getSurfaceNormal1(self):
        cylinder = Cylinder(Vector(0, 0, 5), 10, 1.5, Color().red(), 10, 0.1)
        point = Vector(0, 0, 3.5)
        surfaceNormal = cylinder.getSurfaceNormal(point)
        self.assertEqual(surfaceNormal.x, 0)
        self.assertEqual(surfaceNormal.y, 0)
        self.assertEqual(surfaceNormal.z, -1)

    def test_getSurfaceNormal2(self):
        cylinder = Cylinder(Vector(0, 0, 5), 10, 1.5, Color().red(), 10, 0.1)
        point = Vector(-1.5, 2.5, 5)
        surfaceNormal = cylinder.getSurfaceNormal(point)
        self.assertEqual(surfaceNormal.x, -1)
        self.assertEqual(surfaceNormal.y, 0)
        self.assertEqual(surfaceNormal.z, 0)

class ConeTest(unittest.TestCase):

    def test_constructor(self):
        cone = Cone(Vector(0, 0, 5), 3, 1, Color(1, 0, 0))
        self.assertEqual(cone.bottom.x, 0)
        self.assertEqual(cone.bottom.y, -1.5)
        self.assertEqual(cone.bottom.z, 5)

        self.assertEqual(cone.top.x, 0)
        self.assertEqual(cone.top.y, 4.5)
        self.assertEqual(cone.top.z, 5)

        self.assertEqual(cone.radius, 1)
        self.assertEqual(cone.height, 3)

        self.assertAlmostEqual(cone.alpha, 18.43494882)

    def test_intersection(self):
        cone = Cone(Vector(0, 0, 5), 3, 1, Color(1, 0, 0))

        ray = Ray(Vector(0, 0, 0), Vector(0, 0, 1))
        intersection = cone.intersection(ray, 0.00001, 1000)

        self.assertAlmostEqual(intersection.point.x, 0.0)
        self.assertAlmostEqual(intersection.point.y, 0.0)
        self.assertAlmostEqual(intersection.point.z, 4.5)

    def test_intersection2(self):
        cone = Cone(Vector(0, 0, 5), 3, 1, Color(1, 0, 0))
        ray = Ray(Vector(0, 0, 0), Vector(0.0, 0.05, 1))
        intersection = cone.intersection(ray, 0.00001, 1000)

        self.assertAlmostEqual(intersection.point.x, 0.0)
        self.assertAlmostEqual(intersection.point.y, 0.2288135593)
        self.assertAlmostEqual(intersection.point.z, 4.5762711864)

    def test_intersection3(self):
        cone = Cone(Vector(0, 0, 5), 3, 1, Color(1, 0, 0))
        ray = Ray(Vector(0, 0, 0), Vector(0.0, 1.0, 1))
        intersection = cone.intersection(ray, 0.00001, 1000)

        self.assertIsNone(intersection)

    def test_intersection4(self):
        cone = Cone(Vector(0, 0, 5), 3, 1, Color(1, 0, 0))
        ray = Ray(Vector(0, 0, 0), Vector(0.05, -0.3, 1))
        intersection = cone.intersection(ray, 0.00001, 1000)

        self.assertAlmostEqual(intersection.point.x, 0.205613676)
        self.assertAlmostEqual(intersection.point.y, -1.233682056)
        self.assertAlmostEqual(intersection.point.z, 4.11227352)

    def test_intersection5(self):
        cone = Cone(Vector(0, 2.5, 5), 3, 1, Color(1, 0, 0))
        ray = Ray(Vector(0, 0, 0), Vector(0.05, 0.2, 1))
        intersection = cone.intersection(ray, 0.00001, 1000)

        self.assertAlmostEqual(intersection.point.x, 0.25, 3)
        self.assertAlmostEqual(intersection.point.y, 1.0, 3)
        self.assertAlmostEqual(intersection.point.z, 5, 3)

class Object3DTest(unittest.TestCase):

    def test_checkReflectionAndTransparency(self):
        object = Object3D(Vector(0, 0, 5), Color(1, 0, 0), 0, 0.4, 0.3)
        objectMore = Object3D(Vector(0, 0, 5), Color(1, 0, 0), 0, 1.0, 1.0)

        self.assertEqual(object.getReflection(), 0.4)
        self.assertEqual(object.getTransparency(), 0.3)

        self.assertEqual(objectMore.getReflection(), 0.5)
        self.assertEqual(objectMore.getTransparency(), 0.5)

if __name__ == '__main__':
    unittest.main()
