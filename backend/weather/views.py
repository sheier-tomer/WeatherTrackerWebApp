from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
from .models import Weather, AirQuality
from django.conf import settings

from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the home page!")

@api_view(['GET', 'POST'])
def get_weather(request):
    if request.method == 'POST':
        location = request.data['location']
        api_key = settings.WEATHER_API_KEY
        url = f'http://api.openweathermap.org/data/2.5/weather?q={location}&appid={api_key}&units=imperial'
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            weather_data = {
                'location': data['name'],
                'temperature': data['main']['temp'],
                'description': data['weather'][0]['description']
            }
            weather = Weather.objects.create(
                location=location,
                temperature=weather_data['temperature'],
                description=weather_data['description']
            )
            weather.save()
            return Response(weather_data)
        else:
            return Response({'error': 'Could not retrieve weather data'}, status=response.status_code)

    # If GET request, return all weather data
    elif request.method == 'GET':
        weather_data = Weather.objects.all().values()
        return Response(weather_data)

@api_view(['POST'])
def get_air_quality(request):
    location = request.data.get('location')
    if not location:
        return Response({'error': 'Location is required'}, status=400)

    api_key = settings.WEATHER_API_KEY

    # Get latitude and longitude from location name
    geocode_url = f'http://api.openweathermap.org/geo/1.0/direct?q={location}&appid={api_key}'
    geocode_response = requests.get(geocode_url)

    if geocode_response.status_code != 200 or not geocode_response.json():
        return Response({'error': 'Could not retrieve location data'}, status=geocode_response.status_code)

    geocode_data = geocode_response.json()[0]
    lat = geocode_data['lat']
    lon = geocode_data['lon']

    # Get air quality data
    air_quality_url = f'http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={api_key}'
    air_quality_response = requests.get(air_quality_url)

    if air_quality_response.status_code == 200:
        data = air_quality_response.json()
        air_quality_data = {
            'location': location,
            'aqi': data['list'][0]['main']['aqi'],
            'components': data['list'][0]['components']
        }
        air_quality = AirQuality.objects.create(
            location=location,
            aqi=air_quality_data['aqi'],
            co=air_quality_data['components']['co'],
            no=air_quality_data['components']['no'],
            no2=air_quality_data['components']['no2'],
            o3=air_quality_data['components']['o3'],
            so2=air_quality_data['components']['so2'],
            pm2_5=air_quality_data['components']['pm2_5'],
            pm10=air_quality_data['components']['pm10'],
            nh3=air_quality_data['components']['nh3']
        )
        air_quality.save()
        return Response(air_quality_data)
    else:
        return Response({'error': 'Could not retrieve air quality data'}, status=air_quality_response.status_code)
    

@api_view(['GET'])
def get_location_suggestions(request):
    query = request.GET.get('query')
    if not query:
        return Response({'error': 'Query parameter is required'}, status=400)

    api_key = settings.WEATHER_API_KEY
    url = f'http://api.openweathermap.org/geo/1.0/direct?q={query}&limit=5&appid={api_key}'
    response = requests.get(url)

    if response.status_code == 200:
        suggestions = response.json()
        return Response(suggestions)
    else:
        return Response({'error': 'Could not retrieve location suggestions'}, status=response.status_code)

