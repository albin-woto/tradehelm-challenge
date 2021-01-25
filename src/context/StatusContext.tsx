import React, {useState, createContext} from "react";

export enum Status {
  Init = "Init",
  Creating = "Creating",
  Removing = "Removing",
  Success = "Success",
}

type TStatusContext = {
  status: Status;
  setStatus: (status: Status) => void;
};

const InitialState = {
  status: Status.Init,
  setStatus: () => {
    return;
  },
};

const StatusContext = createContext<TStatusContext>(InitialState);

export type Props = {
  children: React.ReactNode;
};

// I'm not sure that the return type should be JSX.Element, but I don't find any documentation about it
// The es-lint rules ask for an explicit return type
export function StatusProvider({children}: {children: React.ReactNode}): JSX.Element {
  const [status, setStatus] = useState<Status>(Status.Init);

  return <StatusContext.Provider value={{status, setStatus}}>{children}</StatusContext.Provider>;
}

export {StatusProvider as Provider, StatusContext as default};
