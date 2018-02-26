console.log('********* server.js **********');
// variables
const port = 8000
const dbUrl = 'mongodb://localhost/petAPI';
// requirements
let mongoose = require( 'mongoose' );
let validate = require('mongoose-validator');    
let express = require( 'express' );
let bodyparser = require( 'body-parser' );
let path = require( 'path' );
let app = express();

mongoose.Promise = global.Promise;

// use
app.use( bodyparser.urlencoded( {extended: true } ) );
app.use( bodyparser.json());
app.use( express.static( __dirname + "/public/dist" ) );

//connection
mongoose.connect(dbUrl);

// test routes connection 
connection = mongoose.connect('mongodb://localhost/petAPI')
let Schema = mongoose.Schema;

let constraints = {
    name: {
        type: String,
        minlength: [3, 'Name must be at least 3 characters.'],
        maxlength: [50, 'Name should not be more than 50 characters'],
        required: [true, 'Please provide your animals name'],
        unique: [true, "This name is already registered with another pet in the shelter. Please use a unique name."]
    },
    type: {
        type: String,
        minlength: [3, 'Type must be at least 3 characters.'],
        maxlength: [50, 'Type should not be more than 50 characters'],
        required: [true, 'Please provide a pet type (i.g. dog or cat)'],
        unique: false,
    },
    desc: {
        type: String,
        minlength: [3, 'Description must be at least 3 characters.'],
        maxlength: [50, 'Description should not be more than 50 characters'],
        required: [true, "Please submit a description of your animal"],
        unique: false,
    },
    likes: {
        type: Number
    },
    skills: {
        type: Array,
        minlength: 3,
        laxlength: 50, 
        required: false
    },
}
console.log("CONSTRAINTS: ", constraints)

// schema
let PetSchema = new Schema({
    name: constraints.name,
    type: constraints.type,
    description: constraints.desc,
    skills: constraints.skills,
    likes: constraints.likes,
}, {timestamps: true});
Pet = mongoose.model('Pet', PetSchema);
Pet.collection.createIndex({"name": 1}, {unique: true});

app.get('/constraints', function(req,res){
    res.json(constraints);
})

//create a pet
app.post('/pets', function(req, res) {
    console.log('****** POST PET - Routes ******');
    console.log('req.body.skill1: ', req.body.skill1);
    console.log('req.body.skill1: ', req.body.skill2);
    console.log('req.body.skill1: ', req.body.skill3);
    if(req.body.skill1) {
        var skills = {}
        skills['skill1'] = (req.body.skill1)
    }
    if(req.body.skill1) {
        skills['skill2'] = req.body.skill2;
    }
    if(req.body.skill1) {
        skills['skill3'] = req.body.skill3
    }
    var pet = new Pet({name: req.body.name, type: req.body.type, description: req.body.description, skills: skills});
    pet.save(function(err, data) {
        if (err) {
            console.log("ERRORS at POST route.js: ", err);
            res.json({message: "Error", error: err});
        } else {
            res.json({message: "Success", data : data});
            console.log('****** app.post /pet: ', data)
        }
    });
});

//get all the pets
app.get('/pets', function(req, res){
    console.log('****** Get ALL PETS - Routes ******');
    Pet.find({}, function(err, data){
        if (err) {
            // console.log(' ******* ERROR at GET ALL route ****** : ', data);
            res.json({message: "Error", error: err});
        } else {
            // console.log(' ******* SUCCESS at GET ALL route ****** : ', data);
            res.json({message: "Success", data : data});
        }  
    })
    .sort("type");
});
//get one pet 
app.get('/pets/:id', function(req, res){
    console.log('****** Get PET by Id - Routes ******');
    Pet.findById(req.params.id, function(err, data){
        if (err) {
            // console.log(' ******* ERROR at GET ALL route ****** : ', data);
            res.json({message: "Error", error: err});
        } else {
            // console.log(' ******* SUCCESS at GET ALL route ****** : ', data);
            res.json({message: "Success", data : data});
        }  
    })
});
//delete a pet
app.delete('/pets/:id', function(req, res) {
    console.log('****** SERVER - delete Pet *****')
    Pet.findByIdAndRemove(req.params.id, function(err, data) {
        if (err) {
            console.log(' ******* ERR at DELETE route ****** : ', err);
            res.json({message: "Error", error: err});
        } else {
            console.log(' ******* (SUCCESS) DATA at DELETE route  ****** : ', data);
            res.json({message: "Success", data : data});
            }
        })
    });




// update a pet by id.param 
app.put('/pets/:id', function(req, res){
    console.log('****** SERVER - Update Pet - ******', req.body.skill1);
    var pet = {};
    pet.name = req.body.name;
    pet.type = req.body.type;
    pet.description = req.body.description;
    pet.skills = {};
    if(req.body.skill1) {
        pet.skills['skill1'] = req.body.skill1;
    }
    if(req.body.skill1) {
        pet.skills['skill2'] = req.body.skill2;
    }
    if(req.body.skill1) {
        pet.skills['skill3'] = req.body.skill3;
    }

    // 
    Pet.update({_id: req.params.id}, pet, {runValidators: true },function(err, data) {
        if (err) {
            console.log(' ******* ERR at UPDATE PET route ****** : ', err);
            res.json( {message: "Error", error: err} ) } 
        else {
            console.log(' ******* (SUCCESS) DATA at UPDATE PET route  ****** : ', data);
            res.json( {message: "Success", data : data} ) };
    });
});





app.put('/pets/:id/like', function(req,res) {
    console.log('***** PUT LIKE /pets/' + req.params.id +'/like - routes.js ****** ');
    Pet.findOneAndUpdate({_id: req.params.id}, {$inc: {likes:1 }},function(err,data){
        if(err){
            console.log(' ******* ERR at UPDATE-LIKE route ****** : ', err);
            res.json( {message: "Error", error: err} ) }
        else {
            console.log(' ******* (SUCCESS) DATA at UPDATE LIKE route  ****** : ', data);
            res.json( {message: "Success", data : data} ) };
    });
});


app.all('*', (req,res, next) => {
    res.sendFile(path.resolve('./public/dist/index.html'));
});

app.listen(port, function(){
    console.log(`Pets is listening on ${port} `);
});

