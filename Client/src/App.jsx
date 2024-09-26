import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { lazy, Suspense } from "react";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import NotFound from "./components/NotFound";

const Signin = lazy(() => import("./components/Signin"));
const Signup = lazy(() => import("./components/Signup"));
const Home = lazy(() => import("./components/Home"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const BookingForm = lazy(() => import("./components/BookingForm"));
const Admin = lazy(() => import("./components/AdminLogin"));
const BookingDetails = lazy(() => import("./components/BookingDetails"));

// export const myContext = createContext();

function App() {
  return (
    <>
      {/* <myContext.Provider> */}
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: "/dashboard",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AdminProtectedRoute
                  element={AdminDashboard}
                  allowedRoles={["Admin"]}
                />
              </Suspense>
            ),
          },
          {
            path: "/bookingform/:groundId",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AdminProtectedRoute
                  element={BookingForm}
                  allowedRoles={["User"]}
                />
              </Suspense>
            ),
          },

          {
            path: "Signin",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Signin />
              </Suspense>
            ),
          },
          {
            path: "Signup",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Signup />
              </Suspense>
            ),
          },
          {
            path: "admin",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Admin />
              </Suspense>
            ),
          },
          {
            path: "/404",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <NotFound />
              </Suspense>
            ),
          },
          {
            path: "*",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <NotFound />
              </Suspense>
            ),
          },
          {
            path: "/bookingdetails",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AdminProtectedRoute
                  element={BookingDetails}
                  allowedRoles={["Admin"]}
                />
              </Suspense>
            ),
          },
        ])}
      />
      {/* </myContext.Provider> */}
    </>
  );
}

export default App;
