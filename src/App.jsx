import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import videojuegosIniciales from "./data/videojuegos";

import Navbar from "./components/Navbar";
import TablaVideojuegos from "./components/TablaVideojuegos";
import FormularioVideojuego from "./components/FormularioVideojuego";
import PaginaNoEncontrada from "./components/PaginaNoEncontrada";
import AlertaNotificacion from "./components/AlertaNotificacion";

function App() {
  const [videojuegos, setVideojuegos] = useState(() => {
    const datosGuardados =
      localStorage.getItem(
        "lista_videojuegos"
      );

    return datosGuardados
      ? JSON.parse(datosGuardados)
      : videojuegosIniciales;
  });

  const [mensaje, setMensaje] =
    useState("");

  const [mostrarAlerta, setMostrarAlerta] =
    useState(false);

  useEffect(() => {
    localStorage.setItem(
      "lista_videojuegos",
      JSON.stringify(videojuegos)
    );
  }, [videojuegos]);

  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
    }, 3000);
  };

  const agregarJuego = (nuevoJuego) => {
    const juego = {
      ...nuevoJuego,
      id: Date.now(),
    };

    setVideojuegos([
      ...videojuegos,
      juego,
    ]);

    mostrarMensaje(
      "Videojuego agregado correctamente"
    );
  };

  const eliminarJuego = (id) => {
    setVideojuegos(
      videojuegos.filter(
        (juego) => juego.id !== id
      )
    );

    mostrarMensaje(
      "Videojuego eliminado correctamente"
    );
  };

  const editarJuego = (
    juegoActualizado
  ) => {
    setVideojuegos(
      videojuegos.map((juego) =>
        juego.id === juegoActualizado.id
          ? juegoActualizado
          : juego
      )
    );

    mostrarMensaje(
      "Videojuego actualizado correctamente"
    );
  };

  return (
    <BrowserRouter>
      <Navbar />

      {mostrarAlerta && (
        <AlertaNotificacion
          mensaje={mensaje}
        />
      )}

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
          element={
            <PaginaNoEncontrada />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;