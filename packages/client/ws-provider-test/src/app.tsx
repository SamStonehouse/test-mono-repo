import { SyncProvider } from './sync-provider';
import Todos from './todos';
import SyncControls from './sync-controls';

import './app.css';

const App = (): JSX.Element => {
  return (
    <SyncProvider>
      <SyncControls />
      <Todos />
    </SyncProvider>
  );
};

export default App;
