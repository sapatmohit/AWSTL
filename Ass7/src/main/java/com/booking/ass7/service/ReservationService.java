package com.booking.ass7.service;

import com.booking.ass7.model.Reservation;
import com.booking.ass7.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public Reservation createReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

    public Reservation updateReservation(Long id, Reservation updatedReservation) {
        return reservationRepository.findById(id).map(reservation -> {
            reservation.setCustomerName(updatedReservation.getCustomerName());
            reservation.setCheckInDate(updatedReservation.getCheckInDate());
            reservation.setCheckOutDate(updatedReservation.getCheckOutDate());
            reservation.setRoomType(updatedReservation.getRoomType());
            return reservationRepository.save(reservation);
        }).orElseThrow(() -> new RuntimeException("Reservation not found with id " + id));
    }

    public void deleteReservation(Long id) {
        if(reservationRepository.existsById(id)) {
            reservationRepository.deleteById(id);
        } else {
            throw new RuntimeException("Reservation not found with id " + id);
        }
    }
}
