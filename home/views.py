import subprocess
import pytz

from datetime import datetime
from django.shortcuts import render
from django.http import HttpResponseBadRequest
from django.core.paginator import Paginator
from oaw.settings import TIME_ZONE, BASE_DIR

YEAR = datetime.now(pytz.timezone(TIME_ZONE)).year
NAME = 'Out at Wrigley'

def index(request):
    if request.method != 'GET':
        return HttpResponseBadRequest()

    dropdown = []
    for i in range(0, 19):
        dropdown.append(2019 - i)

    return render(request, 'home/index.html', {
        'name': NAME,
        'year': YEAR,
        'dropdown': dropdown,
    })

def about(request):
    if request.method != 'GET':
        return HttpResponseBadRequest()

    return render(request, 'home/about.html', {
        'name': NAME,
        'year': YEAR,
    })

def contests(request):
    if request.method != 'GET':
        return HttpResponseBadRequest()

    return render(request, 'home/contests.html', {
        'name': NAME,
        'year': YEAR,
    })

def sponsors(request):
    if request.method != 'GET':
        return HttpResponseBadRequest()

    return render(request, 'home/sponsors.html', {
        'name': NAME,
        'year': YEAR,
    })

def tickets(request):
    if request.method != 'GET':
        return HttpResponseBadRequest()

    return render(request, 'home/tickets.html', {
        'name': NAME,
        'year': YEAR,
    })

def gallery(request):
    if request.method != 'GET':
        return HttpResponseBadRequest()

    year = request.GET.get('year', YEAR)
    page_number = request.GET.get('page', 1)
    per_page = request.GET.get('per_page', 0)

    images = subprocess.run(
        ['ls', '%s/home/static/home/img/%s' % (BASE_DIR, year)],
        stdout=subprocess.PIPE).stdout.decode('utf-8')
    images = images[:-1].split('\n')

    for i in range(0, len(images)):
        images[i] = '/static/home/img/%s/%s' % (year, images[i])

    paginator = Paginator(images, per_page)

    return render(request, 'home/gallery_images.html', {
        'page': paginator.page(page_number),
    })
