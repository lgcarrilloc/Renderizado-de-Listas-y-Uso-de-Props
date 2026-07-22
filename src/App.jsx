import videojuegos from "./data/videojuegos";
import TablaVideojuegos from "./componentes/TablaVideojuegos";

function App() {
  return (
    <div>
      <h1>Tienda de Videojuegos</h1>

      <TablaVideojuegos videojuegos={videojuegos} />
    </div>
  );
}

export default App;