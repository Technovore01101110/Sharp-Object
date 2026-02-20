# URL for flights over Idaho:  
# https://opensky-network.org/api/states/all?lamin=41.988&lomin=-117.243&lamax=49.001&lomax=-111.043

# Guide for processing Airplane JSON data:
# https://openskynetwork.github.io/opensky-api/rest.html#flights-by-aircraft

import requests
response = requests.get("https://opensky-network.org/api/states/all?lamin=41.988&lomin=-117.243&lamax=49.001&lomax=-111.043")
data = response.json()
flights = data["states"]

print("Callsign Origin          Longitude  Latitude   Altitude (ft)   Velocity (mph)")
print("-------- --------------- ---------- ---------- --------------- --------------")
for flight in flights:
    callsign = flight[1]
    origin = flight[2]
    longitude = flight[5]
    latitude = flight[6]
    altitude = 0 if flight[7] is None else float(flight[7]) * 3.28084
    velocity = float(flight[9]) * 2.236936
    print(f"{callsign:<8} {origin:<15} {longitude:<10} {latitude:<10} {altitude:<15.2f} {velocity:<14.2f}")
