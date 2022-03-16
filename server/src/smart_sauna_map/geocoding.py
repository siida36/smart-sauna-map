# -*- coding: utf-8 -*-

from __future__ import annotations
import os
from os.path import join, dirname
from socket import timeout
import geopy
from dotenv import load_dotenv

load_dotenv(dotenv_path=join(dirname(__file__), ".env"))

GOOGLE_MAP_API_KEY = os.environ.get("GOOGLE_MAP_API_KEY")


def geocode(query: str, timeout: float = 30.0) -> dict[str, float | None]:
    location = geopy.geocoders.GoogleV3(
        api_key=GOOGLE_MAP_API_KEY, domain="maps.google.co.jp", timeout=timeout
    ).geocode(query)
    if location:
        return {"lat": location.latitude, "lng": location.longitude}
    return {"lat": None, "lng": None}


if __name__ == "__main__":
    print(geocode("shinjuku"))
