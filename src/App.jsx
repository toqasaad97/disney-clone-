import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "./app/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = React.lazy(() => import("./Components/Login"));
const Navbar = React.lazy(() => import("./Components/Navbar"));
const Layout = React.lazy(() => import("./Components/Layout"));
const Home = React.lazy(() => import("./Components/Home"));
const Detail = React.lazy(() => import("./Components/Detail"));
const Loader = React.lazy(() => import("./Components/Loader"));

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/nav",
        element: <Navbar />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/detail/:id",
        element: <Detail />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
