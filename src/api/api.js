import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

export const getSnacks = () => API.get("/snacks");
export const getStudents = () => API.get("/students");
export const getStudentById = (id) => API.get(`/students/${id}`);
export const createStudent = (data) => API.post("/students", data);
export const createOrder = (data) => API.post("/orders", data);
export const getOrders = () => API.get("/orders");