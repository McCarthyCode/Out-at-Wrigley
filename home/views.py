import subprocess
import pytz

from datetime import datetime
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest
from django.core.paginator import Paginator, EmptyPage
from oaw.settings import TIME_ZONE, BASE_DIR

YEAR = datetime.now(pytz.timezone(TIME_ZONE)).year
NAME = 'Out at Wrigley'

def index(request):
    if request.method != 'GET':
        return HttpResponseBadRequest()

    dropdown = [
        2019,
        2018,
        2017,
        2016,
        2015,
        2013,
        2012,
        2011,
        2010,
    ]

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

def image_slider(request):
    if request.method != 'GET':
        return HttpResponseBadRequest()

    year = request.GET.get('year', YEAR)
    page_number = request.GET.get('page', 1)
    per_page = request.GET.get('per_page', 0)

    images = subprocess.run(
        ['ls', '%s/home/static/home/img/%s' % (BASE_DIR, year)],
        stdout=subprocess.PIPE).stdout.decode('utf-8')
    images = images[:-1].split('\n')

    pairs = []
    for i in range(len(images)):
        pairs.append((
            '/static/home/img/%s/%s' % (year, images[i]),
            '/static/home/img/thumbnails_%s/%s' % (year, images[i]),
        ))

    paginator = Paginator(pairs, per_page)

    try:
        page = paginator.page(page_number)
    except EmptyPage:
        return HttpResponse(status=204)

    return render(request, 'home/image_slider_images.html', {
        'page': page,
    })
