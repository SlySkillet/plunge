from .keys import PEXELS_API_KEY, OPEN_WEATHER_API_KEY
import requests


def get_location_data(zip_code):
    url = "https://api.openweathermap.org/geo/1.0/zip"
    params = {"zip": {zip_code}, "appid": OPEN_WEATHER_API_KEY}
    response = requests.get(url, params=params)
    content = response.json()
    try:
        return {"latitude": content["lat"], "longitude": content["lon"]}
    except:
        return {"latitude": None, "longitude": None}
