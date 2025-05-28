import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { PAGE_SIZE_OPTIONS } from "../../constants/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./PaginatedBacklog.module.css";


import fetchTasks from "../../api/fetchTasks";
import deleteTask from "../../api/deleteTask";
import BacklogList from "../../components/Elements/BacklogList";
import Pagination from "../../components/Elements/Pagination";
import Button from "../../components/General/Button";
import Modal from "../../components/Elements/Modal";

const PaginatedBacklog = () => {

  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[4]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: deleteTaskMutate } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Task deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["backlog"] });
    },
    onError: () => {
      toast.error("Failed to delete task.");
    },
  });

  const handleDelete = (task) => {
    deleteTaskMutate(task.documentId);
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["backlog", page, pageSize],
    queryFn: () => fetchTasks(page, pageSize),
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading backlog.</p>;

  const tasks = data?.data || [];
  const pagination = data?.meta?.pagination || {};

  return (
    <section>
      <div className={styles.PaginatedBacklog}>
        <h2 className="title is-1">Backlog</h2>
        <Button
          variant={"success"}
          label={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => setIsModalOpen(true)}
        />
        <Modal
          isOpen={isModalOpen}
          title={"Add a task to your Backlog"}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      </div>
      <BacklogList tasks={tasks} onDelete={handleDelete} />
      <Pagination
        currentPage={pagination.page}
        pageCount={pagination.pageCount}
        onPageChanged={setPage}
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
      />
    </section>
  );
};

export default PaginatedBacklog;
