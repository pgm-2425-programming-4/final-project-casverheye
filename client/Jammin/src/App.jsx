import PaginatedBacklog from './PaginatedBacklog'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <PaginatedBacklog />
      </main>
    </QueryClientProvider>
  )
}

export default App