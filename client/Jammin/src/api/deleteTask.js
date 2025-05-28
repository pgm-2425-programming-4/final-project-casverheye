import { API_TOKEN, API_URL } from '../constants/constants'

const deleteTask = async (taskId) => {
  const url = `${API_URL}/tasks/${taskId}`
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    })
    return
  } catch (error) {
    console.error('Error deleting task:', error)
  }
}

export default deleteTask