const express = require('express')
const app = express ()

const bodyParser = require('body-parser')
// Request Body parsing Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


const dbConnection = require('./src/utils/mysql.connector')

const Post = require('./src/posts/post.model')

app.get ('/api/v1', function (req, res){
   return res.json(req.headers);
})
 
app.get('/api/v1/posts', function (req, res){
 var sql2 = "SELECT * FROM textbooks" 

 return dbConnection.query(sql2, function (err, result){
     if (err) throw err;
   
    return res.json(result);
 })

}) 
 
 //crete new post/article in the database 
 app.post('/api/v1/posts', function (req, res) {
    // console.log(req.body)
    const { ID, title, edition, arthor } = req.body // destructure sent properties from the REQUEST body

    // construct sql query
    var sql = `INSERT INTO textbooks (ID, title, edition, arthor) VALUES ('${ID}','${title}','${edition}', ' ${arthor}')`;
    // console.log(sql)
    // Query the MySQL database and return result to the client app ie. POSTMAN or Web APP
    return dbConnection.query(sql, function (err, result) {
        if (err) throw err; // if error throw it, else continue execution to next line
        return res.json(result)
        // console.log("1 record inserted");
    });
    // res.json(sql)
})


app.listen(3000, function() {
    console.log('letsimproveagriculture listening on port 3000');

    dbConnection.connect(function (err) {
        if (err) throw err

        console.log("MYSQL is connected");
    })   

})
