import math

from RayTracing.Classes.Models.Tuple import Tuple


class MathUtil:

    @classmethod
    def solveQuadraticFormula(self, a, b, c):
        results = Tuple()

        root = math.pow(b, 2) - (4 * a * c)
        if root < 0:
            return None

        results.setx1(self.solveAdd(a, b, root))
        results.setx2(self.solveSub(a, b, root))

        return results

    @classmethod
    def solveAdd(self, a, b, root):

        result = (-b + math.sqrt(root)) / (2 * a)
        return result

    @classmethod
    def solveSub(self, a, b, root):

        result = (-b - math.sqrt(root)) / (2 * a)
        return result
