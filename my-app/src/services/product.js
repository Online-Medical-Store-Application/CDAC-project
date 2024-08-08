import axios from "axios";
import config from "../config";

export async function getProperties() {
  // read the token from sessionStorage
  // const token = sessionStorage.token
  // const token = sessionStorage['token']
  const token = sessionStorage.getItem("token");

  const response = await axios.get(`${config.url}/product`, {
    headers: {
      token,
    },
  });
  return response.data;
}

export async function getProductDetails(id) {
  const token = sessionStorage.getItem("token");

  const response = await axios.get(`${config.url}/product/details/${id}`, {
    headers: {
      token,
    },
  });
  return response.data;
}

export async function addProduct() {
  // read the token from sessionStorage
  // const token = sessionStorage.token
  // const token = sessionStorage['token']
  const token = sessionStorage.getItem("token");

  const body = {
    
  };

  const response = await axios.post(`${config.url}/product`, body, {
    headers: {
      token,
    },
  });
  return response.data;
}
