import axios from "axios";

const authAPI = axios.create({
  baseURL: "http://localhost:8080/api/auth"
});

export default authAPI;