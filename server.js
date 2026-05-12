const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Configuración de Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Conexión a la Base de Datos usando variable de entorno
// NOTA: Debes configurar "MONGO_URI" en el panel de Render
const mongoURI = process.env.MONGO_URI; 

mongoose.connect(mongoURI)
    .then(() => console.log("DB Conectada con éxito"))
    .catch(err => console.error("Error al conectar DB:", err));

// Definición del Modelo
const Resultado = mongoose.model('Resultado', new mongoose.Schema({
    nombre: String, 
    grupo: String, 
    nota: Number, 
    fecha: { type: Date, default: Date.now }
}));

// Rutas
app.post('/api/finalizar', async (req, res) => {
    try {
        const nuevo = new Resultado(req.body);
        await nuevo.save();
        res.json({ status: "success" });
    } catch (e) { 
        res.status(500).json({ error: e.message }); 
    }
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});
