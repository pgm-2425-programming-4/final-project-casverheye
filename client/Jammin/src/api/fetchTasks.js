import { API_TOKEN, API_URL } from '../constants/constants'

const fetchTasks = async (page, pageSize, projectId) => {
  let url = `${API_URL}/tasks?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=taskStatus`
  if (projectId) {
    url += `&filters[project][documentId][$eq]=${projectId}`
  }
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    })
    const tasks = await response.json()
    return tasks
  } catch (error) {
    console.error('Error fetching tasks:', error)
  }
}

export default fetchTasks
