import Shop from "./pages/shop/Shop"
import { Route, Routes } from "react-router-dom"

export default function App() {
  return(
    <Routes>
      <Route index element = {<Shop />} />
    </Routes>
  )
}