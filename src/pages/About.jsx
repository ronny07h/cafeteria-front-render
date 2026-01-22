import React from "react";

const About = () => {
  return (
    <div className="min-vh-100">
      <div className="container my-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <h2 className="display-5 fw-bold text-primary mb-3">
              Nuestra Historia
            </h2>
            <p className="lead">Desde 2015, sirviendo pasión en cada taza.</p>
            <p>
              Fundado por Andy, Carlos y Ronny, <strong>Café Aroma</strong> es
              más que una cafetería; es un punto de encuentro para los amantes
              del buen café. Nos dedicamos a ofrecer productos de la más alta
              calidad, seleccionando cuidadosamente cada grano para garantizar
              una experiencia única en cada visita.
            </p>
            <p>
              Nuestro compromiso es brindar no solo excelentes bebidas y
              alimentos, sino también un ambiente acogedor donde nuestros
              clientes puedan relajarse, trabajar o compartir momentos
              especiales con amigos y familia.
            </p>
          </div>
          <div className="col-lg-6">
            <div
              className="bg-secondary p-5 rounded text-center text-white"
              style={{
                height: "400px",
                display: "grid",
                placeItems: "center",
                backgroundColor: "#0d6efd",
              }}
            >
              <i className="fas fa-store fa-5x"></i>
            </div>
          </div>
        </div>

        {/* Mission and Values */}
        <div className="row mt-5 g-4">
          <div className="col-md-4">
            <div className="card h-100 text-center p-4">
              <div className="card-body">
                <i className="fas fa-heart fa-3x text-primary mb-3"></i>
                <h4 className="card-title">Nuestra Misión</h4>
                <p className="card-text">
                  Ofrecer experiencias memorables a través de café de calidad
                  excepcional y un servicio cálido y personalizado.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 text-center p-4">
              <div className="card-body">
                <i className="fas fa-leaf fa-3x text-success mb-3"></i>
                <h4 className="card-title">Sostenibilidad</h4>
                <p className="card-text">
                  Trabajamos con productores locales y utilizamos prácticas
                  sostenibles para cuidar nuestro planeta.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 text-center p-4">
              <div className="card-body">
                <i className="fas fa-users fa-3x text-info mb-3"></i>
                <h4 className="card-title">Comunidad</h4>
                <p className="card-text">
                  Somos parte de la comunidad de Cuenca y nos enorgullece ser un
                  espacio de encuentro para todos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
