import { FC, PropsWithChildren, createContext } from "react";

export type IStore = {
  url: string;
};

export const store = createContext<IStore>({ url: "http://127.0.0.1:3001/" });

type StoreProviderProps = {
  url: string;
} & PropsWithChildren;

const StoreProvider: FC<StoreProviderProps> = ({ url, children }) => {
  return <store.Provider value={{ url }}>{children}</store.Provider>;
};

export default StoreProvider;
