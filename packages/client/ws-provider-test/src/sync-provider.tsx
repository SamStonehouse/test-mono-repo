import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { syncedStore, getYjsDoc } from '@syncedstore/core';
import { useSyncedStore } from '@syncedstore/react';
import { WebsocketProvider } from 'y-websocket';
import { Logger } from '@csmono/logger';

interface iStatusEvent {
  status: string;
}

export type Todo = { completed: boolean; title: string };
export type Store = {
  todos: Todo[];
};

export type SyncContextType<T> = {
  websocketProvider: WebsocketProvider;
  logger: Logger;
  store: T;
  state: T;
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
  render: () => void;
};

export const SyncContext = React.createContext<SyncContextType<Store>>({} as SyncContextType<Store>);

// const store = syncedStore<Store>({ todos: [] });
// const doc = getYjsDoc(store);
// const websocketProvider = new WebsocketProvider('ws://localhost:1234', 'my-roomname', doc);

interface iProps {
  children: React.ReactNode;
}

export const SyncProvider = ({ children }: iProps): JSX.Element => {
  const [count, setCount] = useState(0);
  const [logger] = useState(new Logger());
  const [loggerClient] = useState(logger.createClient(['root']));
  const [store] = useState(syncedStore<Store>({ todos: [] }));
  const [doc] = useState(getYjsDoc(store));
  const [connected, setConnected] = useState(false);

  const [websocketProvider] = useState(new WebsocketProvider('ws://localhost:1234', 'my-roomname', doc));

  const state = useSyncedStore(store);

  // Log connection changes
  useEffect(() => {
    const onStatusCB = (event: iStatusEvent) => {
      loggerClient.log(event.status);
      setConnected(event.status === 'connected');
    };
    websocketProvider.on('status', onStatusCB);

    return () => {
      websocketProvider.off('status', onStatusCB);
    };
  }, [logger, websocketProvider]);

  const connect = useCallback(() => {
    websocketProvider.connect();
  }, [websocketProvider]);

  const disconnect = useCallback(() => {
    websocketProvider.disconnect();
  }, [websocketProvider]);

  const render = () => {
    setCount(count + 1);
  };

  const value = useMemo(
    () => ({
      websocketProvider,
      store,
      state,
      connected,
      logger,
      connect,
      disconnect,
      render,
    }),
    [connect, disconnect, store, state, connected, logger, websocketProvider],
  );

  console.log(value.state);

  return <SyncContext.Provider value={value}>{children}</SyncContext.Provider>;
};

// export const store = syncedStore({ todos: [] as Todo[], fragment: 'xml' });
// const doc = getYjsDoc(store);

// // Create your SyncedStore store
// const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-roomname', doc);

// export const disconnect = () => wsProvider.disconnect();
// export const connect = () => wsProvider.connect();
