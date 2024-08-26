import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    addTodo(title: String!): Todo!
    toggleTodoCompleted(id: ID!): Todo!
  }
`;
