import { QueryClient, QueryClientProvider } from "react-query";
import Form from "./Form";
import Home from "./Home";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <Home />
        <Form />
      </div>
    </QueryClientProvider>
  );
};

export default App;
