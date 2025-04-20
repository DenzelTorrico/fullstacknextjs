import { useState } from "react";
import axios from "axios";
export default function Home() {
  const [form, setForm] = useState({
    nombre: "",
    cantidad: "",
    categoria: "",
    descripcion: "",
  });
  const [file, setFile] = useState(null);
  const [respuesta, setRespuesta] = useState(null);
  const [data, setData] = useState([]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  //subidos
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("archivo", file);

    try {
      const res = await axios.post("/api/vercel", form);
      setRespuesta(res.data);
      const parsedData = JSON.parse(res.data.data);
      setData([...data, parsedData]);
    } catch (error) {
      setRespuesta({ error: error.message });
      console.error("Error en la solicitud:", error);
    }
  };
  return (
 
         <div>
   <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto bg-white shadow-md rounded">
  <input name="nombre" onChange={handleChange} placeholder="Nombre"
    className="w-full px-3 py-2 border rounded"  />
  
  <input name="cantidad" type="number" onChange={handleChange} placeholder="Cantidad"
    className="w-full px-3 py-2 border rounded"  />

  <input name="categoria" onChange={handleChange} placeholder="Categoría"
    className="w-full px-3 py-2 border rounded"  />

  <textarea name="descripcion" onChange={handleChange} placeholder="Descripción"
    className="w-full px-3 py-2 border rounded" ></textarea>

  <input type="submit"
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"    value="Enviar" />

</form>


      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        <div>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-200 px-4 py-2">Nombre</th>
                        <th className="border border-gray-200 px-4 py-2">Cantidad</th>
                        <th className="border border-gray-200 px-4 py-2">Categoría</th>
                        <th className="border border-gray-200 px-4 py-2">Descripción</th>
                        <th className="border border-gray-200 px-4 py-2">Eliminar</th>
                        <th className="border border-gray-200 px-4 py-2">Modificar</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => (
                        <tr key={index}>
                            <td className="border border-gray-200 px-4 py-2">{item.nombre}</td>
                            <td className="border border-gray-200 px-4 py-2">{item.cantidad}</td>
                            <td className="border border-gray-200 px-4 py-2">{item.categoria}</td>
                            <td className="border border-gray-200 px-4 py-2">{item.descripcion}</td>
                            <td className="border border-gray-200 px-4 py-2">
                                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                                    Eliminar
                                </button>
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                                <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
                                    Modificar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}
