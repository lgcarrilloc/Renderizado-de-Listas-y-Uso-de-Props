import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

function FormularioVideojuego({
  agregarJuego,
  editarJuego,
}) {
  const location = useLocation();

  const navigate = useNavigate();

  const juegoEditar =
    location.state || null;

  const [formulario, setFormulario] =
    useState(
      juegoEditar || {
        titulo: "",
        genero: "Aventura",
        plataforma: "PC",
        lanzamiento: 2025,
        precio: 0,
        disponible: false,
        progreso: 0,
      }
    );

  const handleChange = (e) => {
    const {
      name,
      value,
      checked,
      type,
    } = e.target;

    setFormulario({
      ...formulario,
      [name]: type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (juegoEditar) {
      editarJuego(formulario);
    } else {
      agregarJuego(formulario);
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {juegoEditar
          ? "Editar Juego"
          : "Registrar Juego"}
      </h2>

      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={formulario.titulo}
        onChange={handleChange}
        required
      />

      <br /><br />

      <select
        name="genero"
        value={formulario.genero}
        onChange={handleChange}
      >
        <option>Aventura</option>
        <option>Acción</option>
        <option>Deportes</option>
        <option>RPG</option>
      </select>

      <br /><br />

      <select
        name="plataforma"
        value={formulario.plataforma}
        onChange={handleChange}
      >
        <option>PC</option>
        <option>PS5</option>
        <option>Xbox</option>
        <option>Nintendo Switch</option>
      </select>

      <br /><br />

      <input
        type="number"
        name="precio"
        value={formulario.precio}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="number"
        step="0.01"
        min="0"
        max="1"
        name="progreso"
        value={formulario.progreso}
        onChange={handleChange}
      />

      <br /><br />

      <label>
        Disponible
        <input
          type="checkbox"
          name="disponible"
          checked={
            formulario.disponible
          }
          onChange={handleChange}
        />
      </label>

      <br /><br />

      <button type="submit">
        Guardar
      </button>
    </form>
  );
}

export default FormularioVideojuego;