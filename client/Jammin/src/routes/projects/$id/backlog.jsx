import { createFileRoute } from "@tanstack/react-router";
import ProjectBacklog from "../../../pages/ProjectBacklog";

export const Route = createFileRoute("/projects/$id/backlog")({
  component: ProjectBacklog,
});