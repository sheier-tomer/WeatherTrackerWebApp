from django.urls import path
from .views import get_weather, get_air_quality, get_location_suggestions
from . import views



urlpatterns = [
    path('', views.home, name='home'),
    path('api/weather/', get_weather, name='get_weather'),
    path('api/air_quality/', get_air_quality, name='get_air_quality'),
    path('api/location_suggestions/', get_location_suggestions, name='get_location_suggestions'),
]



