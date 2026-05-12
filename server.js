const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const mongoURI = "mongodb+srv://Plastic:RfrO2CXVGMb5vu7V@cluster0.rtbobbz.mongodb.net/ExamenesPlastica";
mongoose.connect(mongoURI).then(() => console.log("DB Conectada"));

const Resultado = mongoose.model('Resultado', new mongoose.Schema({
    nombre: String, grupo: String, nota: Number, fecha: { type: Date, default: Date.now }
}));

app.post('/api/finalizar', async (req, res) => {
    try {
        const nuevo = new Resultado(req.body);
        await nuevo.save();
        res.json({ status: "success" });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(3000, () => console.log("Servidor activo en puerto 3000"));