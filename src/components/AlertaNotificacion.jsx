import { useEffect, useState } from "react";
import "./AlertaNotificacion.css";

function AlertaNotificacion({ mensaje }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(temporizador);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="toast-notificacion">
      ✅ {mensaje}
    </div>
  );
}

export default AlertaNotificacion;
