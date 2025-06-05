import { API_TOKEN, API_URL } from "../constants/constants";

const deleteProject = async (projectId) => {
  const url = `${API_URL}/projects/${projectId}`;
  try {
    await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
  } catch (error) {
    console.error("Error deleting project:", error);
  }
};

export default deleteProject;