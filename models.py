from django.db import models

class Booking(models.Model):
    movie = models.CharField(max_length=100)
    show_timing = models.CharField(max_length=100)
    theatre = models.CharField(max_length=100)
    date = models.DateField()
    selected_seats = models.TextField()  
    total_price = models.IntegerField()

    def __str__(self):
        return f"{self.movie} - {self.theatre} - {self.date}"
