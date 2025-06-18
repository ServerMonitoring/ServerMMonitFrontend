import axios, { AxiosInstance, AxiosError } from 'axios';
import { api } from './config';

// Интерфейсы для запроса и ответа
interface CreateServerRequest {
  address: string;
  addInfo: string;
  serverName: string;
}

interface CreateServerResponse {
  token: string;
}

// Создание экземпляра Axios
const apiClient: AxiosInstance = axios.create({
  baseURL: api, // Замените на реальный URL вашего API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Функция для создания сервера
async function createServer(serverData: CreateServerRequest,jwt:string): Promise<CreateServerResponse> {
  try {
    const response = await apiClient.post<CreateServerResponse>(
      '/api/server/create',
      serverData,
        {
        headers: {
            Authorization: `Bearer ${jwt}`,
        }
    }
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании сервера:', error);
    throw error;
  }
}
async function getmininfoServer(jwt:string) {
  try {
    const response = await apiClient.post(
      '/api/server/min_info',{},
        {
        headers: {
            Authorization: `Bearer ${jwt}`,
        }
    }
    );
    console.log(response)
    return response;
  } catch (error) {
    console.error('Ошибка при создании сервера:', error);
    throw error;
  }
}

// Обработка ошибок
async function handleServerError<T>(promise: Promise<T>) {
  try {
    return await promise;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response) {
        console.error('Ошибка сервера:', axiosError.response.data?.message || 'Неизвестная ошибка');
      } else {
        console.error('Ошибка сети:', axiosError.message);
      }
    } else {
      console.error('Неизвестная ошибка:', error);
    }
    throw error;
  }
}

export { createServer, handleServerError,getmininfoServer };