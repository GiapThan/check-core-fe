import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function Portal({ children, containerId }) {
  const [wrapper, setWrapper] = useState();

  useEffect(() => {
    let container = document.querySelector(`#${containerId}`);
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      document.body.appendChild(container);
    }
    setWrapper(container);

    return () => {
      document.body.removeChild(container);
      if (!container) {
      }
    };
  }, [containerId]);

  if (!wrapper) return null;

  return ReactDOM.createPortal(children, wrapper);
}

export default Portal;
