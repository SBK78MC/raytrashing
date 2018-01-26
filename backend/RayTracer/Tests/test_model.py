import unittest
import math

if __name__ == '__main__':
    unittest.main()


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
        self.assertEqual(v.normalize().length(), 1)

    def test_dotproduct(self):
        v = Vector(2, 2, 2)
        self.assertEqual(v.dotProduct(v), 4)

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

    def test_multiply(self):
        v = Vector(3, 2, 5)
        b = Vector(4, 1, 2)
        r = v.multiply(b)
        self.assertEqual(r.x, 12)
        self.assertEqual(r.y, 2)
        self.assertEqual(r.z, 10)

    def test_crossProduct(self):
        v = Vector(3, 2, 5)
        b = Vector(4, 1, 2)
        r = v.crossProduct(b)
        self.assertEqual(r.x, -1)
        self.assertEqual(r.y, 14)
        self.assertEqual(r.z, -5)


class SphereTest(unittest.TestCase):

    def test_intersection(self):
        startPoint = Vector(0, 0, 0)
        direction = Vector(2, 2, 0)
        line = Line(startPoint, direction)
        center = Vector(5, 3, 0)
        sphere = Sphere(center, 2)
        intersection = sphere.intersection(line)
        self.assertEqual(intersection.point.x, 3)
        self.assertEqual(intersection.point.y, 3)
        self.assertEqual(intersection.point.z, 0)

    def test_NoIntersection(self):
        startPoint = Vector(1, 1, 4)
        direction = Vector(2, 3, 1)
        line = Line(startPoint, direction)
        center = Vector(5, 1, 3)
        sphere = Sphere(center, 2)
        intersection = sphere.intersection(line)
        self.assertIsNone(intersection)


class MathUtilTest(unittest.TestCase):

    def test_solveQuadraticFormula(self):
        a = 8
        b = -32
        c = 30
        result = MathUtil.solveQuadraticFormula(a, b, c)
        self.assertEqual(result.x1, 1.5)
        self.assertEqual(result.x2, 2.5)

    def test_solveQuadraticFormulaFail(self):
        a = 3
        b = 1
        c = 13
        self.assertRaises(Exception, MathUtil.solveQuadraticFormula(a, b, c))


class TupleTest(unittest.TestCase):

    def test_getSmallestPositiv(self):
        t = Tuple(-1, 4)
        self.assertEqual(t.x1, 4)


class LightTest(unittest.TestCase):

    def test_getLightRay(self):
        point = Vector(7, 3, 1)
        light = Light(2, 2, 2, 1)
        lightray = light.getLightRay(point)
        self.assertEqual(lightray.x, -5)
        self.assertEqual(lightray.y, -1)
        self.assertEqual(lightray.z, 1)
