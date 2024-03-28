import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { TaskManagerContextProvider } from './components/context/todoContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TaskManagerContextProvider>
      <App />
    </TaskManagerContextProvider>
  </React.StrictMode>
)
