from django.urls import path
from . import views

urlpatterns = [
    path('', views.booking_page, name='booking_page'),  # Remove 'booking/' here!
    path('submit_booking/', views.submit_booking, name='submit_booking'),
]
