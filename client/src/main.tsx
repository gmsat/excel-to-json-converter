import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { MyContextProvider } from "./context/my-context/MyContextProvider";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MyContextProvider>
      <App/>
    </MyContextProvider>
  </React.StrictMode>,
)
