import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PaginatedBacklog from './pages/PaginatedBacklog'
import Header from './components/Elements/Header'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="container">
        <Header />
        <PaginatedBacklog />
      </main>
    </QueryClientProvider>
  );
}

export default App