import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FormularioVideojuego.css";

function FormularioVideojuego({
  agregarJuego,
  editarJuego,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const juegoEditar = location.state || null;

  const [formulario, setFormulario] = useState(
    juegoEditar || {
      titulo: "",
      genero: "Aventura",
      plataforma: "PC",
      lanzamiento: 2025,
      fechaLanzamiento: "",
      descripcion: "",
      calificacion: "",
      precio: 0,
      disponible: false,
      progreso: 0,
    }
  );

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value, checked, type } =
      e.target;

    setFormulario({
      ...formulario,
      [name]: type === "checkbox"
          ? checked
          : value,
    });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formulario.titulo.trim()) {
      nuevosErrores.titulo =
        "El título no puede estar vacío.";
    }

    const nota = Number(
      formulario.calificacion
    );

    if (nota < 1 || nota > 100) {
      nuevosErrores.calificacion =
        "La calificación debe estar entre 1 y 100.";
    }

    if (
      formulario.descripcion
        .trim()
        .length < 10
    ) {
      nuevosErrores.descripcion =
        "La sinopsis debe tener al menos 10 caracteres.";
    }

    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const erroresActivos =
      validarFormulario();

    if (
      Object.keys(erroresActivos)
        .length > 0
    ) {
      setErrores(erroresActivos);
      return;
    }

    setErrores({});

    if (juegoEditar) {
      editarJuego(formulario);
    } else {
      agregarJuego(formulario);
    }

    navigate("/");
  };

  const fechaActual = new Date()
    .toISOString()
    .split("T")[0];

  return (
  <div className="formulario-wrapper">
    <form
      className="formulario-container"
      onSubmit={handleSubmit}
    >
      <h2>
        {juegoEditar
          ? "Editar Juego"
          : "Registrar Juego"}
      </h2>

      <div className="campo">
        <label>Título</label>

        <input
          type="text"
          name="titulo"
          placeholder="Ingrese el título"
          value={formulario.titulo}
          onChange={handleChange}
        />

        {errores.titulo && (
          <span className="error-mensaje">
            {errores.titulo}
          </span>
        )}
      </div>

      <div className="campo">
        <label>Género</label>

        <select
          name="genero"
          value={formulario.genero}
          onChange={handleChange}
        >
          <option value="Aventura">
            Aventura
          </option>
          <option value="Acción">
            Acción
          </option>
          <option value="Deportes">
            Deportes
          </option>
          <option value="RPG">
            RPG
          </option>
        </select>
      </div>

      <div className="campo">
        <label>Plataforma</label>

        <select
          name="plataforma"
          value={formulario.plataforma}
          onChange={handleChange}
        >
          <option value="PC">PC</option>
          <option value="PS5">PS5</option>
          <option value="Xbox">Xbox</option>
          <option value="Nintendo Switch">
            Nintendo Switch
          </option>
        </select>
      </div>

      <div className="campo">
        <label>
          Fecha de Lanzamiento
        </label>

        <input
          type="date"
          name="fechaLanzamiento"
          value={
            formulario.fechaLanzamiento
          }
          onChange={handleChange}
          max={fechaActual}
        />
      </div>

      <div className="campo">
        <label>Sinopsis</label>

        <textarea
          name="descripcion"
          value={formulario.descripcion}
          onChange={handleChange}
          placeholder="Describe el videojuego..."
        />

        {errores.descripcion && (
          <span className="error-mensaje">
            {errores.descripcion}
          </span>
        )}
      </div>

      <div className="campo">
        <label>
          Calificación de la Crítica
        </label>

        <input
          type="number"
          name="calificacion"
          min="1"
          max="100"
          value={
            formulario.calificacion
          }
          onChange={handleChange}
        />

        {errores.calificacion && (
          <span className="error-mensaje">
            {errores.calificacion}
          </span>
        )}
      </div>

      <div className="campo">
        <label>Precio</label>

        <input
          type="number"
          name="precio"
          min="0"
          step="0.01"
          value={formulario.precio}
          onChange={handleChange}
        />
      </div>

      <div className="campo">
        <label>Progreso</label>

        <input
          type="number"
          name="progreso"
          min="0"
          max="1"
          step="0.01"
          value={formulario.progreso}
          onChange={handleChange}
        />
      </div>

      <div className="checkbox-container">
        <input
          type="checkbox"
          name="disponible"
          checked={formulario.disponible}
          onChange={handleChange}
        />

        <label>Disponible</label>
      </div>

      <button type="submit">
        Guardar Juego
      </button>
    </form>
  </div>
);
}

export default FormularioVideojuego;