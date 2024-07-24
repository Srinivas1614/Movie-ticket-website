const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const showTimingsSelect = document.getElementById('showTimings');
const theatreSelect = document.getElementById('theatreSelect');
const datePicker = document.getElementById('datePicker');
const termsCheckbox = document.getElementById('termsCheckbox');
const promoCode = document.getElementById('promoCode');
const paymentMethodSelect = document.getElementById('paymentMethod');
const bookButton = document.querySelector('.book-button');

populateUI();
let ticketPrice = +movieSelect.value;

// Save selected movie, show timing, theatre, and date to local storage
function setBookingData(movieIndex, showTiming, theatre, date) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedShowTiming', showTiming);
  localStorage.setItem('selectedTheatre', theatre);
  localStorage.setItem('selectedDate', date);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsArray = Array.from(selectedSeats).map(seat => seat.innerText);

  count.innerText = selectedSeatsArray.length;
  total.innerText = selectedSeatsArray.length * ticketPrice;
}

// Get data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  const selectedShowTiming = localStorage.getItem('selectedShowTiming');
  const selectedTheatre = localStorage.getItem('selectedTheatre');
  const selectedDate = localStorage.getItem('selectedDate');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

  if (selectedShowTiming !== null) {
    showTimingsSelect.value = selectedShowTiming;
  }

  if (selectedTheatre !== null) {
    theatreSelect.value = selectedTheatre;
  }

  if (selectedDate !== null) {
    datePicker.value = selectedDate;
  }
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setBookingData(e.target.selectedIndex, showTimingsSelect.value, theatreSelect.value, datePicker.value);
  updateSelectedCount();
});

// Show Timing select event
showTimingsSelect.addEventListener('change', (e) => {
  setBookingData(movieSelect.selectedIndex, e.target.value, theatreSelect.value, datePicker.value);
});

// Theatre select event
theatreSelect.addEventListener('change', (e) => {
  setBookingData(movieSelect.selectedIndex, showTimingsSelect.value, e.target.value, datePicker.value);
});

// Date select event
datePicker.addEventListener('change', (e) => {
  setBookingData(movieSelect.selectedIndex, showTimingsSelect.value, theatreSelect.value, e.target.value);
});

// Seat click event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// Book button click event
bookButton.addEventListener('click', () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsArray = Array.from(selectedSeats).map(seat => seat.innerText);

  if (selectedSeatsArray.length === 0) {
    alert('Please select at least one seat before booking.');
  } else if (!termsCheckbox.checked) {
    alert('Please accept the terms and conditions before booking.');
  } else {
    // Prepare the booking data to send to the server
    const bookingData = {
      movie: movieSelect.value,
      showTiming: showTimingsSelect.value,
      theatre: theatreSelect.value,
      date: datePicker.value,
      selectedSeats: selectedSeatsArray,
      totalPrice: total.innerText,
    };

    // Send the booking data to the server
    fetch('insert_booking.php', {
      method: 'POST',
      body: JSON.stringify(bookingData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.text())
      .then(data => {
        alert(data); // Display the server's response
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
});
