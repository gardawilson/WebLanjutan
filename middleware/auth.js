
const sqlite = require('sqlite3').verbose()
let db = new sqlite.Database('todo_database.db')
module.exports = function(req, res, next){
    const username = req.headers.username
    const password = req.headers.password

    const stmt = db.prepare('SELECT username from users WHERE username=? AND password=?')
    stmt.all(username, password, function(err, rows){
        if(rows.length > 0){
            next()
        }else{
            res.send(401)
        }
    })

}
