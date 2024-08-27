interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [
  { id: "1", title: "Learn GraphQL", completed: false },
  { id: "2", title: "Build a TODO app", completed: false },
];

export const resolvers = {
  Query: {
    todos: () => todos,
  },

  Mutation: {
    addTodo: (_parent: any, args: { title: string }) => {
      const newTodo: Todo = {
        id: String(todos.length + 1),
        title: args.title,
        completed: false,
      };
      todos.push(newTodo);
      return newTodo;
    },

    toggleTodoCompleted: (_parent: any, args: { id: string }) => {
      const todo = todos.find((todo) => todo.id === args.id);
      if (!todo) {
        throw new Error("Todo not found");
      }
      todo.completed = !todo.completed;
      return todo;
    },
  },
};
