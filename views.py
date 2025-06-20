from django.shortcuts import render
from django.http import JsonResponse
from .models import Booking

def booking_page(request):
    return render(request, 'booking/booking_page.html')

def submit_booking(request):
    if request.method == 'POST':
        movie = request.POST['movie']
        show_timing = request.POST['show_timing']
        theatre = request.POST['theatre']
        date = request.POST['date']
        selected_seats = request.POST.getlist('selected_seats')  # note the correct name
        total_price = request.POST.get('total_price', '0')  # get as string

        try:
            total_price = int(total_price)
        except ValueError:
            total_price = 0  # fallback to 0 if blank or invalid

        booking = Booking(
            movie=movie,
            show_timing=show_timing,
            theatre=theatre,
            date=date,
            selected_seats=', '.join(selected_seats),
            total_price=total_price
        )
        booking.save()

        return JsonResponse({"success": True, "message": "Booking successful!"})

    return JsonResponse({"success": False, "message": "Invalid request."})
