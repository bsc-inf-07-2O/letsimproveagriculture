const express = require('express')
const app = express()

const bodyParser = require('body-parser')
// Request Body parsing Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


const dbConnection = require('./src/utils/mysql.connector')

const Post = require('./src/posts/post.model')

app.get('/api/v1', function (req, res) {
    return res.json(req.headers);
})

app.get('/api/v1/posts', function (req, res) {
    var sql2 = "SELECT * FROM textbooks"

    return dbConnection.query(sql2, function (err, result) {
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

//update from existing post
const request = require('request');
app.patch('/api/v1/posts/:ID', function (request, response) {
    console.log(request.params)

    //get id from response, use id, to select a post from database, update post and request
    const sql = `SELECT * FROM textbooks WHERE ID = ${request.params.ID} LIMIT 1`
    return dbConnection.query(sql, function (err, rows) {
        if (err) throw err
    
        const post = request.body
        console.log(post)
        
        if (rows.length>=1){
        const updateSql = `UPDATE posts SET name ='${post.name}' WHERE ID =${ rows[0].ID}`
       console.log(updateSql)
        
       return dbConnection.query (updateSql, function(err, result) {
        return response.json(result)
       
       
       }) 
    } else {
        return response.json ({
            status: false,
            statuscode: 404,
            message: ``
        })
    }
       })
      
    })




//deleting from  existing post
app.delete('/api/v1/posts/:id', function (req, res) {
    var sqlDel = `DELETE FROM textbooks WHERE id = '${req.params.id}' LIMIT 1 `

    return dbConnection.query(sqlDel, function (err, result) {
        if (err) throw err;

        console.log("ONE ROW DELETED")

        return res.json(
                    {
                     status: true,
                     statusCode: 200,
                     data: result




                    }



        );
    })

})













app.listen(3000, function () {
    console.log('letsimproveagriculture listening on port 3000');

    dbConnection.connect(function (err) {
        if (err) throw err

        console.log("MYSQL is connected");
    })

})
