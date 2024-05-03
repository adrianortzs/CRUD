const express = require("express")
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get("/usuarios", (req,res) => {
    res.json(usuarios)
})

app.get("/usuarios/:nombre", (req,res) => {
    const coincidencia = usuarios.find(usuario => usuario.nombre.toLowerCase() === req.params.nombre)
    if (coincidencia) {
        res.json(coincidencia)
    }
    else {
        res.status(404).send("No ha habido coincidencias")
    }
})

app.post("/usuarios", (req,res) => {
    const usuarioNuevo = req.body
    usuarios.push(usuarioNuevo)
    res.status(201).json(usuarioNuevo)
})

app.put("/usuarios/:nombre", (req,res) => {
    //findIndex devuelve -1 si no hay coincidencia
    const indice = usuarios.findIndex(usuario => usuario.nombre.toLowerCase() === req.params.nombre)
    if (indice !== -1) {
        usuarios[indice] = {...usuarios[indice],...req.body}
        res.json(usuarios[indice])
    }
    else {
        res.status(404).send("No ha habido coincidencias")
    }
})

app.delete("/usuarios/:nombre", (req,res) => {
    const tamañoArray = usuarios.length
    usuarios = usuarios.filter(usuario => usuario.nombre.toLowerCase() !== req.params.nombre)
    if (tamañoArray > usuarios.length) {
        res.send("Usuario eliminado")
    }
    else {
        res.status(404).send("No ha habido coincidencias")
    }
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

