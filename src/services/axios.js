import axios from 'axios'

const token = localStorage.getItem('token');

const instance = axios.create({
  baseURL: 'https://blog.kata.academy/api/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
})

export default instance
