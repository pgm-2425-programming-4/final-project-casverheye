import { API_TOKEN, API_URL } from '../constants/constants'

const updateTask = async (taskId, data) => {
  const url = `${API_URL}/tasks/${taskId}`
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })
    return await response.json()
  } catch (error) {
    console.error('Error updating task:', error)
  }
}

export default updateTask