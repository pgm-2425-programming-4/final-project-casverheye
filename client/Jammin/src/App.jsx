import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PaginatedBacklog from './pages/PaginatedBacklog'
import Header from './components/Elements/Header'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="container">
        <Header />
        <PaginatedBacklog />
        <ToastContainer position='top-center'/>
      </main>
    </QueryClientProvider>
  );
}

export default App