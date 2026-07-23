import { Link } from "react-router-dom";
import "./TablaVideojuegos.css";

function TablaVideojuegos({
  videojuegos,
  onEliminar,
}) {
  return (
    <div className="tabla-container">
      <table className="tabla-videojuegos">
        <thead>
          <tr>
            <th>Título</th>
            <th>Género</th>
            <th>Plataforma</th>
            <th>Precio</th>
            <th>Progreso</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {videojuegos.map((juego) => (
            <tr key={juego.id}>
              <td>{juego.titulo}</td>

              <td>{juego.genero}</td>

              <td>{juego.plataforma}</td>

              <td>${juego.precio}</td>

              <td>
                <progress
                  value={juego.progreso}
                  max="1"
                />

                {" "}
                {Math.round(
                  juego.progreso * 100
                )}
                %
              </td>

              <td>
                <Link
                  to="/editar"
                  state={juego}
                >
                  <button>
                    Editar
                  </button>
                </Link>

                <button
                  onClick={() =>
                    onEliminar(juego.id)
                  }
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaVideojuegos;