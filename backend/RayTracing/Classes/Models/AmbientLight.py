class AmbientLight:

    def __init__(self, brightness=0.1):
        self.brightness = brightness

    def getLightRay(self,point):
        pass

    def getBrightness(self):
        return self.brightness

    def setBrightness(self,brightness):
        self.brightness = brightness


