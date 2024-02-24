import { useContext, useRef } from 'react';
import { useSyncedStore } from '@syncedstore/react';
import { SyncContext } from './sync-provider';

const Todos = (): JSX.Element => {
  // const { state } = useContext(SyncContext);
  const { store, logger } = useContext(SyncContext);
  const state = useSyncedStore(store);

  const loggerClient = useRef(logger.createClient(['todos']));

  loggerClient.current.log('Render');

  return (
    <div>
      <p>Todo items:</p>
      <ul>
        {state.todos.map((todo, i) => {
          return (
            <li key={i} style={{ textDecoration: todo.completed ? 'line-through' : '' }}>
              <label>
                <input type="checkbox" checked={todo.completed} onClick={() => (todo.completed = !todo.completed)} />
                {todo.title}
              </label>
            </li>
          );
        })}
      </ul>
      <input
        placeholder="Enter a todo item and hit enter"
        type="text"
        onKeyPress={event => {
          if (event.key === 'Enter') {
            const target = event.target as HTMLInputElement;
            // Add a todo item using the text added in the textfield
            state.todos.push({ completed: false, title: target.value });
            target.value = '';
          }
        }}
        style={{ width: '200px', maxWidth: '100%' }}
      />
    </div>
  );
};

export default Todos;
