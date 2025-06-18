import axios, { AxiosInstance, AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../state/RootReduceer';
import { api } from './config';

// Интерфейс для пользователя
interface User {
  userId: number;
  name: string;
  surname: string;
  patronymic: string;
  department: string;
  position: string;
  login: string;
  preferredLanguage: 'RUSSIAN' | 'ENGLISH' | null;
  addInfo: string;
  role: string;
}

// Создание экземпляра Axios
const apiClient: AxiosInstance = axios.create({
  baseURL: api, // Замените на реальный URL вашего API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Получение всех пользователей
async function getListUsers(jwt: string): Promise<User[]> {
  try {
    const response = await apiClient.get<User[]>('/api/admin',{
        headers: {
            Authorization: `Bearer ${jwt}`,
        }
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    throw error;
  }
}

// Удаление пользователя
async function deleteOneUser(userId: number,jwt:string): Promise<void> {
  try {
    await apiClient.delete(`/api/admin?userId=${userId}`,{
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
    console.log(`Пользователь с ID ${userId} успешно удален.`);
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
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

export { getListUsers, deleteOneUser, handleServerError };