import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from '@/components/providers/ErrorBoundary';
import { queryClient } from '@/lib/query-client';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App;