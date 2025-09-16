import axios, { AxiosInstance } from 'axios'

export class ApiService {
  private static instance: ApiService
  private api: AxiosInstance

  private constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    })

    // 添加请求拦截器
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth-storage')
      if (token) {
        const authData = JSON.parse(token)
        config.headers.Authorization = `Bearer ${authData.state.token}`
      }
      return config
    })
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }
    return ApiService.instance
  }

  // 认证相关API
  async login(email: string, password: string) {
    const response = await this.api.post('/auth/login', { email, password })
    return response.data
  }

  async register(email: string, password: string, nickname: string) {
    const response = await this.api.post('/auth/register', {
      email,
      password,
      nickname,
    })
    return response.data
  }

  // 文章相关API
  async getPosts(page = 1, limit = 10) {
    const response = await this.api.get('/posts', {
      params: { page, limit },
    })
    return response.data
  }

  async getPost(id: number) {
    const response = await this.api.get(`/posts/${id}`)
    return response.data
  }

  async createPost(data: { title: string; content: string }) {
    const response = await this.api.post('/posts', data)
    return response.data
  }

  async updatePost(id: number, data: { title: string; content: string }) {
    const response = await this.api.put(`/posts/${id}`, data)
    return response.data
  }

  async deletePost(id: number) {
    const response = await this.api.delete(`/posts/${id}`)
    return response.data
  }

  // 评论相关API
  async getComments(postId: number) {
    const response = await this.api.get(`/posts/${postId}/comments`)
    return response.data
  }

  async createComment(postId: number, content: string) {
    const response = await this.api.post(`/posts/${postId}/comments`, { content })
    return response.data
  }

  // 用户相关API
  async updateProfile(data: {
    nickname?: string
    avatar?: string
    password?: string
  }) {
    const response = await this.api.put('/users/profile', data)
    return response.data
  }

  async getProfile() {
    const response = await this.api.get('/users/profile')
    return response.data
  }
}