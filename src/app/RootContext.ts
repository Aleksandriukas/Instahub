import { createSafeContext } from "@sirse-dev/safe-context";

type RootContextType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

export const RootContext = createSafeContext<RootContextType>();
