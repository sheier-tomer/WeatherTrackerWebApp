from django.db import models

# Create your models here.

class Weather(models.Model):
    location = models.CharField(max_length=150)
    temperature = models.FloatField()
    description = models.CharField(max_length=255)


    def __str__(self):
        return f"{self.location} - {self.temperature}°F - {self.description}"
    
class AirQuality(models.Model):
    location = models.CharField(max_length=150)
    aqi = models.IntegerField()
    co = models.FloatField()
    no = models.FloatField()
    no2 = models.FloatField()
    o3 = models.FloatField()
    so2 = models.FloatField()
    pm2_5 = models.FloatField()
    pm10 = models.FloatField()
    nh3 = models.FloatField()

    def __str__(self):
        return f"{self.location} - AQI: {self.aqi}"