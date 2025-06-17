import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { PAGE_SIZE_OPTIONS } from "../../constants/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./PaginatedBacklog.module.css";

import fetchTasks from "../../api/fetchTasks";
import fetchStatuses from "../../api/fetchStatuses";
import deleteTask from "../../api/deleteTask";
import BacklogList from "../../components/Elements/BacklogList";
import Pagination from "../../components/Elements/Pagination";
import Button from "../../components/General/Button";
import Form from "../../components/Elements/Form/Form";
import Modal from "../../components/Elements/Modal";

const PaginatedBacklog = ({ projectId }) => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[3]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const { data: statusesData, isLoading: statusesLoading } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });

  const allStatuses = statusesData?.data?.filter((s) =>
    ["backlog", "todo", "progress", "review", "done"].includes(
      s.name.toLowerCase()
    )
  ) || [];

  const backlogStatus = allStatuses.find(
    (status) => status.name.toLowerCase() === "backlog"
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["backlog", projectId, page, pageSize],
    queryFn: () =>
      fetchTasks(page, pageSize, projectId, backlogStatus?.documentId),
    enabled: !!projectId && !!backlogStatus,
    keepPreviousData: true,
  });

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
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setIsModalOpen(true);
  };

  const handleEditSuccess = (type) => {
    setIsModalOpen(false);
    setEditTask(null);
    queryClient.invalidateQueries({ queryKey: ["backlog"] });
    if (type === "create") {
      toast.success("Task created successfully!");
    } else {
      toast.success("Task updated successfully!");
    }
  };

  if (isLoading || statusesLoading) return <p>Loading...</p>;
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
          onClick={() => {
            setEditTask(null);
            setIsModalOpen(true);
          }}
        />
        <Modal
          isOpen={isModalOpen}
          title={editTask ? "Edit Task" : "Add a task to your Backlog"}
          onClose={() => {
            setEditTask(null);
            setIsModalOpen(false);
          }}
        >
          <Form
            projectId={projectId}
            onSuccess={handleEditSuccess}
            statusOptions={
              editTask
                ? allStatuses
                : backlogStatus
                ? [backlogStatus]
                : []
            }
            initialTask={editTask}
          />
        </Modal>
      </div>
      <BacklogList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />
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