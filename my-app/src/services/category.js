import axios from 'axios'
import config from '../config'

export async function getCategories() {
  // read the token from sessionStorage
  // const token = sessionStorage.token
  // const token = sessionStorage['token']
  const token = sessionStorage.getItem('token')

  const response = await axios.get(`${config.url}/category`, {
    headers: {
      token,
    },
  })
  return response.data
}
