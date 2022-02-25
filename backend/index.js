const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');



const app = express();

app.use(cors());
app.use(bodyparser.json());

//Connection to MySQL DB

const db = mysql.createConnection({
        host:'localhost',
        user:'root',
        password: '',
        database:'journal_entries',
        port:3306
});

//Check DB Connection

db.connect(error=>{
    if (error) {console.log('Error connecting!');}
    else{
        console.log('database connected..')
    }
});


//Retrieve Data from DB
app.get('/entry',(req,res)=>{
    let query = `select * from entry`;

    db.query(query,(err,result)=>{
            if (err){
                console.log(err, 'Error Retrieving!');
            }

            if(result.length > 0){
                res.send({
                    msg:'Journal Entry Data',
                    data:result
                });
            }
    });
});


//Retrieve data by id
app.get('/entry/:id', (req,res)=>{
    
    let entryID = req.params.id;

    let query = `select * from entry where id = ${entryID}`;

    db.query(query,(err,result) =>{
        if (err){console.log(err);}

        if (result.length > 0){
            res.send({
                message:'get single entry',
                data:result
            });
        }
        else{
            res.send({
                message:'entry not found'
            });
        }
    });
});

// Create New Entry
app.post('/entry', (req,res)=>{

    console.log(req.body,'postentry');

    let entryTitle = req.body.title;
    let entryTicker = req.body.stock_ticker;
    let entryDate = req.body.date;
    let entryNotes = req.body.notes;

    let query = `insert into entry (title, stock_ticker, date, notes) values('${entryTitle}','${entryTicker}', '${entryDate}', '${entryNotes}')`;

    db.query(query,(err,result) => {
        if (err){console.log(err);}
        console.log(result, 'result');     
            res.send({
                message:'new entry inserted'
            });
    });
});


//Edit/Update Entry by ID
app.put('/entry', (req, res)=>{

    console.log(req.body,'updateentry');

    let entryID = req.params.id;

    let entryTitle = req.body.title;
    let entryTicker = req.body.stock_ticker;
    let entryDate = req.body.date;
    let entryNotes = req.body.notes;

    let updateQuery = `update entry set title = '${entryTitle}', stock_ticker = '${entryTicker}', date = '${entryDate}', notes = '${entryNotes}' where id = ${entryID}`;

    db.query(updateQuery,(err,result)=>{

        if(err) {console.log(err);}

        res.send({
            message:'entry updated'
        });
    })
})


//Delete Entry by ID

app.delete('/entry/:id',(req,res)=>{
    let entryID = req.params.id;

    let deleteQuery =   `delete from entry where id = '${entryID}' `;
    db.query(deleteQuery,(err,result)=>{
        if(err){console.log(err);}

        res.send({
message: 'entry deleted'
        });

    })
})

app.listen(3000, () =>{
    console.log('server running');
});


