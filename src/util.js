const path = require('path')
let express = require('express')
let app = express()
let hbs = require('hbs')
let geocode = require('./geocode')
let forecast = require('./forecast')

//setup path fot express configuration
let staticFilePath = path.join(__dirname,'../public')
let viewsFilePath = path.join(__dirname,'../templates/views')
let partials = path.join(__dirname,'../templates/partials')
console.log(viewsFilePath)
//setup path for views

app.set('views',viewsFilePath)  
app.set('view engine','hbs')
hbs.registerPartials(partials)

//setup static file to serve
app.use(express.static(staticFilePath))


app.get('/weather',(req,res)=>{
    let address = req.query.address
    let data = geocode(address,(err,data)=>{
        if(err) return err
        forecast(data,(err,data)=>{
            if(err) return res.send(err)
            res.send(data)
        })
    })
})


app.get('',(req,res)=>{
    res.render('index',{title:'weather',name:'shubham kewat'})
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'about',name:'shubham kewat'})
})

app.get('/help',(req,res)=>{
    res.render('help',{helptext:'we will help you in creating a website of your own',title:'help'})
})

app.get('/help/*',(req,res)=>{
    res.render('errpage',{message:"the requested resource not found err 404",title:404})
})

app.get('*',(req,res)=>{
    res.render('errpage',{message:'404 not found'})
})

app.listen(3000,()=>{
    console.log("server is listening on port 3000")
})