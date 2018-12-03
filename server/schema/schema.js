const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');

const { GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt, 
  GraphQLID, 
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull} = graphql;

const BookType = new GraphQLObjectType({
  name:'Book',
  fields:()=>({
    id:{type:GraphQLID},
    name:{type: GraphQLString},
    genre:{type: GraphQLString},
    //reletion many to 1 "a book has 1 author" 
    author:{
      type: AuthorType,
      resolve(parent,args){
        //return authors.find(author=> parent.authorId===author.id)
        return Author.findById(parent.authorId)
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name:'Author',
  fields:()=>({
    id:{type:GraphQLID},
    name:{type: GraphQLString},
    age:{type: GraphQLInt},
    //reletion 1 to many "an author can have 0 or many books" 
    books:{
      type: new GraphQLList(BookType),
      resolve(parent,args){
        //return books.filter(book => book.authorId===parent.id)
        return Book.find({authorId:parent.id})
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    //return 1 single book 
    book:{
      type:BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent,args){
        // return books.find(book => book.id === args.id)
        return Book.findById(args.id)
      }
    },
    //return 1 single author 
    author:{
      type:AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent,args){
        // return authors.find(author => author.id === args.id)
        return Author.findById(args.id)
      }
    },
    //return all Books
    books:{
      type: new GraphQLList(BookType),
      resolve(parent,args){
        // return books
        return Book.find({})
      }
    },
    //return all Authors
    authors:{
      type: new GraphQLList(AuthorType),
      resolve(parent,args){
        // return authors
        return Author.find({})
      }
    }

  }
});

const Mutation = new GraphQLObjectType({
  name:'Mutation',
  fields:{
    addAuthor:{
      type: AuthorType,
      args:{
        name:{type: new GraphQLNonNull(GraphQLString)},
        age:{type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent,args){
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook:{
      type: BookType,
      args:{
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent,args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        })
        return book.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});