import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import createTask from "../../../api/createTask";
import fetchStatuses from "../../../api/fetchStatuses";
import styles from "./Form.module.css";

const Form = ({ onSuccess, projectId, statusOptions }) => {
  console.log("Form projectId:", projectId);
  const { data, isLoading, error } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });

  const [task, setTask] = useState({
    title: "",
    description: "",
    taskStatus: "",
    project: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading: isMutating } = useMutation({
    mutationFn: createTask,
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

      toast.success("Task added successfully!");
      if (onSuccess) onSuccess();
    },
    onError: () => {},
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting with projectId:", projectId); // Debug
    const payload = {
      title: task.title,
      description: task.description,
      taskStatus: task.taskStatus,
      project: projectId,
    };
    console.log("Payload:", payload); // Debug
    mutate(payload);
  };

  return (
    <form className={`is-family-code ${styles.form}`} onSubmit={handleSubmit}>
      <input type="hidden" name="project" value={projectId} />
      <div>Debug: projectId = {projectId}</div>
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
                <option key={status.id} value={status.id}>
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
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;