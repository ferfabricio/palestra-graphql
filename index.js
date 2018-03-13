const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema, GraphQLList } = require('graphql');

const contacts = {};

const schema = buildSchema(`
  type Contact {
    id: ID!,
    name: String,
    phone: String
  }

  type Query {
    contact(id: ID): Contact
    allContacts: [Contact]
  }

  type Mutation {
    createContact(name: String, phone: String): Contact
  }
`);

const root = {
  createContact: ({name, phone}) => {
    return new Promise((resolve, reject) => {
      let id = require('crypto').randomBytes(10).toString('hex');

      contacts[id] = {
        id,
        name,
        phone
      };

      resolve(contacts[id]);
    });
  },
  contact: ({ id }) => {
    return new Promise((resolve, reject) => {
      if (contacts.hasOwnProperty(id)) {
        resolve(contacts[id]);
      }

      reject('not found');
    });
  },
  allContacts: () => {
    return Object.values(contacts);
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(3000, () => console.log('Executando na porta 3000'));
