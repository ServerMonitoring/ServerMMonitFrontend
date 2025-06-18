import axios, { AxiosInstance, AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../state/RootReduceer';
import { api } from './config';

// Определение интерфейсов
interface UserProfileResponse {
  name: string;
  surname: string | null;
  patronymic: string | null;
  department: string;
  position: string;
  login: string;
  preferredLanguage: 'RUSSIAN' | 'ENGLISH' | null;
  addInfo: string | null;
  jwt: string | null;
}

interface UpdateUserProfileRequest {
  name: string;
  surname: string;
  patronymic: string;
  department: string;
  position: string;
  login: string;
  password: string;
  preferredLanguage: 0 | 1; // 0 - русский, 1 - английский
  addInfo: string;
}

interface UpdateUserProfileResponse {
  name: string;
  surname: string;
  patronymic: string;
  department: string;
  position: string;
  login: string;
  preferredLanguage: 'RUSSIAN' | 'ENGLISH';
  role: string;
  addInfo: string;
  jwt: string | null;
}
// Создание экземпляра Axios
const apiClient: AxiosInstance = axios.create({
  baseURL: api,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Получение профиля пользователя
async function getUserProfile(jwt: string): Promise<UserProfileResponse> {
  try {
    const response = await apiClient.get<UserProfileResponse>('/api/user',{
        headers: {
            Authorization: `Bearer ${jwt}`,
        }
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении профиля:', error);
    throw error;
  }
}

// Обновление профиля пользователя
async function updateUserProfile(
  updatedData: UpdateUserProfileRequest
): Promise<UpdateUserProfileResponse> {
  try {
    const response = await apiClient.post<UpdateUserProfileResponse>(
      '/api/user',
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка при обновлении профиля:', error);
    throw error;
  }
}

// Удаление пользователя
async function deleteUser(): Promise<void> {
  try {
    await apiClient.delete('/api/user');
    console.log('Пользователь успешно удален.');
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    throw error;
  }
}

export { getUserProfile, updateUserProfile, deleteUser }; 