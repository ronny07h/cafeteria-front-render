import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productService } from "../../services/productService";
import { categoryService } from "../../services/categoryService";
import { reservationService } from "../../services/reservationService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalReservations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [products, categories, reservations] = await Promise.all([
        productService.getAllProducts(),
        categoryService.getAllCategories(),
        reservationService.getAllReservations(),
      ]);

      setStats({
        totalProducts: products.length,
        totalCategories: categories.length,
        totalReservations: reservations.length,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Dashboard</h1>

      <div className="row g-4">
        <div className="col-md-6 col-lg-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-2">Productos</h6>
                  <h2 className="card-title mb-0">
                    {loading ? "..." : stats.totalProducts}
                  </h2>
                </div>
                <i className="fas fa-box fa-3x opacity-50"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-2">Categorías</h6>
                  <h2 className="card-title mb-0">
                    {loading ? "..." : stats.totalCategories}
                  </h2>
                </div>
                <i className="fas fa-tags fa-3x opacity-50"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <Link to="/admin/reservations" className="text-decoration-none">
            <div
              className="card text-white bg-info"
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-subtitle mb-2">Reservas</h6>
                    <h2 className="card-title mb-0">
                      {loading ? "..." : stats.totalReservations}
                    </h2>
                  </div>
                  <i className="fas fa-calendar-check fa-3x opacity-50"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-2">Visitas</h6>
                  <h2 className="card-title mb-0">-</h2>
                </div>
                <i className="fas fa-eye fa-3x opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Accesos Rápidos</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <Link
                    to="/admin/products"
                    className="btn btn-outline-primary w-100"
                  >
                    <i className="fas fa-plus-circle me-2"></i>
                    Agregar Producto
                  </Link>
                </div>
                <div className="col-md-4">
                  <Link
                    to="/admin/categories"
                    className="btn btn-outline-success w-100"
                  >
                    <i className="fas fa-plus-circle me-2"></i>
                    Agregar Categoría
                  </Link>
                </div>
                <div className="col-md-4">
                  <Link
                    to="/admin/config"
                    className="btn btn-outline-info w-100"
                  >
                    <i className="fas fa-cog me-2"></i>
                    Configuración
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
