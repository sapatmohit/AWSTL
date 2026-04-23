document.addEventListener('DOMContentLoaded', () => {
    const reservationsList = document.getElementById('reservations-list');
    const bookingForm = document.getElementById('booking-form');
    const modal = document.getElementById('booking-modal');
    const modalTitle = document.getElementById('modal-title');
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const totalBookingsCount = document.getElementById('total-bookings-count');
    const refreshTableBtn = document.getElementById('refresh-table');
    const toast = document.getElementById('toast');
    const currentDate = document.getElementById('current-date');

    // Set current date in top bar
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDate.innerText = new Date().toLocaleDateString('en-US', options);

    const API_URL = '/api/reservations';

    const showToast = (message, type = 'success') => {
        toast.innerText = message;
        toast.className = `toast show ${type}`;
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };

    const fetchReservations = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            renderReservations(data);
            totalBookingsCount.innerText = data.length;
        } catch (error) {
            console.error('Error fetching reservations:', error);
            showToast('Failed to load reservations', 'error');
        }
    };

    const renderReservations = (reservations) => {
        if (reservations.length === 0) {
            reservationsList.innerHTML = '<tr><td colspan="5" class="loading-state">No reservations found.</td></tr>';
            return;
        }

        reservationsList.innerHTML = reservations.map(res => `
            <tr>
                <td><strong>${res.customerName}</strong></td>
                <td><span class="badge-room">${res.roomType}</span></td>
                <td>${res.checkInDate}</td>
                <td>${res.checkOutDate}</td>
                <td class="action-btns">
                    <span class="edit-btn" onclick="editReservation(${res.id})">Edit</span>
                    <span class="delete-btn" onclick="deleteReservation(${res.id})">Cancel</span>
                </td>
            </tr>
        `).join('');
    };

    const saveReservation = async (e) => {
        e.preventDefault();
        const id = document.getElementById('edit-id').value;
        const reservation = {
            customerName: document.getElementById('customerName').value,
            checkInDate: document.getElementById('checkInDate').value,
            checkOutDate: document.getElementById('checkOutDate').value,
            roomType: document.getElementById('roomType').value
        };

        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/${id}` : API_URL;

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservation)
            });

            if (response.ok) {
                showToast(id ? 'Reservation updated' : 'Booking confirmed');
                closeModal();
                fetchReservations();
                bookingForm.reset();
            } else {
                throw new Error('Failed to save');
            }
        } catch (error) {
            showToast('Error saving reservation', 'error');
        }
    };

    window.editReservation = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            const res = await response.json();
            
            document.getElementById('edit-id').value = res.id;
            document.getElementById('customerName').value = res.customerName;
            document.getElementById('checkInDate').value = res.checkInDate;
            document.getElementById('checkOutDate').value = res.checkOutDate;
            document.getElementById('roomType').value = res.roomType;
            
            modalTitle.innerText = 'Edit Reservation';
            document.getElementById('save-btn').innerText = 'Update Booking';
            modal.classList.add('show');
        } catch (error) {
            showToast('Error fetching details', 'error');
        }
    };

    window.deleteReservation = async (id) => {
        if (!confirm('Are you sure you want to cancel this reservation?')) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                showToast('Reservation cancelled');
                fetchReservations();
            }
        } catch (error) {
            showToast('Error cancelling reservation', 'error');
        }
    };

    const closeModal = () => {
        modal.classList.remove('show');
        bookingForm.reset();
        document.getElementById('edit-id').value = '';
        modalTitle.innerText = 'New Reservation';
        document.getElementById('save-btn').innerText = 'Confirm Booking';
    };

    openModalBtn.addEventListener('click', () => modal.classList.add('show'));
    closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));
    bookingForm.addEventListener('submit', saveReservation);
    refreshTableBtn.addEventListener('click', fetchReservations);

    // Initial load
    fetchReservations();
});
