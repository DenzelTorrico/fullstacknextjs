import axios from 'axios';
import formidable from 'formidable';

// Desactiva el bodyParser de Next.js solo para esta API
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {

  if (req.method === 'POST') {
    const form = formidable({ multiples: false });
    //Generar token
    const token = "1234567890";
    const userAgent = req.headers['user-agent']; // Capturamos el User-Agent original del navegador

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error al procesar el formulario', err);
        return res.status(500).json({ error: 'Error al procesar el formulario' });
      }
      //llamando al otro endpoint
      const url = `${process.env.NEXT_PUBLIC_API_URL}/inventory`;
      const data = {
        nombre: fields.nombre,
        cantidad: fields.cantidad,
        categoria: fields.categoria,
        descripcion: fields.descripcion,
        //archivo: files.archivo,
      };
      axios.post(url, data,{ // Envía el User-Agent real
        headers: {
          'Content-Type': 'multipart/formdata',
          'Authorization': `Bearer ${token}`, // Envía el token de autorización
          'User-Agent': userAgent // reenviamos el User-Agent del navegador
        }})
        .then((response) => {
          console.log('Respuesta del servidor:', response.data);
          res.status(200).json(response.data);
        })
        .catch((error) => {
          console.error('Error en la solicitud:', error);
          res.status(500).json({ error: 'Error en la solicitud',error });
        });
      
    });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
