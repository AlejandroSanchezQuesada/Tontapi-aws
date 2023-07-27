import express from 'express';
import fetch from 'node-fetch';

const app = express();

const generateRandomCoordinates = () => {
  const latitude = Math.random() * (90 - (-90)) + (-90);
  const longitude = Math.random() * (180 - (-180)) + (-180);
  return {
    latitude,
    longitude,
    altitude: Math.random() * (5000 - 0) + 0 // Altitud entre 0 y 5000 metros
  };
};

const generateRandomPhoneNumber = () => {
  const phoneNumber = Math.floor(100000000 + Math.random() * 900000000);
  return phoneNumber;
};

const generateRandomAssociation = () => {
  return {
    name: `Asociacion ${Math.floor(Math.random() * 100)}`,
    address: `Calle del ejemplo ${Math.floor(Math.random() * 1000)}`,
    ...generateRandomCoordinates(),
    postalCode: `${Math.floor(10000 + Math.random() * 90000)}`,
    rating: Math.floor(Math.random() * 5) + 1,
    minimumAge: Math.floor(Math.random() * 10) + 18,
    phoneNumber: generateRandomPhoneNumber(),
    profileImage: null
  };
};

const generateRandomData = () => {
  const cannabisAssociationData = {
    cannabisAssociations: [
      generateRandomAssociation(),
      generateRandomAssociation()
    ],
    message: 'Información extra',
    code: 'codigo bravo delta, esto es una prueba XD'
  };
  return cannabisAssociationData;
};

const postAssociationData = async () => {
  try {
    const data = generateRandomData();
    console.log(data);
    const response = await fetch('http://localhost:8081/api/association', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log('Datos enviados correctamente.', response.text());
    } else {
      console.log('Hubo un error al enviar los datos.',response.text());
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error.message);
  }
};

// al arrancar hacer uno
postAssociationData();

// Enviar los datos cada 3 minutos
const intervalInMilliseconds = 3 * 60 * 1000;
setInterval(postAssociationData, intervalInMilliseconds);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
