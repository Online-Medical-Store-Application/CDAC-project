import axios from "axios";
import config from "../config";

export async function register(Name, email, password) {
  // body parameters
  const body = {
    Name,
    email,
    password,
  };

  // make API call
  const response = await axios.post(`${config.url}/user/register`, body);

  // read JSON data (response)
  return response.data;
}

export async function login(email, password) {
  // body parameters
  const body = {
    email,
    password,
  };

  try {
    // make API call
    const response = await axios.post(`${config.url}/user/login`, body);
    // read JSON data (response)
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    throw error;
  }
}
