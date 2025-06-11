import { createFileRoute } from "@tanstack/react-router";
import ProjectBoard from "../../../pages/ProjectBoard";

export const Route = createFileRoute("/projects/$id/")({
  component: ProjectBoard,
});
