"use client"

import { gql, useQuery } from '@apollo/client';

const GET_TODOS = gql`
    query Query {
        todos {
            id
            title
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <ul>
            {data?.todos.map(todo => (
                <li key={todo.id}>
                    {todo.title} {todo.completed ? "✔" : "❌"}
                </li>
            ))}
        </ul>
    );
}

export default TodoList;