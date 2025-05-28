import { createFileRoute } from "@tanstack/react-router";
import PaginatedBacklog from "../pages/PaginatedBacklog";

export const Route = createFileRoute("/backlog")({
  component: PaginatedBacklog,
});