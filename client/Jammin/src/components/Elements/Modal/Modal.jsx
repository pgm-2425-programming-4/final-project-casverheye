import Button from "../../General/Button";
import styles from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Form from "../Form";

const Modal = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <h2 className="title is-family-code">{title}</h2>
          <Button
            label={<FontAwesomeIcon icon={faCircleXmark} />}
            onClick={onClose}
          />
        </div>
        <Form />
      </div>
    </div>
  );
};
export default Modal;
