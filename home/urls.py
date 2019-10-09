from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('contests/', views.contests, name='contests'),
    path('sponsors/', views.sponsors, name='sponsors'),
    path('tickets/', views.tickets, name='tickets'),
    path('contact/', views.contact, name='contact'),
    path('image_slider/', views.image_slider, name='image_slider'),
    path('gallery/', views.gallery, name='gallery'),
]
