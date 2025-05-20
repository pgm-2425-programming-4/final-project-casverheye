import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Backlog from './Backlog'
import Pagination from './Pagination'

const PAGE_SIZE_OPTIONS = [1, 2, 5, 10];
const TOKEN = import.meta.env.VITE_REACT_APP_STRAPI_TOKEN;

function fetchTasks(page, pageSize) {
  return fetch(
    `http://localhost:1337/api/tasks?populate=taskStatus&filters[taskStatus][name][$eq]=Backlog&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  ).then(res => res.json());
}

export default function PaginatedBacklog() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[2])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['backlog', page, pageSize],
    queryFn: () => fetchTasks(page, pageSize),
    keepPreviousData: true,
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading backlog.</p>

  const tasks = data?.data || []
  const pagination = data?.meta?.pagination || {}

  return (
    <section className='container'>
      <h2 className='title is-1'>Backlog</h2>
      <Backlog tasks={tasks} />
      <Pagination
        currentPage={pagination.page}
        pageCount={pagination.pageCount}
        onPageChanged={setPage}
        pageSize={pageSize}
        onPageSizeChange={size => {
          setPageSize(size)
          setPage(1)
        }}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
      />
    </section>
  );
}