import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

class ApiConnect {
	protected api: AxiosInstance
	constructor(path: string) {
		this.api = axios.create({
			baseURL: `${import.meta.env.VITE_SERVER_URL}/${path}`,
		})

		this.api.interceptors.request.use(
			(config) => {
				const token = localStorage.getItem('token')
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

	protected async post<TData, TDataFormat = unknown>(
		url: string,
		data: TData,
		config?: AxiosRequestConfig
	) {
		return this.api.post(url, data, { ...config }) as Promise<AxiosResponse<TDataFormat>>
	}
	protected async put<TData>(url: string, data: TData, config?: AxiosRequestConfig) {
		return this.api.put(url, data, { ...config })
	}
	protected async delete(url: string, config?: AxiosRequestConfig) {
		return this.api.delete(url, { ...config })
	}
}

export { ApiConnect }
