import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { ConversationProps } from "../utils";

const AppContext = createContext<{
  conversation: ConversationProps[];
  setConversation: Dispatch<SetStateAction<ConversationProps[]>>;
}>({
  conversation: [],
  setConversation: () => {},
});

export function useAppContext() {
  return useContext(AppContext);
}

export function ContextProvider({ children }: any) {
  const [conversation, setConversation] = useState<ConversationProps[]>([
    {
      id: crypto.randomUUID(),
      text: "Hello, I'm <b>Tawi</b> the chatbot. Ask me anything!",
      author: "bot",
      time: new Date(),
    },
  ]);

  const value = {
    conversation,
    setConversation,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
