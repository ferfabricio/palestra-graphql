# Criando API GraphQL

## Hello world

`npm install --save express-graphql graphql`

## Criando o type Contact

```
const schema = buildSchema(`
  type Contact {
    id: ID!,
    name: String,
    phone: String
  }

  type Query {
    getContact(id: ID!): Contact
  }

  type Mutation {
    createContact(name: String, phone: String): Contact
  }
`);
```

```
mutation {
  createContact(name: "Fernando", phone: "44 9987894544") {
    id,
    name,
    phone
  }
}
```
