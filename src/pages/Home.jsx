import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productService } from "../services/productService";
import { companyService } from "../services/companyService";
import ProductCard from "../components/common/ProductCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [companyName, setCompanyName] = useState("Café Aroma");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Cargar configuración de la empresa
      const config = await companyService.getCompanyConfig();
      if (config && config.name) {
        setCompanyName(config.name);
      }

      // Cargar productos destacados (primeros 6)
      const allProducts = await productService.getAllProducts();
      setProducts(allProducts.slice(0, 6));
    } catch (err) {
      setError("Error al cargar los datos. Por favor, intenta de nuevo.");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Hero Carousel */}
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div
              className="hero-section"
              style={{
                backgroundColor: "#0d6efd",
              }}
            >
              <div className="hero-overlay"></div>
              <div className="hero-content container">
                <h1 className="display-3 fw-bold">
                  Bienvenido a {companyName}
                </h1>
                <p className="lead">El mejor café artesanal de Azuay</p>
                <Link to="/menu" className="btn btn-primary btn-lg mt-3">
                  Ver Menú
                </Link>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div
              className="hero-section"
              style={{
                backgroundColor: "#0d6efd",
              }}
            >
              <div className="hero-overlay"></div>
              <div className="hero-content container">
                <h1 className="display-3 fw-bold">Café Premium</h1>
                <p className="lead">Granos seleccionados de la mejor calidad</p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div
              className="hero-section"
              style={{
                backgroundColor: "#0d6efd",
              }}
            >
              <div className="hero-overlay"></div>
              <div className="hero-content container">
                <h1 className="display-3 fw-bold">Ambiente Acogedor</h1>
                <p className="lead">Disfruta tu momento perfecto</p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* Featured Products */}
      <section className="container my-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-primary">
            Productos Destacados
          </h2>
          <p className="text-muted">Los favoritos de nuestros clientes</p>
        </div>

        {loading && <LoadingSpinner message="Cargando productos..." />}

        {error && <ErrorMessage message={error} onRetry={loadData} />}

        {!loading && !error && (
          <div className="row g-4">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-12 text-center">
                <p className="text-muted">
                  No hay productos disponibles en este momento.
                </p>
              </div>
            )}
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="text-center mt-5">
            <Link to="/menu" className="btn btn-primary btn-lg">
              Ver Todo el Menú
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
