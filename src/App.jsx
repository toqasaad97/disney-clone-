import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Layout from "./Components/Layout";
import { Provider } from "react-redux";
import store from "./app//store";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <  Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/nav",
        element: <Navbar />,
      },
    ]
  },


]);

function App() {
  return (
    <>
<Provider store={store}>
<QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
</Provider>

    </>
  );
}

export default App;
