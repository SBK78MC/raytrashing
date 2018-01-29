import json
import unittest

from RayTracing.Classes.Utils.JSONParser import JSONParser

if __name__ == '__main__':
    unittest.main()


class JSONParserTest(unittest.TestCase):

    def test_deserializeScene(self):
        jsonstring = '{"imageplane":{"width":500, "height":500}, "scene":{"Object3D":[{"Sphere":{"center":{"x":3.0,"y":1.0,"z":2.0},"radius":2.0,"color":{"r":255,"g":0,"b":0},"reflection":1.0}}],"Light":[{"center":{"x":2, "y":1, "z":1}, "brightness":1.0}]}}'
        j = json.loads(jsonstring)

        jsonParser = JSONParser()
        scene = jsonParser.deserializeScene(j)
        print()


    def test_deserializeLight(self):
        lightString = '{"center":{"x":2, "y":1, "z":1}, "brightness":1.0}'
        lightJson = json.loads(lightString)

        jsonParser = JSONParser()
        light = jsonParser.deserializeLight(lightJson)
        self.assertEqual(2, light.position.x)
        self.assertEqual(1, light.position.y)
        self.assertEqual(1, light.position.z)
        self.assertEqual(1.0, light.brightness)

    def test_deserializeSphere(self):
        sphereString = '{"center":{"x":3.0,"y":1.0,"z":2.0},"radius":2.0,"color":{"r":255,"g":0,"b":0},"reflection":1.0}'
        sphereJson = json.loads(sphereString)

        jsonParser = JSONParser()
        sphere = jsonParser.deserializeSphere(sphereJson)
        self.assertEqual(3, sphere.center.x)
        self.assertEqual(1, sphere.center.y)
        self.assertEqual(2, sphere.center.z)
        self.assertEqual(2, sphere.radius)
        self.assertEqual(1.0, sphere.reflection)