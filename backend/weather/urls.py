
from django.urls import path
from .views import get_weather, get_air_quality

urlpatterns = [
    path('api/weather/', get_weather, name='get_weather'),
    path('api/air_quality/', get_air_quality, name='get_air_quality'),
]


