import { Route, Routes } from "react-router-dom"
import { MainLayout } from "../layout"
import { routes } from "../router"

function App() {
  return (
    <Routes>
      <Route element={
        <MainLayout />
      }>
        {routes.map(({ id, component: Component, path }) => (
          <Route
            key={id}
            path={path}
            element={<Component />}
          />
        ))}
      </Route>
    </Routes>
  )
}

export default App
