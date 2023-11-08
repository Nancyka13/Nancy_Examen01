"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

async function loadPropiedad() {
  try {
    const response = await axios.get('/api/propiedades');
    return response.data;
  } catch (error) {
    console.error('Error loading propiedades:', error);
    return [];
  }
}

function PropiedadList() {
  const [propiedades, setPropiedad] = useState([]);

  useEffect(() => {
    const fetchPropiedad = async () => {
      const propiedadData = await loadPropiedad();
      setPropiedad(propiedadData);
    };
    fetchPropiedad();
  }, []);
  const deletePropiedad = async (propiedadId) => {
    try {
      if (confirm('Are you sure you want to delete this propiedades?')) {
        const res = await axios.delete(`/api/propiedades/${propiedadId}`);
        if (res.status === 204) {
          // Update the products state after successful deletion
          setPropiedad((prevPropiedad) =>
            prevPropiedad.filter((propiedades) => propiedades.id !== propiedadId)
          );
        }
      }
    } catch (error) {
      console.error('Error deleting propiedades:', error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-extrabold dark:text-white m-8">
      Propiedad {' '}
        <a href="/propiedades/new" className="bg-blue-500
         hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 
         rounded mt-5">
          Nuevo
        </a>
      </h2>
      <div className='shadow-md rounded-md px-8 pt-6 pb-8 mb-4'>
        <table className='min-w-full text-left text-sm font-light'>
          <thead>
            <tr className='border-b font-medium bg-gray-300'>
              <th>Options</th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Direccion</th>
              <th>Caracteristicas</th>
              <th>Estado</th>
              <th>Precio alquiler</th>
            </tr>
          </thead>
          <tbody>
          {propiedades.map((propiedades, index) => {
              return (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="whitespace-nowrap px-6 py-4"> <button
                      className="text-white bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
                      onClick={() => deletePropiedad(propiedades.id)}
                    >
                      Delete
                    </button> 
                    </td>

                    
                <td className="whitespace-nowrap px-6 py-4">{propiedades.id}</td>
                <td className="whitespace-nowrap px-6 py-4">{propiedades.nombre}</td>
                <td className="whitespace-nowrap px-6 py-4">{propiedades.direccion}</td>
                <td className="whitespace-nowrap px-6 py-4">{propiedades.caracteristicas}</td>
                <td className="whitespace-nowrap px-6 py-4">{propiedades.estado}</td>
                <td className="whitespace-nowrap px-6 py-4">{propiedades.precioalquiler}</td>
              </tr>
              
              ); 
          })}
          </tbody>
        </table>
        
      </div>
    </>
  )
}

export default PropiedadList


