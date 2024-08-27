"use client";

import { gql, useQuery, useMutation } from "@apollo/client";

const GET_TODOS = gql`
  query Query {
    todos {
      id
      title
      completed
    }
  }
`;

const TOGGLE_TODO_COMPLETED = gql`
  mutation Mutation($toggleTodoCompletedId: ID!) {
    toggleTodoCompleted(id: $toggleTodoCompletedId) {
      id
      completed
    }
  }
`;

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface GetTodosData {
  todos: Todo[];
}

function TodoList() {
  const { loading, error, data } = useQuery<GetTodosData>(GET_TODOS);
  const [toggleTodoCompleted] = useMutation(TOGGLE_TODO_COMPLETED);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleStatusChange = async (id: string) => {
    try {
      await toggleTodoCompleted({
        variables: { toggleTodoCompletedId: id },
        optimisticResponse: {
          toggleTodoCompleted: {
            id,
            completed: !data?.todos.find((todo) => todo.id === id)?.completed,
            __typename: "Todo",
          },
        },
        update(cache, { data: { toggleTodoCompleted } }) {
          const existingTodos = cache.readQuery<GetTodosData>({
            query: GET_TODOS,
          });
          const updatedTodos = existingTodos?.todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: toggleTodoCompleted.completed }
              : todo
          );
          cache.writeQuery({
            query: GET_TODOS,
            data: { todos: updatedTodos },
          });
        },
      });
    } catch (error) {
      console.error("Error toggling todo status", error);
    }
  };

  return (
    <ul className="flex flex-col gap-1 p-4">
      {data?.todos.map((todo) => (
        <li key={todo.id} className="flex flex-row gap-2">
          <p>{todo.title}</p>
          <button onClick={() => handleStatusChange(todo.id)}>
            {todo.completed ? "✔" : "❌"}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
