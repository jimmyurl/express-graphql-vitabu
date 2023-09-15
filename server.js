const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema,GraphQLObjectType,GraphQLString, GraphQLList, GraphQLInt,GraphQLNonNull} = require('graphql');

const authors = [
    {id: 1, name: 'Daniel Goleman'},
    {id: 2, name: 'Sultan Tamba'},
    {id: 3, name: 'Masoud Kipanya'},
    {id: 4, name: 'James Gayo'},
    {id: 5, name: 'Rabbi Daniel Lapin'},
    {id: 6, name: 'James Allen'}
]

const books = [
    {id: 1, title:'Emotional Intelligence', authorId: 1},
    {id: 2, title: 'Nyota ya Huzuni', authorId:2},
    {id: 3, title: 'Vipande 26 vya Keki', authorId:3},
    {id: 4, title: 'Hekaheka za Kingo', authorId: 4},
    {id: 5, title: 'Kipanya', authorId: 3},
    {id: 6, title: 'Business Secrets From The Bible', authorId: 5},

    {id: 7, title: 'As A Man Thinketh', authorId: 6}
]

const BookType = new GraphQLObjectType({
    name: 'Books',
    description: 'Vitabu vya Waandishi Tajwa',
    fields: () => ({
id: {type: GraphQLNonNull(GraphQLInt)},
title: {type: GraphQLNonNull(GraphQLString)},
authorId: {type: GraphQLNonNull(GraphQLInt)},
author: {
    type: AuthorType,
    resolve: (book) =>{
        return authors.find(author => author.id === book.authorId)
    }
}
    })
})




const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'Waandishi wa Vitabu vya Waandishi Tajwa',
    fields: () => ({
id: {type: GraphQLNonNull(GraphQLInt)},
name: {type: GraphQLNonNull(GraphQLString)},
books: {
    type: new GraphQLList(BookType),
    resolve: (author) =>{
        return books.filter(book =>book.authorId === author.id)
    }
}


    })
})



const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () =>({
        book: {
            type: BookType,
            description:'A single Book',
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (parent, args) => books.find(book =>book.id ===args.id)
            },
        books: {
        type: new GraphQLList(BookType),
        description:'List of All Books',
        resolve: () => books
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description:'List of All Authors',
            resolve: () => authors
            },
            author: {
                type: new GraphQLList(AuthorType),
                description:'A Single Author',
                args:{
                    id: {type: GraphQLInt}
                },
                resolve: (parent,args) => authors.find(author => author.id === args.id)
                }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql:true
}))
app.listen(3000.,()=>console.log('Server is Running'));