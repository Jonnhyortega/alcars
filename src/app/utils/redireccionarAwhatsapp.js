export const enviarWhatsApp = (auto) => {
    const numero = "1150109592"; 
    const mensaje = `Hola! Estoy interesado en el ${auto.marca} ${auto.model} ${auto.año}. 
  Me gustaria recibir la cotizacion`;
  
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };
  