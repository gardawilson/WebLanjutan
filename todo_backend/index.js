const express = require('express')
const app = express()
const sqlite = require('sqlite3').verbose()
let db = new sqlite.Database('todo_database')


app.get('/', function(req, res) {
    res.send('<html> <body> <label>TODO LIST</label> <form action="/todo" method="post"> <input name="deskripsi"></input> <button>Add</button> </form> </body> </html>'
    )
})

app.post('/todo', (req, res)=>{

    db.run('INSERT INTO todo VALUES ("+deskripsi")');
    res.end()

})

app.get('/todo', function(req, res) {
    res.send('isi database')
})


app.listen(3000, function() {console.log('server sudah jalan')})
