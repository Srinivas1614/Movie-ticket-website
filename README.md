Project Overview
The Movie Ticket Booking System is a full-stack web application designed to allow users to select a movie, choose a theatre, pick show timings, select seats, apply promo codes, and book tickets online in a smooth, interactive, and visually appealing interface.
Tech Stack Used
Frontend: HTML5, CSS3, JavaScript (Vanilla JS)
Backend: Python Django Framework
Database: SQLite (default Django DB)
Development Tools: Visual Studio Code, Django Dev Server, Git
✨ Key Features
User Interface
Intuitive layout for selecting movie, date, time, theatre, and seats.
Responsive design with hover effects, seat selection animation, and legends.

Real-time price updates based on number of selected seats.

✅ Seat Selection
Visual seat layout with selected, occupied, and available seat states.

Supports multiple rows with dynamic interaction and seat count tracking.

✅ Dynamic Price Calculation
Automatically updates total price as user selects or deselects seats.

Price depends on movie selected (each has a ticket price value).

✅ Form Submission with Validation
Form includes movie, date, time, theatre, seat selection, promo code, and payment method.

Validations for:

At least one seat selected.

Terms and conditions checkbox.

Required fields not left empty.

✅ Data Handling with Django
Submits booking details to Django backend using fetch() POST method.

Backend stores:

Movie name

Show timing

Theatre

Selected date

Selected seats

Total price

Payment method

Promo code (optional)

✅ Persistent Booking
Stored in Django's database (SQLite).

Future enhancement: Display bookings to user or admin panel.
Project folder structure:
moviebooking/
├── booking/
│   ├── static/booking/
│   │   ├── style.css
│   │   └── script.js
│   ├── templates/booking/
│   │   └── booking_page.html
│   ├── models.py
│   ├── views.py
│   └── urls.py
├── db.sqlite3
├── settings.py
└── urls.py

