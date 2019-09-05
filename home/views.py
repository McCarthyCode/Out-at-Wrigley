import pytz
from datetime import datetime

from django.shortcuts import render
from oaw.settings import TIME_ZONE

tz = pytz.timezone(TIME_ZONE)

def index(request):
    dropdown = []
    for i in range(0, 19):
        dropdown.append(2019 - i)

    return render(request, 'home/index.html', {
        'name': 'Out at Wrigley',
        'year': datetime.now(tz).year,
        'dropdown': dropdown,
    })

def about(request):
    return render(request, 'home/about.html', {
        'name': 'Out at Wrigley',
        'year': datetime.now(tz).year,
    })

def contests(request):
    return render(request, 'home/contests.html', {
        'name': 'Out at Wrigley',
        'year': datetime.now(tz).year,
    })

def sponsors(request):
    return render(request, 'home/sponsors.html', {
        'name': 'Out at Wrigley',
        'year': datetime.now(tz).year,
    })

def tickets(request):
    return render(request, 'home/tickets.html', {
        'name': 'Out at Wrigley',
        'year': datetime.now(tz).year,
    })
