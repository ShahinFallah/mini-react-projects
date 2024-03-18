import Shop from "./pages/shop/Shop"
import { Route, Routes } from "react-router-dom"
import { CartProvider } from "./components/context/ConText"

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route index element={<Shop />} />
      </Routes>
    </CartProvider>
  )
}