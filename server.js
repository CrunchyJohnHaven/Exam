console.log('********* SERVER **********');
// variables
const port = 8000
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
mongoose.connect( "mongodb://localhost/ProductAPI" );

// test routes connection 
let Schema = mongoose.Schema;

let constraints = {
    name: {
        type: String,
        minlength: [3, 'Name must be at least 3 characters.'],
        required: [true, 'Please provide a product name'],
    },
    quantity: {
        type: Number,
        min: [1, 'The quantity must be greater than 0.'],
        required: [true, 'Please provide the quantity of this product'],
    },
    price: {
        type: Number,
        min: [1, 'Product price must be a number greater than 0.'],
        required: [true, "Please submit a price for this product "],
    },
}
console.log("CONSTRAINTS: ", constraints)

// schema
let ProductSchema = new Schema({
    name: constraints.name,
    quantity: constraints.quantity,
    price: constraints.price,
}, {timestamps: true});
Product = mongoose.model('Product', ProductSchema);

app.get('/constraints', function(req,res){
    res.json(constraints);
})

//#1 create a product
app.post('/product', function(req, res) {
    console.log('****** POST PET - Routes ******');
    var product = new Product({name: req.body.name, quantity: req.body.quantity, price: req.body.price});
    product.save(function(err, data) {
        if (err) {
            console.log("ERRORS at POST route.js: ", err);
            res.json({message: "Error", error: err});
        } else {
            res.json({message: "Success", data : data});
            console.log('****** SERVER - POST PRODUCT: ', data)
        }
    });
});
// {
//     "name": "aaaa",
//     "quantity": 10,
//     "price": 14
// }
// {
//     "message": "Success",
//     "data": {
//         "name": "aaaa",
//         "quantity": [
//             10
//         ],
//         "price": [
//             14
//         ],
//         "_id": "5a94a7d71272f85694d29f5b",
//         "createdAt": "2018-02-27T00:35:35.188Z",
//         "updatedAt": "2018-02-27T00:35:35.188Z",
//         "__v": 0
//     }
// }
// 
// #2 get all the products 
app.get('/products', function(req, res){
    console.log('****** Get ALL PETS - Routes ******');
    Product.find({}, function(err, data){
        if (err) {
            // console.log(' ******* ERROR at GET ALL route ****** : ', data);
            res.json({message: "Error", error: err});
        } else {
            // console.log(' ******* SUCCESS at GET ALL route ****** : ', data);
            res.json({message: "Success", data : data});
        }  
    })
    .sort("quantity");
});
// {
//     "message": "Success",
//     "data": [
//         {
//             "quantity": [
//                 10
//             ],
//             "price": [
//                 14
//             ],
//             "_id": "5a94a7d71272f85694d29f5b",
//             "name": "aaaa",
//             "createdAt": "2018-02-27T00:35:35.188Z",
//             "updatedAt": "2018-02-27T00:35:35.188Z",
//             "__v": 0
//         }
//     ]
// }

// #3 get one product 
app.get('/product/:id', function(req, res){
    console.log('****** Get PET by Id - Routes ******');
    Product.findById(req.params.id, function(err, data){
        if (err) {
            // console.log(' ******* ERROR at GET ALL route ****** : ', data);
            res.json({message: "Error", error: err});
        } else {
            // console.log(' ******* SUCCESS at GET ALL route ****** : ', data);
            res.json({message: "Success", data : data});
        }  
    })
});
// {
//     "message": "Success",
//     "data": {
//         "quantity": [
//             10
//         ],
//         "price": [
//             14
//         ],
//         "_id": "5a94a7d71272f85694d29f5b",
//         "name": "aaaa",
//         "createdAt": "2018-02-27T00:35:35.188Z",
//         "updatedAt": "2018-02-27T00:35:35.188Z",
//         "__v": 0
//     }
// }

// #4 delete a product
app.delete('/product/:id', function(req, res) {
    console.log('****** SERVER - delete Pet *****')
    Product.findByIdAndRemove(req.params.id, function(err, data) {
        if (err) {
            console.log(' ******* ERR at DELETE route ****** : ', err);
            res.json({message: "Error", error: err});
        } else {
            console.log(' ******* (SUCCESS) DATA at DELETE route  ****** : ', data);
            res.json({message: "Success", data : data});
            }
        })
    });
    // {
    //     "message": "Success",
    //     "data": {
    //         "quantity": [
    //             10
    //         ],
    //         "price": [
    //             14
    //         ],
    //         "_id": "5a94a7d71272f85694d29f5b",
    //         "name": "aaaa",
    //         "createdAt": "2018-02-27T00:35:35.188Z",
    //         "updatedAt": "2018-02-27T00:35:35.188Z",
    //         "__v": 0
    //     }
    // }
// 
// #5 update a product
app.put('/product/:id', function(req, res){
    console.log('****** SERVER - Update PRODUCT()******', req.body.name);
    var product = {};
    product.name = req.body.name;
    product.quantity = req.body.quantity;
    product.price = req.body.price;
    Product.update({_id: req.params.id}, product, {runValidators: true },function(err, data) {
        if (err) {
            console.log(' ******* SERVER - ERR at UPDATE PRODUCT route ****** : ', err);
            res.json( {message: "Error", error: err} ) } 
        else {
            console.log(' ******* SERVER - (SUCCESS) DATA at UPDATE PRODUCT route  ****** : ', data);
            res.json( {message: "Success", data : data} ) };
    });
});
// localhost:8000/product/5a94aab3961f695921ec0015
// {
//     "name": "bbbbb",
//     "quantity": 20,
//     "price": 100
// }
// {
//     "message": "Success",
//     "data": [
//         {
//             "quantity": [
//                 20
//             ],
//             "price": [
//                 100
//             ],
//             "_id": "5a94aab3961f695921ec0015",
//             "name": "bbbbb",
//             "createdAt": "2018-02-27T00:47:47.284Z",
//             "updatedAt": "2018-02-27T00:49:11.091Z",
//             "__v": 0
//         }
//     ]
// }
// 
// 
// 
app.all('*', (req,res, next) => {
    res.sendFile(path.resolve('./public/dist/index.html'));
});

app.listen(port, function(){
    console.log(`Pets is listening on ${port} `);
});


