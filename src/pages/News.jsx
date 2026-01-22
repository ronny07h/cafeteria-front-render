import React, { useState, useEffect } from "react";
import { newsService } from "../services/newsService";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const data = await newsService.getAllNews();
      setNewsList(data);
    } catch (err) {
      setError("No se pudieron cargar las noticias.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Cargando noticias..." />;
  if (error) return <ErrorMessage message={error} onRetry={loadNews} />;

  return (
    <div className="container my-5 fade-in">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Noticias y Eventos</h1>
        <p className="lead text-muted">
          Mantente al día con nuestras novedades
        </p>
      </div>

      <div className="row g-4">
        {newsList.length > 0 ? (
          newsList.map((news) => (
            <div key={news.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0 hover-lift">
                {news.imageUrl ? (
                  <img
                    src={news.imageUrl}
                    className="card-img-top"
                    alt={news.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="card-img-top d-flex align-items-center justify-content-center text-white"
                    style={{
                      height: "200px",
                      backgroundColor: "var(--primary-color)",
                    }}
                  >
                    <i className="fas fa-newspaper fa-3x"></i>
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title fw-bold">{news.title}</h5>
                  <p className="card-text text-muted">
                    {news.content.length > 150
                      ? news.content.substring(0, 150) + "..."
                      : news.content}
                  </p>
                </div>
                <div className="card-footer bg-white border-0">
                  <small className="text-muted">
                    Publicado el{" "}
                    {new Date(news.publicationDate).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <i className="fas fa-info-circle fa-3x text-muted mb-3"></i>
            <p className="lead text-muted">
              No hay noticias publicadas todavía.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
