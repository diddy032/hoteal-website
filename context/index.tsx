import { createContext, useState, useEffect } from "react";

interface ContextProps {
  authToken: string;
  account: any;
  setAuthToken: (authToken: string) => void;
  setAccount: (account: any) => void;
}

export const Context_data = createContext<ContextProps>({
  authToken: "",
  account: {},
  setAuthToken: () => {},
  setAccount: () => {},
});

type Props = {
  children?: React.ReactNode;
  authTokenProps?: string;
};

export function Context({ children, authTokenProps }: Props) {
  const [authToken, setAuthToken] = useState<string>("");
  const [account, setAccount] = useState<{}>({});

  useEffect(() => {
    if (authTokenProps === undefined || authTokenProps === "") return;
    setAuthToken(authTokenProps);
  }, [authTokenProps]);

  return (
    <Context_data.Provider
      value={{
        authToken,
        setAuthToken,
        account,
        setAccount,
      }}
    >
      {children}
    </Context_data.Provider>
  );
}
export default Context;
