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

function setBookingData(movieIndex, showTiming, theatre, date) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedShowTiming', showTiming);
  localStorage.setItem('selectedTheatre', theatre);
  localStorage.setItem('selectedDate', date);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;

  // Update hidden fields
  document.getElementById('selectedSeats').value = Array.from(selectedSeats)
    .map((seat, index) => `Seat${index + 1}`)
    .join(', ');
  document.getElementById('totalPrice').value = total.innerText;
}

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

  if (selectedMovieIndex !== null) movieSelect.selectedIndex = selectedMovieIndex;
  if (selectedShowTiming !== null) showTimingsSelect.value = selectedShowTiming;
  if (selectedTheatre !== null) theatreSelect.value = selectedTheatre;
  if (selectedDate !== null) datePicker.value = selectedDate;

  updateSelectedCount();
}

movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setBookingData(e.target.selectedIndex, showTimingsSelect.value, theatreSelect.value, datePicker.value);
  updateSelectedCount();
});

showTimingsSelect.addEventListener('change', (e) => {
  setBookingData(movieSelect.selectedIndex, e.target.value, theatreSelect.value, datePicker.value);
});

theatreSelect.addEventListener('change', (e) => {
  setBookingData(movieSelect.selectedIndex, showTimingsSelect.value, e.target.value, datePicker.value);
});

datePicker.addEventListener('change', (e) => {
  setBookingData(movieSelect.selectedIndex, showTimingsSelect.value, theatreSelect.value, e.target.value);
});

container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

bookButton.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent form default submission
  updateSelectedCount(); // Ensure total price and seat list are updated

  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsArray = Array.from(selectedSeats).map((seat, index) => `Seat${index + 1}`);

  if (selectedSeatsArray.length === 0) {
    alert('Please select at least one seat before booking.');
  } else if (!termsCheckbox.checked) {
    alert('Please accept the terms and conditions before booking.');
  } else {
    const formData = new FormData();
    formData.append('movie', movieSelect.options[movieSelect.selectedIndex].text);
    formData.append('show_timing', showTimingsSelect.value);
    formData.append('theatre', theatreSelect.value);
    formData.append('date', datePicker.value);
    formData.append('total_price', parseInt(total.innerText)); // ensure it's a number
    formData.append('payment_method', paymentMethodSelect.value);
    formData.append('promo_code', promoCode.value);
    selectedSeatsArray.forEach(seat => formData.append('seats', seat));

    fetch('/booking/submit_booking/', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Your booking successful!');
          localStorage.clear();
          location.reload();
        } else {
          alert('Booking failed: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while booking your tickets. Please try again.');
      });
  }
});
