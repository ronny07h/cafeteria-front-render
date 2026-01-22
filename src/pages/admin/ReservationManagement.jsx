import React, { useState, useEffect } from "react";
import { reservationService } from "../../services/reservationService";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";

const ReservationManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await reservationService.getAllReservations();
      setReservations(data);
    } catch (err) {
      setError("Error al cargar las reservas. Por favor, intenta de nuevo.");
      console.error("Error loading reservations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta reserva?")) {
      try {
        await reservationService.deleteReservation(id);
        await loadReservations();
      } catch (err) {
        console.error("Error deleting reservation:", err);
        alert("Error al eliminar la reserva. Por favor, intenta de nuevo.");
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-EC", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return timeString.substring(0, 5); // HH:MM format
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Reservas</h2>
        <div className="badge bg-primary fs-6">
          Total: {reservations.length}
        </div>
      </div>

      {loading && <LoadingSpinner message="Cargando reservas..." />}

      {error && <ErrorMessage message={error} onRetry={loadReservations} />}

      {!loading && !error && (
        <>
          {reservations.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Personas</th>
                    <th>Mensaje</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td>{reservation.id}</td>
                      <td>
                        <strong>{reservation.name}</strong>
                      </td>
                      <td>
                        <a
                          href={`mailto:${reservation.email}`}
                          className="text-decoration-none"
                        >
                          <i className="fas fa-envelope me-1"></i>
                          {reservation.email}
                        </a>
                      </td>
                      <td>
                        <a
                          href={`tel:${reservation.phone}`}
                          className="text-decoration-none"
                        >
                          <i className="fas fa-phone me-1"></i>
                          {reservation.phone}
                        </a>
                      </td>
                      <td>
                        <i className="fas fa-calendar me-1"></i>
                        {formatDate(reservation.date)}
                      </td>
                      <td>
                        <i className="fas fa-clock me-1"></i>
                        {formatTime(reservation.time)}
                      </td>
                      <td>
                        <span className="badge bg-info">
                          <i className="fas fa-users me-1"></i>
                          {reservation.persons}
                        </span>
                      </td>
                      <td>
                        {reservation.message ? (
                          <span
                            className="text-muted"
                            title={reservation.message}
                          >
                            {reservation.message.substring(0, 30)}
                            {reservation.message.length > 30 ? "..." : ""}
                          </span>
                        ) : (
                          <span className="text-muted fst-italic">
                            Sin mensaje
                          </span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(reservation.id)}
                          aria-label={`Eliminar reserva de ${reservation.name}`}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-info text-center">
              <i className="fas fa-info-circle me-2"></i>
              No hay reservas registradas.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReservationManagement;
