import { API_TOKEN, API_URL } from "../constants/constants"

const createTask = async (task) => {
  const url = `${API_URL}/tasks`
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: task }),
    })
    return await response.json()
  } catch (error) {
    console.error('Error posting tasks:', error)
  }
}

export default createTask