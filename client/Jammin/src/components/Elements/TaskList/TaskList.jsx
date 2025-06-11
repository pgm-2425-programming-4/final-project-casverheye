import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import fetchTasks from "../../../api/fetchTasks";
import fetchStatuses from "../../../api/fetchStatuses";
import deleteTask from "../../../api/deleteTask";
import styles from './TaskList.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../General/Button";
import Modal from "../Modal";
import Form from "../Form/Form";
import { toast } from "react-toastify";

const TaskList = ({ projectId, projectName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: tasksData, isLoading: tasksLoading, isError: tasksError } = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => fetchTasks(1, 100, projectId),
    enabled: !!projectId
  });

  const { data: statusesData, isLoading: statusesLoading, isError: statusesError } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses
  });

  const { mutate: deleteTaskMutate } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Task deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
    onError: () => {
      toast.error("Failed to delete task.");
    },
  });

  const handleDelete = (task) => {
    deleteTaskMutate(task.documentId);
  };

  if (!projectId) return <div className="title is-1 pl-4">Select a project to see the tasks!</div>;
  if (tasksLoading || statusesLoading) return <div>Loading...</div>;
  if (tasksError || statusesError) return <div>Error loading data.</div>;

  const order = ["todo", "progress", "review", "done"];
  const statuses = (statusesData?.data || []).filter((status) => status.name.toLowerCase() !== "backlog").sort((a, b) => order.indexOf(a.name.toLowerCase()) - order.indexOf(b.name.toLowerCase()));

  const allowedStatuses = (statusesData?.data || []).filter((status) =>
    ["todo", "progress", "review", "done"].includes(status.name.toLowerCase())
  );

  const tasks = tasksData?.data || [];
  const tasksByStatus = {};
  statuses.forEach(status => {
    tasksByStatus[status.id] = tasks.filter(task => task.taskStatus?.id === status.id);
  });

  return (
    <section className={styles.tasks}>
      <div className={styles.addTaskFlex}>
        <h3 className="title">Tasks{projectName ? ` for ${projectName}` : ""}</h3>
        <Button
          variant="success"
          type="button"
          label={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Task"
      >
        <Form key={projectId} projectId={projectId} onSuccess={() => setIsModalOpen(false)} statusOptions={allowedStatuses}/>
      </Modal>
      <div className={styles.statusColumns}>
        {statuses.map((status) => (
          <div key={status.id} className={styles.statusColumn}>
            <h4 className="title is-4">{status.name}</h4>
            {tasksByStatus[status.id].length === 0 ? (
              <p>No tasks</p>
            ) : (
              tasksByStatus[status.id].map((task) => (
                <div key={task.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h4 className={`${styles.cardTitle} is-family-code`}>
                      {task.title}
                    </h4>
                    <div className={styles.btnFlex}>
                      <button
                        className={`button is-warning is-dark ${styles.smallButton}`}
                        // onClick={...}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} size="sm" />
                      </button>
                      <button
                        className={`button is-danger is-dark ${styles.smallButton}`}
                        onClick={() => handleDelete(task)}
                      >
                        <FontAwesomeIcon icon={faTrash} size="sm" />
                      </button>
                    </div>
                  </div>
                  <p className={`${styles.cardDescription} is-family-code`}>
                    {task.description}
                  </p>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TaskList;