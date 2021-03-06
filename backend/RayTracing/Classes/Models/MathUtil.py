import math

from RayTracing.Classes.Models.Tuple import Tuple


class MathUtil:
    """This class includes functions that solve basic math equations used in calculating intersections"""

    @classmethod
    def solveQuadraticFormula(self, a, b, c):
        results = Tuple()

        root = math.pow(b, 2) - (4 * a * c)
        if root < 0 or a == 0:
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
