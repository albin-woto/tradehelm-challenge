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

const StatusContext = createContext<TStatusContext>(undefined!);

export type Props = {
  children: React.ReactNode;
};

export function StatusProvider({children}: {children: React.ReactNode}) {
  const [status, setStatus] = useState<Status>(Status.Init);

  return <StatusContext.Provider value={{status, setStatus}}>{children}</StatusContext.Provider>;
}

export {StatusProvider as Provider, StatusContext as default};
