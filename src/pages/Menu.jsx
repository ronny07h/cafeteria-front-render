import React, { useState, useEffect } from "react";
import { productService } from "../services/productService";
import { categoryService } from "../services/categoryService";
import ProductCard from "../components/common/ProductCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [productsData, categoriesData] = await Promise.all([
        productService.getAllProducts(),
        categoryService.getAllCategories(),
      ]);

      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Error al cargar el menú. Por favor, intenta de nuevo.");
      console.error("Error loading menu:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => {
          const categoryId = product.category?.id || product.category;
          return categoryId === parseInt(selectedCategory);
        });

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-vh-100">
      {/* Page Header */}
      <div className="bg-body-tertiary py-5 text-center mb-4">
        <div className="container">
          <h1 className="fw-bold">Nuestro Menú</h1>
          <p className="lead text-muted">
            Descubre nuestros deliciosos sabores
          </p>
        </div>
      </div>

      <div className="container mb-5">
        {/* Category Filters */}
        <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap category-filters">
          <button
            className={`btn ${
              selectedCategory === "all" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => handleCategoryChange("all")}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`btn ${
                selectedCategory === category.id.toString()
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => handleCategoryChange(category.id.toString())}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading && <LoadingSpinner message="Cargando menú..." />}

        {error && <ErrorMessage message={error} onRetry={loadData} />}

        {!loading && !error && (
          <div className="row g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-12 text-center">
                <div className="alert alert-info">
                  <i className="fas fa-info-circle me-2"></i>
                  No hay productos en esta categoría.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
