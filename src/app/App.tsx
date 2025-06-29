import { Route, Routes } from "react-router-dom"
import { MainLayout } from "../layout"
import { routes } from "../router"
import { Auth } from "../pages/Auth"
import { AuthProvider } from "../context/AuthContex"
import { useMemo } from "react"
import ProtectedRoute from "../router/ProtectedRoute/ProtectedRoute"

function App() {

  const protectedRoute = useMemo(
    () => (
      <Route element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        {routes.map(({ id, component: Component, path }) => (
          <Route
            key={id}
            path={path}
            element={<Component />}
          />
        ))}
      </Route>
    ),[]
  )

  return (
    <AuthProvider>
      <Routes>
        {protectedRoute}
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </AuthProvider>
  )
}




export default App
