from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('booking/', include('booking.urls')),  # This line includes the URLs from the booking app
]