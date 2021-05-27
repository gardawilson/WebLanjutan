const express = require('express')
const app = express()
const sqlite = require('sqlite3').verbose()
let db = new sqlite.Database('todo_database.db')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', function(req, res) {
    res.send('<html> <body> <label>TODO LIST</label> <form action="/todo" method="post"> <input name="deskripsi"></input> <button>Add</button> </form> </body> </html>'
    )
})

app.post('/todo', (req, res)=>{
    db.run(`INSERT INTO todolist VALUES ("${req.body.deskripsi}")`)
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

app.listen(3000, function() {console.log('server sudah jalan')})