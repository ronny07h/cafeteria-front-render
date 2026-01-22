import React, { useState } from "react";
import { reservationService } from "../services/reservationService";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    persons: "2",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      await reservationService.createReservation(formData);
      setMessage({
        type: "success",
        text: "¡Reserva enviada exitosamente! Nos pondremos en contacto contigo pronto.",
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        persons: "2",
      });
    } catch (error) {
      setMessage({
        type: "danger",
        text: "Error al enviar la reserva. Por favor, intenta de nuevo.",
      });
      console.error("Error submitting reservation:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100">
      <div className="container my-5">
        <div className="row g-5">
          {/* Reservation Form */}
          <div className="col-lg-6">
            <h2 className="mb-4">Reserva tu Mesa</h2>

            {message.text && (
              <div
                className={`alert alert-${message.type} alert-dismissible fade show`}
                role="alert"
              >
                {message.text}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMessage({ type: "", text: "" })}
                  aria-label="Close"
                ></button>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="p-4 border rounded shadow-sm bg-body"
            >
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nombre <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Teléfono <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  placeholder="+593 98 330 4543"
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="date" className="form-label">
                    Fecha <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    aria-required="true"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="time" className="form-label">
                    Hora <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="persons" className="form-label">
                  Número de Personas <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="persons"
                  name="persons"
                  value={formData.persons}
                  onChange={handleChange}
                  required
                  aria-required="true"
                >
                  <option value="1">1 Persona</option>
                  <option value="2">2 Personas</option>
                  <option value="3">3 Personas</option>
                  <option value="4">4 Personas</option>
                  <option value="5+">5+ Personas</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Enviando...
                  </>
                ) : (
                  "Enviar Reserva"
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="col-lg-6">
            <h2 className="mb-4">Información de Contacto</h2>

            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="fas fa-map-marker-alt text-primary me-2"></i>
                  Dirección
                </h5>
                <p className="card-text">Vargas Machuca, Cuenca, Ecuador</p>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="fas fa-phone text-primary me-2"></i>
                  Teléfono
                </h5>
                <p className="card-text">
                  <a href="tel:+593983304543" className="text-decoration-none">
                    +593 98 330 4543
                  </a>
                </p>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="fas fa-envelope text-primary me-2"></i>
                  Email
                </h5>
                <p className="card-text">
                  <a
                    href="mailto:info@cafearoma.com"
                    className="text-decoration-none"
                  >
                    info@cafearoma.com
                  </a>
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="fas fa-clock text-primary me-2"></i>
                  Horario de Atención
                </h5>
                <p className="card-text mb-1">
                  Lunes - Viernes: 7:00 AM - 8:00 PM
                </p>
                <p className="card-text mb-1">Sábado: 8:00 AM - 9:00 PM</p>
                <p className="card-text mb-0">Domingo: 8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
