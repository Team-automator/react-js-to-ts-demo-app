import React, { useContext, useState, useRef } from "react";
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
function App() {
  const { user, logout, login } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const titleRef = useRef();

  const handleAddTodo = (newTodo) => {
    setTodos(prev => [newTodo, ...prev]);
  };

  const handleToggleComplete = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") return true;
    if (filter === "Completed") return todo.completed;
    if (filter === "Active") return !todo.completed;
    return true;
  });
console.log("iuser=",user);
  if (!user) {
    return <Login onLogin={login}/>;
  }

  return (
    <div className="todo-container">
      <header className="todo-header">
        <h1 ref={titleRef}>Welcome, {user.name}!</h1>
        <button className="logout-button" onClick={logout}>Logout</button>
      </header>
      <TodoForm onAddTodo={handleAddTodo} />
      <FilterButtons currentFilter={filter} onChange={setFilter} />
      <TodoList
        todos={filteredTodos}
        onToggleComplete={handleToggleComplete}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}

export default App;
