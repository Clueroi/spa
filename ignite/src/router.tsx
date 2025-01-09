import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/home/home"
import { History } from "./pages/history/history"
import { DefaulLayout } from "./layouts/DefaultLayout"

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaulLayout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}