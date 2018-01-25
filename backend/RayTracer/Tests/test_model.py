import unittest
import math

if __name__ == '__main__':
    unittest.main()


class VectorTest(unittest.TestCase):

    def test_normalize(self):
        v = Vector(3, 2, 0)
        self.assertEqual(v.normalize().length(), 1)

    def test_dotproduct(self):
        v = Vector(2, 2, 2)
        self.assertEqual(v.dotProduct(v), 4)

class SphereTest(unittest.TestCase):

    def test_intersection(self):
        startPoint = Vector(0,0,0)
        direction = Vector(2,2,0)
        line = Line(startPoint, direction)
        center = Vector(5, 3, 0)
        sphere = Sphere(center, 2)
        intersection = sphere.intersection(line)
        self.assertEqual(intersection.point.x, 3)
        self.assertEqual(intersection.point.y, 3)
        self.assertEqual(intersection.point.z, 0)

class MathUtilTest(unittest.TestCase):

    def test_solveQuadraticFormula(self):
        a = 8
        b = -32
        c = 30
        result = MathUtil.solveQuadraticFormula(a,b,c)
        self.assertEqual(result.x1, 1.5)
        self.assertEqual(result.x2, 2.5)


class LightTest(unittest.TestCase):

    def test_getLightRay(self):
        point = Vector(7, 3, 1)
        light = Light(2, 2, 2, 1)
        lightray = light.getLightRay(point)
        self.assertEqual(lightray.x, -5)
        self.assertEqual(lightray.y, -1)
        self.assertEqual(lightray.z, 1)
