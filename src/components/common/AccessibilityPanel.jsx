import React, { useState, useEffect } from "react";

const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 100,
    contrast: false,
    highlightLinks: false,
    grayscale: false,
    invertColors: false,
    noAnimations: false,
    removeStyles: false,
    largeCursor: false,
    monochrome: false,
    sepia: false,
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("accessibilitySettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    applySettings();
    localStorage.setItem("accessibilitySettings", JSON.stringify(settings));
  }, [settings]);

  const applySettings = () => {
    const root = document.documentElement;
    root.style.fontSize = `${settings.fontSize}%`;

    const toggleClass = (className, enabled) => {
      const content = document.getElementById("accessible-content");
      if (content) {
        if (enabled) {
          content.classList.add(className);
        } else {
          content.classList.remove(className);
        }
      }
    };

    toggleClass("high-contrast", settings.contrast);
    toggleClass("highlight-links", settings.highlightLinks);
    toggleClass("grayscale", settings.grayscale);
    toggleClass("invert-colors", settings.invertColors);
    toggleClass("no-animations", settings.noAnimations);
    toggleClass("remove-styles", settings.removeStyles);
    toggleClass("large-cursor", settings.largeCursor);
    toggleClass("monochrome", settings.monochrome);
    toggleClass("sepia", settings.sepia);
  };

  const increaseFontSize = () => {
    setSettings((prev) => ({
      ...prev,
      fontSize: Math.min(prev.fontSize + 10, 150),
    }));
  };

  const decreaseFontSize = () => {
    setSettings((prev) => ({
      ...prev,
      fontSize: Math.max(prev.fontSize - 10, 80),
    }));
  };

  const toggleSetting = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const resetSettings = () => {
    setSettings({
      fontSize: 100,
      contrast: false,
      highlightLinks: false,
      grayscale: false,
      invertColors: false,
      noAnimations: false,
      removeStyles: false,
      largeCursor: false,
      monochrome: false,
      sepia: false,
    });
  };

  return (
    <>
      {/* Floating accessibility button */}
      <button
        className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-3 shadow-lg"
        style={{ width: "60px", height: "60px", zIndex: 9998 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir panel de accesibilidad"
        title="Accesibilidad"
      >
        <i className="fas fa-universal-access fs-3"></i>
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div
          className="modal-backdrop show"
          style={{ zIndex: 9998 }}
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Accessibility panel modal */}
      {isOpen && (
        <div
          className="position-fixed top-50 start-50 translate-middle bg-dark text-white rounded shadow-lg"
          style={{
            zIndex: 9999,
            maxWidth: "600px",
            width: "90%",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
            <h5 className="mb-0">
              <i className="fas fa-universal-access me-2"></i>
              Accesibilidad
            </h5>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar panel"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Body */}
          <div className="p-3">
            {/* Font size controls */}
            <div className="row g-2 mb-3">
              <div className="col-6">
                <button
                  className="btn btn-outline-light w-100 d-flex flex-column align-items-center py-3"
                  onClick={decreaseFontSize}
                  disabled={settings.fontSize <= 80}
                >
                  <i className="fas fa-font fs-4 mb-2"></i>
                  <span className="fw-bold">A-</span>
                </button>
              </div>
              <div className="col-6">
                <button
                  className="btn btn-outline-light w-100 d-flex flex-column align-items-center py-3"
                  onClick={increaseFontSize}
                  disabled={settings.fontSize >= 150}
                >
                  <i className="fas fa-font fs-4 mb-2"></i>
                  <span className="fw-bold">A+</span>
                </button>
              </div>
            </div>

            {/* Toggle controls */}
            <div className="row g-2 mb-3">
              <div className="col-6">
                <button
                  className={`btn w-100 d-flex flex-column align-items-center py-3 ${
                    settings.contrast ? "btn-primary" : "btn-outline-light"
                  }`}
                  onClick={() => toggleSetting("contrast")}
                >
                  <i className="fas fa-adjust fs-4 mb-2"></i>
                  <span className="fw-bold small">CONTRASTE</span>
                </button>
              </div>
              <div className="col-6">
                <button
                  className={`btn w-100 d-flex flex-column align-items-center py-3 ${
                    settings.highlightLinks
                      ? "btn-primary"
                      : "btn-outline-light"
                  }`}
                  onClick={() => toggleSetting("highlightLinks")}
                >
                  <i className="fas fa-lightbulb fs-4 mb-2"></i>
                  <span className="fw-bold small">ILUMINAR ENLACES</span>
                </button>
              </div>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-6">
                <button
                  className={`btn w-100 d-flex flex-column align-items-center py-3 ${
                    settings.removeStyles ? "btn-primary" : "btn-outline-light"
                  }`}
                  onClick={() => toggleSetting("removeStyles")}
                >
                  <i className="fas fa-align-justify fs-4 mb-2"></i>
                  <span className="fw-bold small">RESTABLECER</span>
                </button>
              </div>
              <div className="col-6">
                <button
                  className={`btn w-100 d-flex flex-column align-items-center py-3 ${
                    settings.grayscale ? "btn-primary" : "btn-outline-light"
                  }`}
                  onClick={() => toggleSetting("grayscale")}
                >
                  <i className="fas fa-image fs-4 mb-2"></i>
                  <span className="fw-bold small">ESCALA GRISES</span>
                </button>
              </div>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-6">
                <button
                  className={`btn w-100 d-flex flex-column align-items-center py-3 ${
                    settings.invertColors ? "btn-primary" : "btn-outline-light"
                  }`}
                  onClick={() => toggleSetting("invertColors")}
                >
                  <i className="fas fa-tint fs-4 mb-2"></i>
                  <span className="fw-bold small">INVERTIR</span>
                </button>
              </div>
              <div className="col-6">
                <button
                  className={`btn w-100 d-flex flex-column align-items-center py-3 ${
                    settings.noAnimations ? "btn-primary" : "btn-outline-light"
                  }`}
                  onClick={() => toggleSetting("noAnimations")}
                >
                  <i className="fas fa-ban fs-4 mb-2"></i>
                  <span className="fw-bold small">SIN ANIMACIONES</span>
                </button>
              </div>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-6">
                <button
                  className={`btn w-100 d-flex flex-column align-items-center py-3 ${
                    settings.largeCursor ? "btn-primary" : "btn-outline-light"
                  }`}
                  onClick={() => toggleSetting("largeCursor")}
                >
                  <i className="fas fa-arrows-alt fs-4 mb-2"></i>
                  <span className="fw-bold small">CURSOR AMPLIADO</span>
                </button>
              </div>
              <div className="col-6">
                <button
                  className={`btn w-100 d-flex flex-column align-items-center py-3 ${
                    settings.monochrome ? "btn-primary" : "btn-outline-light"
                  }`}
                  onClick={() => toggleSetting("monochrome")}
                >
                  <i className="fas fa-circle fs-4 mb-2"></i>
                  <span className="fw-bold small">MONOCROMÁTICO</span>
                </button>
              </div>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-6">
                <button
                  className={`btn w-100 d-flex flex-column align-items-center py-3 ${
                    settings.sepia ? "btn-primary" : "btn-outline-light"
                  }`}
                  onClick={() => toggleSetting("sepia")}
                >
                  <i className="fas fa-circle fs-4 mb-2"></i>
                  <span className="fw-bold small">SEPIA</span>
                </button>
              </div>
              <div className="col-6">{/* Empty space for symmetry */}</div>
            </div>

            {/* Reset button */}
            <button
              className="btn btn-danger w-100 py-2"
              onClick={resetSettings}
            >
              <i className="fas fa-redo me-2"></i>
              Restablecer Todo
            </button>
          </div>
        </div>
      )}

      {/* CSS for accessibility effects */}
      <style>{`
        #accessible-content.high-contrast { filter: contrast(150%); }
        #accessible-content.highlight-links a { background: yellow !important; color: black !important; padding: 2px 4px; border-radius: 3px; }
        #accessible-content.grayscale { filter: grayscale(100%); }
        #accessible-content.invert-colors { filter: invert(100%); }
        #accessible-content.invert-colors img, #accessible-content.invert-colors video { filter: invert(100%); }
        #accessible-content.no-animations * { animation: none !important; transition: none !important; }
        #accessible-content.remove-styles { background: white !important; color: black !important; }
        #accessible-content.remove-styles * { background: white !important; color: black !important; font-family: Arial, sans-serif !important; }
        #accessible-content.large-cursor, #accessible-content.large-cursor * { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="black" stroke="white" stroke-width="1" d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>') 12 12, auto !important; }
        #accessible-content.monochrome { filter: grayscale(100%) contrast(120%); }
        #accessible-content.sepia { filter: sepia(100%); }
      `}</style>
    </>
  );
};

export default AccessibilityPanel;
