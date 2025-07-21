import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggleComplete, onDeleteTodo }) {
  if (!todos.length) return <p data-testid="empty-message">No tasks found.</p>;

  return (
    <ul data-testid="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
