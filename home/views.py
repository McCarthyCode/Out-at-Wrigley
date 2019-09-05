import pytz
from datetime import datetime

from django.shortcuts import render
from oaw.settings import TIME_ZONE

tz = pytz.timezone(TIME_ZONE)

def index(request):
    dropdown = []
    for i in range(0, 19):
        dropdown.append(2019 - i)
    # for i in range(2018, 2001):
    #     dropdown.append(i)

    return render(request, 'home/index.html', {
        'name': 'Out at Wrigley',
        'year': datetime.now(tz).year,
        'dropdown': dropdown,
    })
