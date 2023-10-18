import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

class ApiConnect {
	private api: AxiosInstance
	constructor() {
		this.api = axios.create({
			baseURL: import.meta.env.VITE_SERVER_URL,
		})

		this.api.interceptors.request.use(
			(config) => {
				const token = localStorage.getItem('authToken')
				if (token) {
					config.headers.Authorization = `Bearer ${token}`
				}
				return config
			},
			(err) => err
		)
	}

	protected async get(url: string, config?: AxiosRequestConfig) {
		return this.api.get(url, { ...config })
	}
	protected async post<TData>(url: string, data: TData, config?: AxiosRequestConfig) {
		return this.api.post(url, data, { ...config })
	}
	protected async put<TData>(url: string, data: TData, config?: AxiosRequestConfig) {
		return this.api.put(url, data, { ...config })
	}
	protected async delete(url: string, config?: AxiosRequestConfig) {
		return this.api.delete(url, { ...config })
	}
}

export { ApiConnect }
