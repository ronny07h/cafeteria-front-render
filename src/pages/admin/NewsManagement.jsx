import React, { useState, useEffect } from "react";
import { newsService } from "../../services/newsService"; // Correct path
import LoadingSpinner from "../../components/common/LoadingSpinner"; // Correct path
import ErrorMessage from "../../components/common/ErrorMessage"; // Correct path

const NewsManagement = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const data = await newsService.getAllNews();
      setNewsList(data);
    } catch (err) {
      setError("Error al cargar noticias");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingNews) {
        await newsService.updateNews(editingNews.id, formData);
      } else {
        await newsService.createNews(formData);
      }
      setShowModal(false);
      resetForm();
      loadNews();
    } catch (err) {
      alert("Error al guardar la noticia");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta noticia?")) {
      try {
        await newsService.deleteNews(id);
        loadNews();
      } catch (err) {
        alert("Error al eliminar");
      }
    }
  };

  const handleEdit = (news) => {
    setEditingNews(news);
    setFormData({
      title: news.title,
      content: news.content,
      imageUrl: news.imageUrl || "",
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingNews(null);
    setFormData({ title: "", content: "", imageUrl: "" });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Noticias</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <i className="fas fa-plus me-2"></i>Nueva Noticia
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Título</th>
                  <th>Fecha</th>
                  <th>Contenido (Resumen)</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {newsList.map((news) => (
                  <tr key={news.id}>
                    <td className="fw-bold">{news.title}</td>
                    <td>
                      {new Date(news.publicationDate).toLocaleDateString()}
                    </td>
                    <td>{news.content.substring(0, 50)}...</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(news)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(news.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingNews ? "Editar Noticia" : "Nueva Noticia"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contenido</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      required
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">URL de Imagen</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.imageUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, imageUrl: e.target.value })
                      }
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsManagement;
