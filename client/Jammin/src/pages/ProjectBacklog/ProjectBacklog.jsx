import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import fetchProjects from "../../api/fetchProjects";
import BacklogList from "../../components/Elements/BacklogList";

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
      <h2 className="title is-1">
        {project ? `${project.name} Backlog` : "Project Backlog"}
      </h2>
      <BacklogList projectId={id} />
    </section>
  );
};

export default ProjectBacklog;