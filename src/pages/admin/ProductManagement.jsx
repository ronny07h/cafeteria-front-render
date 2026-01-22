import React, { useState, useEffect } from "react";
import { productService } from "../../services/productService";
import { categoryService } from "../../services/categoryService";
import ProductCard from "../../components/common/ProductCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    imageUrl: "",
  });

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
      setError("Error al cargar los datos. Por favor, intenta de nuevo.");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.category?.id || product.category || "",
        imageUrl: product.imageUrl || "",
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        categoryId: "",
        imageUrl: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      categoryId: "",
      imageUrl: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        ...formData,
        categoryId: parseInt(formData.categoryId),
      };

      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, productData);
      } else {
        await productService.createProduct(productData);
      }

      await loadData();
      handleCloseModal();
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Error al guardar el producto. Por favor, intenta de nuevo.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await productService.deleteProduct(id);
        await loadData();
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Error al eliminar el producto. Por favor, intenta de nuevo.");
      }
    }
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => {
          const categoryId = product.category?.id || product.category;
          return categoryId === parseInt(selectedCategory);
        });

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Productos</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <i className="fas fa-plus me-2"></i>
          Nuevo Producto
        </button>
      </div>

      {/* Category Filters */}
      <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap category-filters">
        <button
          className={`btn ${
            selectedCategory === "all" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setSelectedCategory("all")}
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
            onClick={() => setSelectedCategory(category.id.toString())}
          >
            {category.name}
          </button>
        ))}
      </div>

      {loading && <LoadingSpinner message="Cargando productos..." />}

      {error && <ErrorMessage message={error} onRetry={loadData} />}

      {!loading && !error && (
        <div className="row g-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showActions={true}
                onEdit={handleOpenModal}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="col-12 text-center">
              <div className="alert alert-info">
                <i className="fas fa-info-circle me-2"></i>
                No hay productos registrados.
              </div>
            </div>
          )}
        </div>
      )}

      {/* Product Modal */}
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
                  {editingProduct ? "Editar Producto" : "Nuevo Producto"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit} id="productForm">
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

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Descripción <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleFormChange}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Precio <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="categoryId" className="form-label">
                      Categoría <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      id="categoryId"
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Selecciona una categoría</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">
                      URL de Imagen
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="imageUrl"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleFormChange}
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
                  form="productForm"
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

export default ProductManagement;
