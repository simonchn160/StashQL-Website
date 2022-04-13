const db = require('./models/DemoModel');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

//Type Definitions
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This respresents an author of a book',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: { 
      type: new GraphQLList(BookType),
      resolve: async (author) => {
        const sqlQuery = 'SELECT * FROM books WHERE authorid = $1;'
        const params = [author.id];
        try {
          const response = await db.query(sqlQuery, params);
          // console.log(response.rows);
          return response.rows;
        }
        catch (error) {
          console.log('Error: ', error);
        };
      }
    }
  })
})

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This respresents a book written by an author',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorid: { type: GraphQLNonNull(GraphQLInt) },
    author: { 
      type: AuthorType,
      resolve: async (book) => {
        const sqlQuery = 'SELECT * FROM authors WHERE id = $1;'
        const params = [book.authorid];
        try {
          const response = await db.query(sqlQuery, params);
          // console.log(response.rows[0]);
          return response.rows[0];
        }
        catch (error) {
          console.log('Error: ', error);
        };
      }
    }
  })
})

//Queries
const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: 'List of All Books',
      resolve: async () => {
        const sqlQuery = 'SELECT * FROM books;'
        try {
          const response = await db.query(sqlQuery);
          // console.log(response.rows);
          return response.rows;
        }
        catch (error) {
          console.log('Error: ', error);
        };
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of All Authors',
      resolve: async () => {
        const sqlQuery = 'SELECT * FROM authors;'
        try {
          const response = await db.query(sqlQuery);
          // console.log(response.rows);
          return response.rows;
        }
        catch (error) {
          console.log('Error: ', error);
        };
      }
    },
    book: {
      type: BookType,
      description: 'A single book',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: async (parent, args) => {
        const sqlQuery = 'SELECT * FROM books WHERE id = $1;'
        const params = [args.id];
        try {
          const response = await db.query(sqlQuery, params);
          // console.log(response.rows[0]);
          return response.rows[0];
        }
        catch (error) {
          console.log('Error: ', error);
        };
      }
    },
    author: {
      type: AuthorType,
      description: 'A single author',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: async (parent, args) => {
        const sqlQuery = 'SELECT * FROM authors WHERE id = $1;'
        const params = [args.id];
        try {
          const response = await db.query(sqlQuery, params);
          // console.log(response.rows[0]);
          return response.rows[0];
        }
        catch (error) {
          console.log('Error: ', error);
        };
      }
    }
  })
})

//Mutations
const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'Add a book',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorid: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (parent, args) => {
        const sqlQuery = `INSERT INTO books (name, authorid) VALUES ($1, $2) RETURNING *;`
        const params = [args.name, args.authorid];
        try {
          const response = await db.query(sqlQuery, params);
          return response.rows[0];
        }
        catch (error) {
          console.log('Error: ', error);
        };
      }
    },
    addAuthor: {
      type: AuthorType,
      description: 'Add an author',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        refillCache: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        const sqlQuery = `INSERT INTO authors (name) VALUES ($1) RETURNING *;`
        const params = [args.name];
        try {
          const response = await db.query(sqlQuery, params);
          return response.rows[0];
        }
        catch (error) {
          console.log('Error: ', error);
        };
      }
    }
  })
})


const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = schema;
