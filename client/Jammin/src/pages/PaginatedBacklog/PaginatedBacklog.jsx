import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PAGE_SIZE_OPTIONS } from '../../constants/constants'

import BacklogList from '../../components/Elements/BacklogList'
import Pagination from '../../components/Elements/Pagination'
import fetchTasks from '../../api/fetchTasks'

const PaginatedBacklog = () => {
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
    <section>
      <h2 className='title is-1'>Backlog</h2>
      <BacklogList tasks={tasks} />
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

export default PaginatedBacklog