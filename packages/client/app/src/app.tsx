import { useRef } from 'react';
import { Logger } from '@csmono/logger';

const App = (): JSX.Element => {
  const logger = useRef(new Logger());
  logger.current.log('Render');

  return <div>Test</div>;
};

export default App;
