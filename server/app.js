const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

//database connection
mongoose.connect('mongodb://ninja:test123@ds123224.mlab.com:23224/gql-ninja');
mongoose.connection.once('open',()=>{
  console.log('connected to database')
})

app.use('/graphql',graphqlHTTP({
  schema, 
  graphiql: true
}));

app.listen(4000,()=>{
  console.log('now listening for request on port 4000')
})