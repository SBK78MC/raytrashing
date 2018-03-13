from enum import Enum


class RefractiveMaterial(Enum):
    Air = 1.0
    Water = 1.3
    Glass = 1.5
    Sapphire = 1.7
    Diamond = 2.4
    Silicon = 3.4

    def getRefractiveIndex(self):
        return self.value
