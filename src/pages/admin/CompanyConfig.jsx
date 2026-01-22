import React, { useState, useEffect } from "react";
import { companyService } from "../../services/companyService";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";

const CompanyConfig = () => {
  const [config, setConfig] = useState({ name: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await companyService.getCompanyConfig();
      setConfig(data);
    } catch (err) {
      setError(
        "Error al cargar la configuración. Por favor, intenta de nuevo."
      );
      console.error("Error loading config:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setConfig({ name: e.target.value });
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError(null);
      setSuccessMessage("");

      await companyService.updateCompanyConfig(config);
      setSuccessMessage("Configuración actualizada exitosamente.");
    } catch (err) {
      setError(
        "Error al guardar la configuración. Por favor, intenta de nuevo."
      );
      console.error("Error saving config:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Configuración de la Empresa</h2>

      {loading && <LoadingSpinner message="Cargando configuración..." />}

      {error && <ErrorMessage message={error} onRetry={loadConfig} />}

      {!loading && !error && (
        <div className="row">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Información General</h5>
              </div>
              <div className="card-body">
                {successMessage && (
                  <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                  >
                    <i className="fas fa-check-circle me-2"></i>
                    {successMessage}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSuccessMessage("")}
                      aria-label="Close"
                    ></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="companyName" className="form-label">
                      Nombre de la Empresa{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="companyName"
                      name="name"
                      value={config.name}
                      onChange={handleChange}
                      required
                      aria-required="true"
                    />
                    <div className="form-text">
                      Este nombre se mostrará en toda la página web.
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Guardando...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2"></i>
                          Guardar Cambios
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={loadConfig}
                      disabled={saving}
                    >
                      <i className="fas fa-undo me-2"></i>
                      Restablecer
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="card mt-4">
              <div className="card-header">
                <h5 className="mb-0">Información Adicional</h5>
              </div>
              <div className="card-body">
                <p className="text-muted">
                  Aquí puedes agregar más configuraciones en el futuro, como:
                </p>
                <ul className="text-muted">
                  <li>Descripción de la empresa</li>
                  <li>Dirección y datos de contacto</li>
                  <li>Horarios de atención</li>
                  <li>Redes sociales</li>
                  <li>Logo de la empresa</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Vista Previa</h5>
              </div>
              <div className="card-body">
                <p className="text-muted mb-2">Nombre actual:</p>
                <h4 className="text-primary">
                  <i className="fas fa-coffee me-2"></i>
                  {config.name || "Sin nombre"}
                </h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyConfig;
