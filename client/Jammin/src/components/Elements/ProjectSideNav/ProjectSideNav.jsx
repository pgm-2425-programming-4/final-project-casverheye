import { useQuery } from "@tanstack/react-query";
import fetchProjects from "../../../api/fetchProjects";
import styles from "./ProjectSideNav.module.css";

const ProjectSideNav = ({selectedProjectId, onSelect}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  if (isLoading) return <div>Loading projects...</div>;
  if (isError) return <div>Error loading projects.</div>;

  return (
    <nav>
      <h3 className="title">Projects</h3>
      <ul>
        {data?.data?.map((project) => (
          <li key={project.id}>
            <button
              className={`title is-5 is-family-code ${styles.button} ${ selectedProjectId === project.documentId ? styles.active : ""}`}
              onClick={() => onSelect(project)}
            >
              {project.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ProjectSideNav;