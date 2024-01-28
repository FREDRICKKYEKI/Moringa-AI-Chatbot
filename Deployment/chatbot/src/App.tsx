import { Conversation } from "./components/Conversation";
import "./App.css";
import { ContextProvider } from "./contexts/AppContext";

function App() {
  return (
    <ContextProvider>
      <Conversation />
    </ContextProvider>
  );
}

export default App;
