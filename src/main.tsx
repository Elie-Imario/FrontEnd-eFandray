import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ApolloProvider } from '@apollo/client'
import Client from './services/server/ApolloClient.ts'
import AppProvider from './services/context/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={Client}>
      <AppProvider>
        <App />
      </AppProvider>
    </ApolloProvider>
  </React.StrictMode>,
)
