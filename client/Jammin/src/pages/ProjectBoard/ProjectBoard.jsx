import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import fetchProjects from "../../api/fetchProjects";
import TaskList from "../../components/Elements/TaskList";
import { Link } from "@tanstack/react-router";

const ProjectBoard = () => {
  const { id } = useParams({ strict: false });
  // console.log("ProjectBoard id param:", id);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading project.</p>;

  const project = data?.data?.find((p) => p.documentId === id);

  return (
    <section>
      <div className="mb-4 is-flex is-justify-content-space-between is-align-items-center">
        <h2 className="title is-1">
          {project ? project.name : "Project Not Found"}
        </h2>
        {project && (
          <Link
            to={`/projects/${project.documentId}/backlog`}
            className="button is-link is-family-code"
          >
            {project.name} Backlog
          </Link>
        )}
      </div>
      <TaskList projectId={id} projectName={project?.name} />
    </section>
  );
};

export default ProjectBoard;