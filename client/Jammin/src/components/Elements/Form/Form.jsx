import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify";
import createTask from "../../../api/createTask";
// import fetchStatuses from "../../../api/fetchStatuses";
import styles from './Form.module.css'

const Form = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    taskStatus: "i2af0ymgehck8quvm3w2orou",
  });

  const queryClient = useQueryClient()

  const {mutate, isLoading} = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      setTask({
        title: "",
        description: "",
        taskStatus: "i2af0ymgehck8quvm3w2orou",
      });
      
      queryClient.invalidateQueries({ queryKey: ["backlog"], exact: false });

      toast.success("Task added successfully!");
    },
    onError: () => {
      
    },
  });

  const handleChange = (e) => {
    setTask({...task, [e.target.name]:e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(task);
  };

  return (
    <form
      className={`is-family-code ${styles.form}`}
      onSubmit={handleSubmit}
    >
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

      <div className="field">
        <label className="label" htmlFor="taskStatus">
          Status:
        </label>
        <div className="control">
          <input
            className="input"
            type="text"
            id="taskStatus"
            name="taskStatus"
            value={task.taskStatus}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button
            className={`button is-primary ${styles.button}`}
            type="submit"
            disabled={isLoading}
          >
            Create
          </button>
        </div>
      </div>
    </form>
  );
};
export default Form;
