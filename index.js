const express = require('express')
const app = express()
const sqlite = require('sqlite3').verbose()
let db = new sqlite.Database('todo_database.db')
var cors = require('cors')


app.use(express.urlencoded())
app.use(express.json())
app.use(cors())

const auth = require('./middleware/auth.js')

app.get('/', function(req, res) {
    res.send(' <html> <body <label>TODO LIST</label> <form action="/todo" method="post"> <input name="username"></input> <input name="password"></input> <br/><br/> <input name="deskripsi"></input><br/> <button>Add</button> </form> <h1>Daftar</h1> <label>Registrasi</label> <form action="/users" method="post"> <input name="username"></input> <input name="password"></input> <button>Daftar</button> </form>  </body> </html>'
    )
})

app.post('/todo', auth, (req, res)=>{
    db.run(`INSERT INTO todolist (deskripsi) VALUES("${req.body.deskripsi}")`)
    res.end()

})

app.delete('/todo/:id', (req, res)=>{
    let id = req.params.id
    db.run(`DELETE FROM todolist WHERE id = ${id}`)
    res.end()
})

app.get('/todo', function(req, res){    
    db.serialize(function () {
    db.all('SELECT * FROM todolist', function (err, row) {
    res.send(JSON.stringify(row))
    res.end()
    
        })
        
	})
    
})



app.post('/users', (req, res)=>{
    db.run(`INSERT INTO users (username, password) VALUES("${req.body.username}", "${req.body.password}")`)
    res.end()

})

app.get('/users', function(req, res){
    db.serialize(function () {
    db.all('SELECT * FROM users', function (err, row) {
    res.send(JSON.stringify(row))
    res.end()

        })

	})

})

app.delete('/users/:id', (req, res)=>{
    let id = req.params.id
    db.run(`DELETE FROM usersSSSSS WHERE id = ${id}`)
    res.end()
})


app.listen(3000, function() {console.log('server sudah jalan')})
