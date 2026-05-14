import axios from "axios";

const productAPI = axios.create({
  baseURL: "http://localhost:8080/api/products"
});

export default productAPI;