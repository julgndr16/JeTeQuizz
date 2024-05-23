import {
  Dispatch,
  FC,
  PropsWithChildren,
  createContext,
  useState,
} from "react";

export type IStore = {
  url: string;
  currentQuizzId?: number;
  setCurrentQuizzId?: Dispatch<number | undefined>;
};

export const store = createContext<IStore>({ url: "http://127.0.0.1:3001/" });

type StoreProviderProps = {
  url: string;
} & PropsWithChildren;

const StoreProvider: FC<StoreProviderProps> = ({ url, children }) => {
  const [currentQuizzId, setCurrentQuizzId] = useState<number>();

  return (
    <store.Provider value={{ url, currentQuizzId, setCurrentQuizzId }}>
      {children}
    </store.Provider>
  );
};

export default StoreProvider;
