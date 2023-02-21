import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

// initializing the app
const app = express();


// adding the middleware here
app.use(cors());
app.use(express.json());



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '72439',
    database: 'test'  
})

db.connect()


//! This is just a basic server file, just for learning purpose. That's why not using any MVC pattern here


// get all the books
app.get('/books', (req, res) => {
    const q = "SELECT * FROM book";


    db.query(q, (err, data) => {
        if(err) return res.status(400).json({status:"success", message: err.message | "Something went wrong"});

        return res.status(200).json({status:"success", data})
    })

})


// create books
app.post('/books', (req, res) => {

    
    const q = "INSERT INTO book(`title`, `price`) VALUES (?)";
    const {title, price} = req.body;

    const body = [title, price];

    db.query(q, [body], (err, data) => {
        
        if(err) return res.status(400).json({status:"success", message: err.message | "Something went wrong"});

        return res.status(200).json({status:"Data added success", data})

    })
})




// delete books
app.delete('/books/:id', (req, res) => {

    const id = req.params.id;
    
    const q = "DELETE FROM book WHERE _id = ?";
    

    db.query(q, [id], (err, data) => {
        if(err) return res.status(400).json({status:"success", message: err.message | "Something went wrong"});

        return res.status(200).json({status:"Data delete success", data})

    })
})



// update books
app.put('/books/:id', (req, res) => {

    const id = req.params.id;
    const {title, price} = req.body;

    const body = [title, price];

    
    const q = "UPDATE book SET `title` = ?, `price` = ? WHERE _id = ?";
    

    db.query(q, [...body, id], (err, data) => {
        if(err) return res.status(400).json({status:"success", message: err.message | "Something went wrong"});

        return res.status(200).json({status:"Data update success", data})

    })
})






app.listen(8000, () => {
    console.log('listening on PORT 8000')
})