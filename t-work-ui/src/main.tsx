"use client";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientConfiguration } from './configurations/default-query-client.ts';
import TaskWorkProvider from './components/providers/task-work-provider.tsx';

const googleClientId: string = process.env.VITE_TASKWORK_GOOGLE_CLIENT_ID!;

const clientRecords: Record<"query-client" | "google-client", object> = {
  "google-client": { 
    clientId: googleClientId 
  },
  "query-client": QueryClientConfiguration
};

createRoot(document.getElementById('root')!)
.render(
  <StrictMode>
      <TaskWorkProvider clientRecords={clientRecords}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </TaskWorkProvider>
  </StrictMode>,
);
