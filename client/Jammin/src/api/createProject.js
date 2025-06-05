import { API_TOKEN, API_URL } from "../constants/constants"

const createProject = async (project) => {
  const url = `${API_URL}/projects`
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: project }),
    })
    return await response.json()
  } catch (error) {
    console.error('Error creating project:', error)
  }
}

export default createProject