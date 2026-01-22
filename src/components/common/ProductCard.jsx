import React from "react";
import PropTypes from "prop-types";

const ProductCard = ({ product, showActions = false, onEdit, onDelete }) => {
  const { id, name, description, price, imageUrl, category } = product;

  return (
    <div className="col-md-6 col-lg-4 fade-in">
      <div className="card product-card h-100">
        <div className="card-img-top">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <i className="fas fa-coffee"></i>
          )}
        </div>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text text-muted">{description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="h5 mb-0 text-primary">
              ${parseFloat(price).toFixed(2)}
            </span>
            {category && (
              <span className="badge bg-secondary">
                {category.name || category}
              </span>
            )}
          </div>
          {showActions && (
            <div className="mt-3 d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-primary flex-fill"
                onClick={() => onEdit(product)}
                aria-label={`Editar ${name}`}
              >
                <i className="fas fa-edit"></i> Editar
              </button>
              <button
                className="btn btn-sm btn-outline-danger flex-fill"
                onClick={() => onDelete(id)}
                aria-label={`Eliminar ${name}`}
              >
                <i className="fas fa-trash"></i> Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imageUrl: PropTypes.string,
    category: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ]),
  }).isRequired,
  showActions: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ProductCard;
