import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import fetchProjects from "../../../api/fetchProjects";
import createProject from "../../../api/createProject";
import deleteProject from "../../../api/deleteProject";
import styles from "./ProjectSideNav.module.css";
import Button from "../../General/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectSideNav = ({ selectedProjectId, onSelect }) => {
  const queryClient = useQueryClient();
  const [newProjectName, setNewProjectName] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const { mutate: addProject, isLoading: isAdding } = useMutation({
    mutationFn: (project) => createProject(project),
    onSuccess: () => {
      setNewProjectName("");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project added successfully!");
    },
  });

  const { mutate: removeProject, isLoading: isDeleting } = useMutation({
    mutationFn: (projectId) => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete project.");
    }
  });

  const handleAddProject = (e) => {
    e.preventDefault();
    if (newProjectName.trim()) {
      addProject({ name: newProjectName.toUpperCase() });
    }
  };

  return (
    <nav>
      <h3 className="title is-1">Projects</h3>
      <form onSubmit={handleAddProject} className={styles.form}>
        <input
          type="text"
          className="is-family-code "
          placeholder="New project name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          disabled={isAdding}
          required
        />
        <Button
          variant="success"
          type="submit"
          disabled={isAdding}
          label={<FontAwesomeIcon icon={faPlus} />}
        />
      </form>
      <ul className={styles.ul}>
        {data?.data?.map((project) => (
          <li key={project.id} className={styles.li}>
            <Link
              to={`/projects/${project.documentId}`}
              className={`title is-5 is-family-code ${styles.button} ${selectedProjectId === project.documentId ? styles.active : ""}`}
            >
              {project.name}
            </Link>
            <Link
              to={`/projects/${project.documentId}/backlog`}
              className={`${styles.backlogBtn} button is-link is-family-code`}
            >
              Backlog
            </Link>
            <button
              className="button is-danger is-dark"
              type="button"
              disabled={isDeleting}
              onClick={() => removeProject(project.documentId)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ProjectSideNav;