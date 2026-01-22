import React, { useState, useEffect } from "react";
import { categoryService } from "../../services/categoryService";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      setError("Error al cargar las categorías. Por favor, intenta de nuevo.");
      console.error("Error loading categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name });
    } else {
      setEditingCategory(null);
      setFormData({ name: "" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: "" });
  };

  const handleFormChange = (e) => {
    setFormData({ name: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory.id, formData);
      } else {
        await categoryService.createCategory(formData);
      }

      await loadCategories();
      handleCloseModal();
    } catch (err) {
      console.error("Error saving category:", err);
      alert("Error al guardar la categoría. Por favor, intenta de nuevo.");
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")
    ) {
      try {
        await categoryService.deleteCategory(id);
        await loadCategories();
      } catch (err) {
        console.error("Error deleting category:", err);
        alert("Error al eliminar la categoría. Por favor, intenta de nuevo.");
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Categorías</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <i className="fas fa-plus me-2"></i>
          Nueva Categoría
        </button>
      </div>

      {loading && <LoadingSpinner message="Cargando categorías..." />}

      {error && <ErrorMessage message={error} onRetry={loadCategories} />}

      {!loading && !error && (
        <div className="row g-4">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.id} className="col-md-6 col-lg-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="fas fa-tag text-primary me-2"></i>
                      {category.name}
                    </h5>
                    <div className="mt-3 d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary flex-fill"
                        onClick={() => handleOpenModal(category)}
                      >
                        <i className="fas fa-edit"></i> Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger flex-fill"
                        onClick={() => handleDelete(category.id)}
                      >
                        <i className="fas fa-trash"></i> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <div className="alert alert-info">
                <i className="fas fa-info-circle me-2"></i>
                No hay categorías registradas.
              </div>
            </div>
          )}
        </div>
      )}

      {/* Category Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingCategory ? "Editar Categoría" : "Nueva Categoría"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit} id="categoryForm">
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
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  form="categoryForm"
                  className="btn btn-primary"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
