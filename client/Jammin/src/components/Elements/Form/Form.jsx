import { useState, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import createTask from "../../../api/createTask";
import updateTask from "../../../api/updateTask";
import fetchStatuses from "../../../api/fetchStatuses";
import styles from "./Form.module.css";

const Form = ({ onSuccess, projectId, statusOptions, initialTask }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });

  const [task, setTask] = useState({
    title: "",
    description: "",
    taskStatus: "",
    project: projectId,
  });

  useEffect(() => {
    if (initialTask) {
      setTask({
        title: initialTask.title,
        description: initialTask.description,
        taskStatus: initialTask.taskStatus?.documentId || "",
        project: projectId,
      });
    } else {
      setTask({
        title: "",
        description: "",
        taskStatus: "",
        project: projectId,
      });
    }
  }, [initialTask, projectId]);

  const queryClient = useQueryClient();

  const { mutate, isLoading: isMutating } = useMutation({
    mutationFn: (payload) =>
      initialTask
        ? updateTask(initialTask.documentId, payload)
        : createTask(payload),
    onSuccess: () => {
      setTask({
        title: "",
        description: "",
        taskStatus: "",
        project: "",
      });

      queryClient.invalidateQueries({ queryKey: ["backlog"] });
      if (projectId) {
        queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
      }

      if (onSuccess) onSuccess(initialTask ? "update" : "create");
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: task.title,
      description: task.description,
      taskStatus: task.taskStatus,
      project: projectId,
    };
    mutate(payload);
  };

  return (
    <form className={`is-family-code ${styles.form}`} onSubmit={handleSubmit}>
      <input type="hidden" name="project" value={projectId} />
      <div className="field">
        <label className="label" htmlFor="title">
          Title:
        </label>
        <div className="control">
          <input
            className="input"
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="description">
          Description:
        </label>
        <div className="control">
          <input
            className="input"
            type="text"
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className={styles.flex}>
        <div className="field">
          <label className="label" htmlFor="taskStatus">
            Status:
          </label>
          <div className={`select is-link ${styles.select}`}>
            <select
              id="taskStatus"
              name="taskStatus"
              value={task.taskStatus}
              onChange={handleChange}
              required
              disabled={isLoading}
            >
              <option value="" disabled>
                Select status
              </option>
              {statusOptions?.map((status) => (
                <option key={status.documentId} value={status.documentId}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button
              className={`button is-primary ${styles.button}`}
              type="submit"
              disabled={isMutating || isLoading}
            >
              {initialTask ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;