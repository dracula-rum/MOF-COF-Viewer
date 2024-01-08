import express from 'express'
import {getByName,getAllNames,getByName_rd,getByName_hun,getHomeData,getHomeDataByName} from './db.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors({  
    origin:['http://121.195.154.160:3001'],
    methods:['GET','POST'],
}));

app.get("/getByName/:name",async ( req, res) => {
    const name = req.params.name
    const mol = await getByName(name)
    res.send(mol)
})
app.get("/getByName_rd/:name",async ( req, res) => {
    const name = req.params.name
    const mol = await getByName_rd(name)
    res.send(mol)
})
app.get("/getByName_hun/:name",async ( req, res) => {
    const name = req.params.name
    const mol = await getByName_hun(name)
    res.send(mol)
})
app.get("/getAllNames",async ( req, res) => {
    const allNames = await getAllNames()
    res.send(allNames)
})
app.get("/getHomeData",async ( req, res) => {
    const homedata = await getHomeData()
    res.send(homedata)
})
app.get("/getHomeDataByName/:name",async ( req, res) => {
    const name = req.params.name
    const homedata = await getHomeDataByName(name)
    res.send(homedata)
})
// app.post("/createMol",async ( req, res) => {
//     const {name, file_conten, file_type} = req.body
//     const mol = await createMol(name, file_conten, file_type)
//     res.status(201).send(mol)
// })

app.use((err, req, res, next) => {
    res.send("no get or post")
})
app.listen(8080,() => {
    console.log('Server is running on port 8080');
});

