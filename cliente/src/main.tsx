import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layouts/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {router} from './app/router/Routes'
import { RouterProvider } from 'react-router';
import { store,StoreContext } from './lib/stores/store';


const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <QueryClientProvider client={queryClient}>

        <ReactQueryDevtools/>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StoreContext.Provider>


  </StrictMode>,
)
