const express = require("express")
const socket = require("socket.io")

const app = express()
const PORT = 5000 || process.env.PORT

app.get("/users", (req, res) => {
    return res.json({ msg: "ok" })
})
const server = app.listen(PORT, ()=> {
    console.log(`Server is now listening to sPORT ${PORT}`)
})
app.use(express.static('public'))
const io = socket(server, {
    cors: {
        origin: "*",
        methods: [ 'GET', 'POSTS']
    }
})
io.on('connection', function(socket){
    console.log("Made a Socket Connection", socket.id)
    socket.on("chat", data => {
        io.sockets.emit('chat', data)
    })

    socket.on("msg", data=> {
        console.log("emitted")
        socket.broadcast.emit("msg", data)
    })

    socket.on('disconnect', () =>{
        console.log(`${socket.id} disconnected`)
    })
})