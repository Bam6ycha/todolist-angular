import Input from './Input/Input';
import TodoItem from './TodoItem/TodoItem';

function App() {
  return (
    <div className='App'>
      <form onSubmit={(event) => event.preventDefault()}>
        <Input />
        <TodoItem />
      </form>
    </div>
  );
}

export default App;
