import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import fetchTasks from "../../../api/fetchTasks";
import styles from './TaskList.module.css'

const TaskList = ({ projectId, projectName }) => {
  // Fetch all tasks with default pagination (page 1, 10 per page)
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => fetchTasks(1, 10, projectId),
    enabled: !!projectId
  });

  if (!projectId) return <div className="title is-1 pl-4">Select a project to see the tasks!</div>;
  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error loading tasks.</div>;

  return (
    <section className={styles.tasks}>
      <h3 className="title">Tasks{projectName ? ` for ${projectName}` : ""}</h3>
      <div className={styles.cardList}>
        {data?.data?.map((task) => (
          <div key={task.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h4 className={`${styles.cardTitle} is-family-code`}>
                {task.title}
              </h4>
              <div className={styles.btnFlex}>
                <button
                  className={`button is-warning is-dark ${styles.smallButton}`}
                >
                  <FontAwesomeIcon icon={faPenToSquare} size="sm" />
                </button>
                <button
                  className={`button is-danger is-dark ${styles.smallButton}`}
                >
                  <FontAwesomeIcon icon={faTrash} size="sm" />
                </button>
              </div>
            </div>
            <p className={`${styles.cardDescription} is-family-code`}>
              {task.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TaskList;