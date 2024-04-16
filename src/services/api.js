import axios from "axios";
// Base URL da API https://api.themoviedb.org/3
// url da API /movie/300?api_key=5ded8601e8085b615f55a5db1203ff22

// Criando uma instância do axios com a baseURL da API
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default api;
