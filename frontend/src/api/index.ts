import axios from 'axios'

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const auth = {
  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data)
    return response.data
  },
  register: async (data: {
    email: string
    password: string
    nickname?: string
  }) => {
    const response = await api.post('/auth/register', data)
    return response.data
  },
}

export const posts = {
  getAll: async (params?: any) => {
    const response = await api.get('/posts', { params })
    return response.data
  },
  getOne: async (id: number) => {
    const response = await api.get(`/posts/${id}`)
    return response.data
  },
  create: async (data: any) => {
    const response = await api.post('/posts', data)
    return response.data
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/posts/${id}`, data)
    return response.data
  },
  delete: async (id: number) => {
    const response = await api.delete(`/posts/${id}`)
    return response.data
  },
}

export const users = {
  getProfile: async () => {
    const response = await api.get('/users/profile')
    return response.data
  },
  updateProfile: async (data: any) => {
    const response = await api.put('/users/profile', data)
    return response.data
  },
}

export const comments = {
  getByPost: async (postId: number) => {
    const response = await api.get(`/comments`, { params: { postId } })
    return response.data
  },
  create: async (data: { postId: number; content: string; parentId?: number }) => {
    const response = await api.post('/comments', data)
    return response.data
  },
  delete: async (id: number) => {
    const response = await api.delete(`/comments/${id}`)
    return response.data
  },
}

export default api