import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Landing } from "./pages/Landing"
import { EditPage } from "./pages/EditPage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"


const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/edit", element: <EditPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
])

function App() {
  return (
    <div className="App" >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
