import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ApolloProvider } from '@apollo/client'
import Client from './services/server/ApolloClient.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={Client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
