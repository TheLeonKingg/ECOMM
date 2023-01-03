const express = require('express');
const cors = require('cors');

require('./db/config');
const loginRoute = require('./e-comm-apis/Routes/UserCred/login-route');
const signupRoute = require('./e-comm-apis/Routes/UserCred/signup-route');
const getAllProductRoute = require('./e-comm-apis/Routes/Product/getAllProducts-route');
const addProductRoute = require('./e-comm-apis/Routes/Product/addProduct-route');
const deleteProductRoute = require('./e-comm-apis/Routes/Product/deleteProduct-route');
const singleProductRoute = require('./e-comm-apis/Routes/Product/getSingleProduct-route');
const updateProductRoute = require('./e-comm-apis/Routes/Product/updateProduct-route');
const searchProductRoute = require('./e-comm-apis/Routes/Product/searchProduct-route');
const addProductToCart = require('./e-comm-apis/Routes/Product/add-product-to-cart-route');
const deleteCartItem = require('./e-comm-apis/Routes/Product/delete-cart-product-route');
const userAddress = require('./e-comm-apis/Routes/UserCred/userAddress-route');
const updateAddress = require('./e-comm-apis/Routes/UserCred/updateUserAddress-route');
const getAddress = require('./e-comm-apis/Routes/UserCred/getUserAddress-route');
const deleteUser = require('./e-comm-apis/Routes/UserCred/deleteUser-route');
const Token = require('./Middlewares/verifyToken');
const verifyToken = Token.verifyToken;
const upload = require('./Middlewares/uploadFile')

const app = express();
app.use(express.json());
app.use(cors());



app.use("/signup",signupRoute );

app.use("/login" , loginRoute);

app.use('/deleteAccount/' , verifyToken ,deleteUser )

app.use('/add-product',upload,verifyToken,addProductRoute);

app.use('/getAllProducts', verifyToken, getAllProductRoute);

app.use('/delete-product/', verifyToken , deleteProductRoute);

app.use('/product/', verifyToken,singleProductRoute);

app.use('/updateProduct/', upload, verifyToken,updateProductRoute);

app.use('/search/' , verifyToken ,searchProductRoute);

app.use('/addToCart/', upload, verifyToken , addProductToCart );

app.use('/deleteCartItem/', verifyToken , deleteCartItem );

app.use('/addAddress/',verifyToken,userAddress);

app.use('/updateAddress/',verifyToken , updateAddress);

app.use('/getAddress/',verifyToken,getAddress);


app.listen(5000);