const express = require("express");
const app = express();
const puerto = process.env.PORT || 3000;
//Midlware
app.use(express.json());

//Arreglo de peliculas
let peliculas = [
    {"id": 1, "Titulo": "El Resplandor", "Director": "Stanley Kubrick", "Año de Lanzamiento": 1980, "Genero": "Terror", "Calificacion": 8.4},
    {"id": 2, "Titulo": "Pulp Fiction", "Director": "Quentin Tarantino", "Año de Lanzamiento": 1994, "Genero": "Crimen", "Calificacion": 8.9},
    {"id": 3, "Titulo": "Forrest Gump", "Director": "Robert Zemeckis", "Año de Lanzamiento": 1994, "Genero": "Drama", "Calificacion": 8.8},
    {"id": 4, "Titulo": "El Padrino", "Director": "Francis Ford Coppola", "Año de Lanzamiento": 1972, "Genero": "Crimen", "Calificacion": 9.2},
    {"id": 5, "Titulo": "Star Wars: Episodio IV - Una Nueva Esperanza", "Director": "George Lucas", "Año de Lanzamiento": 1977, "Genero": "Ciencia Ficción", "Calificacion": 8.6},
    {"id": 6, "Titulo": "Jurassic Park", "Director": "Steven Spielberg", "Año de Lanzamiento": 1993, "Genero": "Aventura", "Calificacion": 8.1},
    {"id": 7, "Titulo": "El Silencio de los Corderos", "Director": "Jonathan Demme", "Año de Lanzamiento": 1991, "Genero": "Thriller", "Calificacion": 8.6},
    {"id": 8, "Titulo": "Avatar", "Director": "James Cameron", "Año de Lanzamiento": 2009, "Genero": "Ciencia Ficción", "Calificacion": 7.8},
    {"id": 9, "Titulo": "Matrix", "Director": "The Wachowskis", "Año de Lanzamiento": 1999, "Genero": "Ciencia Ficción", "Calificacion": 8.7},
    {"id": 10, "Titulo": "Los Vengadores", "Director": "Joss Whedon", "Año de Lanzamiento": 2012, "Genero": "Acción", "Calificacion": 8.0}
]

app.get('/socios/v1/peliculas', (req,res)=>{
    if(peliculas.length > 0)
    {
        res.status(200).json({
            estado:1,
            mensaje:"Existen peliculas",
            peliculas: peliculas
        })
    }
    else
    {
        res.status(404).json({
            estado:0,
            mensaje:"No se encontron peliculas",
            peliculas: peliculas
        })
    }
})

app.get('/socios/v1/peliculas/:id', (req,res)=>{
    const id = req.params.id;
    const pelicula = peliculas.find(pelicula=>pelicula.id==id)
    if(pelicula)
    {
        res.status(200).json({
            estado:1,
            mensaje:"Pelicula encontrada",
            pelicula:pelicula
        })
    }
    else
    {
        res.status(404).json({
            estado:0,
            mensaje:"pelicula no encontrada"
        })
    }
})

app.post('/socios/v1/peliculas', (req,res)=>{
    const {Titulo, Director,Año_de_Lanzamiento,Genero,Calificacion} = req.body
    const maxId = peliculas.reduce((max, pelicula) => (pelicula.id > max ? pelicula.id : max), 0);
    const id = maxId + 1;
    if(Titulo==undefined || Director==undefined || Año_de_Lanzamiento==undefined || Genero==undefined || Calificacion==undefined)
    {
        res.status(400).json({
            estado:0,
            mensaje:"Faltan parametros en la solicitud"
        })
    }
    else
    {
        const pelicula = {id:id,Titulo:Titulo,Director:Director,Año_de_Lanzamiento:Año_de_Lanzamiento,Genero:Genero,Calificacion:Calificacion};
        const logitInicial = peliculas.length;
        peliculas.push(pelicula)
        if(peliculas.length>logitInicial)
        {
            res.status(201).json({
                estado:1,
                mensaje:"Pelicula creada con exito",
                pelicula:pelicula
            })
        }
        else
        {
            res.status(500).json({
                estado:0,
                mensaje:"Ocurrio un error desconocido",
            })
        }
    }
})

app.put('/socios/v1/peliculas/:id', (req,res)=>{
    const {id} = req.params;
    const {Titulo, Director,Año_de_Lanzamiento,Genero,Calificacion} = req.body
    if(!Titulo || !Director || !Año_de_Lanzamiento || !Genero || !Calificacion)
    {
        res.status(400).json({
            estado:0,
            mensaje:"Faltan parametros en la solicitud"
        })
    }
    else
    {
        const posActualizar = peliculas.findIndex(pelicula => pelicula.id==id)
        if(posActualizar!= -1)
        {
            peliculas[posActualizar].Titulo = Titulo;
            peliculas[posActualizar].Director = Director;
            peliculas[posActualizar].Año_de_Lanzamiento = Año_de_Lanzamiento;
            peliculas[posActualizar].Genero = Genero;
            peliculas[posActualizar].Calificacion = Calificacion;
            res.status(200).json({
                estado: 1,
                mensaje: "Informacion de la pelicula actualizada",
                pelicula: peliculas[posActualizar]
            })            
        }
        else
        {
            res.status(404).json({
                estado:0,
                mensaje:"Pelicula no encontrado"
            })
        }
    }
})

app.delete('/socios/v1/peliculas/:id', (req,res)=>{
    const {id} = req.params;
    const indiceEliminar = peliculas.findIndex(pelicula => pelicula.id == id)
    if(indiceEliminar != -1)
    {
        peliculas.splice(indiceEliminar,1);
        res.status(201).json({
            estado:1,
            mensaje:"Informacion de la pelicula eliminada con exito"
        })
    }
    else
    {
        res.status(404).json({
            estado:0,
            mensaje:"Pelicula no encontrado"
        })
    }
})

app.listen(puerto,()=>{
    console.log('Servidor corriendo en el pierto: ', puerto);
})