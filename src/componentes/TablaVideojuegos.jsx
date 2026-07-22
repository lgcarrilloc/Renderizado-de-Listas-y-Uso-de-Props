import "./TablaVideojuegos.css";

function TablaVideojuegos({ videojuegos }) {
  return (
    <div className="tabla-container">
      <table className="tabla-videojuegos">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Género</th>
            <th>Plataforma</th>
            <th>Año</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Descarga</th>
          </tr>
        </thead>

        <tbody>
          {videojuegos.map((juego) => (
            <tr key={juego.id}>
              <td>{juego.id}</td>
              <td>{juego.titulo}</td>
              <td>{juego.genero}</td>
              <td>{juego.plataforma}</td>
              <td>{juego.lanzamiento}</td>
              <td>${juego.precio}</td>
              <td>{juego.disponible ? "Sí" : "No"}</td>

              <td>
                <progress
                  value={juego.progreso}
                  max="1"
                ></progress>

                {" "}
                {Math.round(juego.progreso * 100)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaVideojuegos;