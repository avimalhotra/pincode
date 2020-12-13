const express=require('express');
const app=express();
const nunjucks=require('nunjucks');
const path=require('path');
require('dotenv').config();
const db=require('./dao');
let [Pin,Car]=[require('./models/pin'),require('./models/pin')];

app.use(express.static('src/public'));

nunjucks.configure(path.resolve(__dirname,'public'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
});

app.get("/",(req,res)=>{
    //res.status(200).send("hello node");
    res.status(200).render('home.html',{ title: "Hello Node" });
});

app.get("/pincode",(req,res)=>{
    var val=req.query.pincode;

    Pin.find({pincode:val},(err,data)=>{
        if(err){
            console.error(err);
        }
        else{
           if( data.length==0){
            res.status(200).render('pincode.html',{ pin:val, msg:"Pincode not found"  });
           }
           else{
            res.status(200).render('pincode.html',{ pin:val, output:data  });
           }
           
        }
    })
});
app.get("/api/:pindata",(req,res)=>{
    var pin=req.params.pindata;
    res.header('Access-Control-Allow-Origin',"*");
    
    Pin.find({pincode:pin},(err,data)=>{
        if(err){
            return res.send(err);
        }
        else{
            return res.send(data);
        }
        
    })
    
});


app.listen(process.env.PORT,()=>{
    console.log(`server running at ${process.env.PORT} `);
});