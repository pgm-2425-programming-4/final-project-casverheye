import { useParams, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import fetchProjects from "../../api/fetchProjects";
import PaginatedBacklog from "../PaginatedBacklog/PaginatedBacklog";

const ProjectBacklog = () => {
  const { id } = useParams({ strict: false });

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
          {project ? `${project.name} Backlog` : "Project Backlog"}
        </h2>
        <Link to={`/projects/${id}`} className="button is-link is-family-code">
          ← Back to Project
        </Link>
      </div>
      <PaginatedBacklog projectId={id} />
    </section>
  );
};

export default ProjectBacklog;