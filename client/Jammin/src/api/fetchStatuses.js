import { API_TOKEN, API_URL } from '../constants/constants'

const fetchStatuses = async () => {
  try {
    const response = await fetch(`${API_URL}/statuses`,{
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    })
    const statuses = await response.json()
    return statuses
  } catch (error) {
    console.error('Error fetching statuses:', error)
  }
}

export default fetchStatuses
