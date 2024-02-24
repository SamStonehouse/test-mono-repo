import { useContext } from 'react';
import { SyncContext } from './sync-provider';

const SyncControls = (): JSX.Element => {
  const { connect, disconnect, render } = useContext(SyncContext);

  return (
    <div>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
      <button onClick={render}>Render</button>
    </div>
  );
};

export default SyncControls;
