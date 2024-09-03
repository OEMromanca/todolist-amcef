import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

interface ErrorResponse {
  message?: string;
  errors?: { [key: string]: string[] };
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    console.log('Sending request to:', config.url);
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    console.log('Received response from:', response.config.url);
    return response;
  },
  (error: AxiosError<ErrorResponse>): Promise<AxiosError<ErrorResponse>> => {
    const errorMessage =
      error.response?.data?.message ||
      'An error occurred. Please try again later.';

    console.error(errorMessage);

    return Promise.reject(error);
  }
);

export default axiosInstance;
