import unittest

from RayTracing.Classes.Models.Camera import Camera
from RayTracing.Classes.Models.Color import Color
from RayTracing.Classes.Models.Light import Light
from RayTracing.Classes.Models.MathUtil import MathUtil
from RayTracing.Classes.Models.Ray import Ray
from RayTracing.Classes.Models.Sphere import Sphere
from RayTracing.Classes.Models.Tuple import Tuple
from RayTracing.Classes.Models.Vector import Vector




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


class SphereTest(unittest.TestCase):

    def test_intersection(self):
        startPoint = Vector(0, 0, 0)
        direction = Vector(2.0, 2.0, 0)
        line = Ray(startPoint, direction)
        center = Vector(5.0, 3.0, 0.0)
        sphere = Sphere(center, 2.0)
        intersection = sphere.intersection(line)
        self.assertEqual(intersection.point.x, 3)
        self.assertEqual(intersection.point.y, 3)
        self.assertEqual(intersection.point.z, 0)

    def test_NoIntersection(self):
        startPoint = Vector(1, 1, 4)
        direction = Vector(2, 3, 1)
        line = Ray(startPoint, direction)
        center = Vector(5.0, 1, 3)
        sphere = Sphere(center, 2)
        intersection = sphere.intersection(line)
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
        c = Camera(Vector(0,0,0), Vector(1,2,3), 30)
        self.assertEqual(0.2679491924311227, c.getAngle())

class ColorTest(unittest.TestCase):

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



if __name__ == '__main__':
    unittest.main()
