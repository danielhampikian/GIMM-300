const express = require('express');
const covid = require('novelcovid');
const bodyParser = require('body-parser');
const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.listen(3000, function(){
    console.log('listening on port 3000');
})

async function getStats(stateInput) {
    let state = await covid.getState({state: stateInput});
    return state;
}

app.get('/',function(req,res){
    res.render('index',{state:'',cases:'',deaths: ''});
})

app.post('/',function(req,res) {
    let state = req.body.state;
    getStats(state).then(response=>{
        res.render('index',{state:state, cases:response.cases, deaths: response.deaths});
    });
})