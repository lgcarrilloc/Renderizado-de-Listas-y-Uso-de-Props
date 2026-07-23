import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import videojuegosIniciales from "./data/videojuegos";

import Navbar from "./components/Navbar";
import TablaVideojuegos from "./components/TablaVideojuegos";
import FormularioVideojuego from "./components/FormularioVideojuego";
import PaginaNoEncontrada from "./components/PaginaNoEncontrada";

function App() {
  const [videojuegos, setVideojuegos] = useState(
    videojuegosIniciales
  );

  const agregarJuego = (nuevoJuego) => {
    const juego = {
      ...nuevoJuego,
      id: Date.now(),
    };

    setVideojuegos([...videojuegos, juego]);
  };

  const eliminarJuego = (id) => {
    const nuevaLista = videojuegos.filter(
      (juego) => juego.id !== id
    );

    setVideojuegos(nuevaLista);
  };

  const editarJuego = (juegoActualizado) => {
    const nuevaLista = videojuegos.map((juego) =>
      juego.id === juegoActualizado.id
        ? juegoActualizado
        : juego
    );

    setVideojuegos(nuevaLista);
  };

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <TablaVideojuegos
              videojuegos={videojuegos}
              onEliminar={eliminarJuego}
            />
          }
        />

        <Route
          path="/nuevo"
          element={
            <FormularioVideojuego
              agregarJuego={agregarJuego}
              editarJuego={editarJuego}
            />
          }
        />

        <Route
          path="/editar"
          element={
            <FormularioVideojuego
              agregarJuego={agregarJuego}
              editarJuego={editarJuego}
            />
          }
        />

        <Route
          path="*"
          element={<PaginaNoEncontrada />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;