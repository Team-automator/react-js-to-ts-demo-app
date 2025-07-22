import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

const TODO_ITEMS = [
  "buy some cheese",
  "feed the cat",
  "book a doctors appointment",
];

test('renders app title', () => {
  render(<App />);
  expect(screen.getByTestId('app-title')).toHaveTextContent('React 17 Todo App');
});

test('adds a new todo item', () => {
  render(<App />);
  fireEvent.change(screen.getByTestId('todo-input'), { target: { value: TODO_ITEMS[0] } });
  fireEvent.click(screen.getByTestId('add-button'));
  expect(screen.getByText(TODO_ITEMS[0])).toBeInTheDocument();
});

test('marks a todo as completed', () => {
  render(<App />);
  fireEvent.change(screen.getByTestId('todo-input'), { target: { value: TODO_ITEMS[1] } });
  fireEvent.click(screen.getByTestId('add-button'));
  fireEvent.click(screen.getByTestId('todo-checkbox'));
  expect(screen.getByText(TODO_ITEMS[1])).toHaveStyle('text-decoration: line-through');
  expect(screen.getByTestId("todo-item")).toHaveClass('completed');
});

test('deletes a todo item', () => {
  render(<App />);
  fireEvent.change(screen.getByTestId('todo-input'), { target: { value: TODO_ITEMS[2] } });
  fireEvent.click(screen.getByTestId('add-button'));
  fireEvent.click(screen.getByTestId('delete-button'));
  expect(screen.queryByText(TODO_ITEMS[2])).not.toBeInTheDocument();
});

test('filters completed tasks', () => {
  render(<App />);
  fireEvent.change(screen.getByTestId('todo-input'), { target: { value: 'feed the cat' } });
  fireEvent.click(screen.getByTestId('add-button'));
  fireEvent.click(screen.getByTestId('todo-checkbox'));
  fireEvent.click(screen.getByTestId('filter-completed'));
  expect(screen.getByText('feed the cat')).toBeInTheDocument();
});

test('displays correct todo count', () => {
  render(<App />);
  fireEvent.change(screen.getByTestId('todo-input'), { target: { value: 'buy eggs' } });
  fireEvent.click(screen.getByTestId('add-button'));
  fireEvent.change(screen.getByTestId('todo-input'), { target: { value: 'walk dog' } });
  fireEvent.click(screen.getByTestId('add-button'));

  expect(screen.getByTestId('todo-count')).toHaveTextContent('2 items left');
});
