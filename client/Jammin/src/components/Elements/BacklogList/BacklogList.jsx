import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from './BacklogList.module.css'

const BacklogList = ({ tasks, onDelete }) => {
  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th className="title pl-3">Title</th>
          <th className="title pl-3">Description</th>
          <th className="title pl-3">Status</th>
          <th className="title pl-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td className="is-family-code">{task.title}</td>
            <td className="is-family-code">{task.description}</td>
            <td className="is-family-code">{task.taskStatus?.name}</td>
            <td className={styles.actions}>
              <button className="button is-warning is-dark"><FontAwesomeIcon icon={faPenToSquare} /></button>
              <button className="button is-danger is-dark" onClick={() => onDelete(task)}><FontAwesomeIcon icon={faTrash} /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BacklogList;
