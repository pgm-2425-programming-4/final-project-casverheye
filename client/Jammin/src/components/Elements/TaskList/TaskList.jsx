import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import fetchTasks from "../../../api/fetchTasks";
import fetchStatuses from "../../../api/fetchStatuses";
import deleteTask from "../../../api/deleteTask";
import updateTask from "../../../api/updateTask";
import styles from './TaskList.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../General/Button";
import Modal from "../Modal";
import Form from "../Form/Form";
import { toast } from "react-toastify";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TaskList = ({ projectId, projectName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
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

  const { mutate: updateTaskMutate } = useMutation({
    mutationFn: ({ taskId, newStatusId }) =>
      updateTask(taskId, { taskStatus: newStatusId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
    onError: () => {
      toast.error("Failed to update task status.");
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
    queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    if (type === "create") {
      toast.success("Task created successfully!");
    } else {
      toast.success("Task updated successfully!");
    }
  };

  if (!projectId) return <div className="title is-1 pl-4">Select a project to see the tasks!</div>;
  if (tasksLoading || statusesLoading) return <div>Loading...</div>;
  if (tasksError || statusesError) return <div>Error loading data.</div>;

  const order = ["todo", "progress", "review", "done"];
  const statuses = (statusesData?.data || [])
    .filter((status) => status.name.toLowerCase() !== "backlog")
    .sort((a, b) => order.indexOf(a.name.toLowerCase()) - order.indexOf(b.name.toLowerCase()));

  const allowedStatuses = (statusesData?.data || []).filter((status) =>
    ["todo", "progress", "review", "done"].includes(status.name.toLowerCase())
  );

  const tasks = tasksData?.data || [];
  const tasksByStatus = {};
  statuses.forEach(status => {
    tasksByStatus[status.id] = [];
  });
  tasks.forEach(task => {
    const statusId = task.taskStatus?.id;
    if (statusId && tasksByStatus[statusId]) {
      tasksByStatus[statusId].push(task);
    }
  });

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const status = statuses.find(s => String(s.id) === destination.droppableId);
    if (!status) return;
    updateTaskMutate({
      taskId: draggableId,
      newStatusId: status.documentId,
    });
  };

  return (
    <section className={styles.tasks}>
      <div className={styles.addTaskFlex}>
        <h3 className="title">
          Tasks{projectName ? ` for ${projectName}` : ""}
        </h3>
        <Button
          variant="success"
          type="button"
          label={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => {
            setEditTask(null);
            setIsModalOpen(true);
          }}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setEditTask(null);
          setIsModalOpen(false);
        }}
        title={editTask ? "Edit Task" : "Add Task"}
      >
        <Form
          key={editTask ? editTask.documentId : projectId}
          projectId={projectId}
          statusOptions={allowedStatuses}
          onSuccess={handleEditSuccess}
          initialTask={editTask}
        />
      </Modal>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.statusColumns}>
          {statuses.map((status) => (
            <Droppable droppableId={String(status.id)} key={String(status.id)}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={styles.statusColumn}
                  style={{
                    background: snapshot.isDraggingOver ? "#009e6d" : undefined,
                    transition: "background 0.2s",
                  }}
                >
                  <h4 className="title is-4">{status.name}</h4>
                  {tasksByStatus[status.id].length === 0 ? (
                    <p>No tasks</p>
                  ) : (
                    tasksByStatus[status.id].map((task, idx) => {
                      const taskId = String(task.documentId);
                      return (
                        <Draggable
                          key={taskId}
                          draggableId={taskId}
                          index={idx}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={styles.card}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? 0.7 : 1,
                                marginBottom: "0.5rem",
                              }}
                            >
                              <div className={styles.cardHeader}>
                                <h4
                                  className={`${styles.cardTitle} is-family-code`}
                                >
                                  {task.title}
                                </h4>
                                <div className={styles.btnFlex}>
                                  <button
                                    className={`button is-warning is-dark ${styles.smallButton}`}
                                    onClick={() => handleEdit(task)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faPenToSquare}
                                      size="sm"
                                    />
                                  </button>
                                  <button
                                    className={`button is-danger is-dark ${styles.smallButton}`}
                                    onClick={() => handleDelete(task)}
                                  >
                                    <FontAwesomeIcon icon={faTrash} size="sm" />
                                  </button>
                                </div>
                              </div>
                              <p
                                className={`${styles.cardDescription} is-family-code`}
                              >
                                {task.description}
                              </p>
                            </div>
                          )}
                        </Draggable>
                      );
                    })
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </section>
  );
};

export default TaskList;