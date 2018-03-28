class AmbientLight:
    """ General Class for the Light
        By itself it can provide a global light to the Scene
        that illuminates everything no matter the positioning
    """


    def __init__(self, brightness=0.1):
        self.brightness = brightness

    def getLightRay(self,point):
        pass

    def getBrightness(self):
        return self.brightness

    def setBrightness(self,brightness):
        self.brightness = brightness


