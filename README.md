# express-graphql-vitabu

This is an Express.js application that serves a GraphQL API for querying books and authors. It uses the `express-graphql` middleware to create a GraphQL server. 

Here's how you can create a similar app and have fun with it:

1. Import necessary dependencies:
   - `express`: This imports the Express.js framework to create a web server.
   - `graphqlHTTP`: This imports the `express-graphql` middleware for handling GraphQL requests.
   - Various GraphQL related modules are imported, including types and objects for defining the schema.

2. Define sample data:
   - Two arrays, `authors` and `books`, are defined to serve as sample data for authors and books.

3. Define GraphQL Types:
   - `BookType`: This represents the GraphQL type for books. It has fields for `id`, `title`, and `author`, where `author` is an object of type `AuthorType`. The `resolve` function is used to fetch the author information for a given book based on the `authorId`.
   - `AuthorType`: This represents the GraphQL type for authors. It has fields for `id`, `name`, and `books`, where `books` is a list of `BookType`. The `resolve` function is used to fetch all books associated with a given author.

4. Define Root Query:
   - `RootQueryType`: This represents the root query type for the GraphQL schema. It defines the following query fields:
     - `book`: Retrieves a single book by its `id`.
     - `books`: Retrieves a list of all books.
     - `authors`: Retrieves a list of all authors.
     - `author`: Retrieves a single author by their `id`.

5. Create GraphQL Schema:
   - The `schema` is created using `GraphQLSchema`, with `RootQueryType` as the query root.

6. Set up Express.js Server:
   - The Express.js app is initialized using `express()`.
   - The GraphQL middleware is mounted at the `/graphql` endpoint using `app.use()`. It uses the `schema` defined earlier and enables the GraphiQL interface for easy GraphQL querying during development.

7. Start the Server:
   - The Express.js server listens on port `3000`.

PS: "VITABU" means BOOKS in Swahili!!
![gql](https://github.com/jimmyurl/express-graphql-vitabu/assets/33938444/53d461fd-a2f7-4e2e-8cd7-46d5a783c723)

