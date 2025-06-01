import { API_TOKEN, API_URL } from '../constants/constants';

const fetchProjects = async () => {
  const response = await fetch(`${API_URL}/projects`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` }
  });
  return await response.json();
};

export default fetchProjects;