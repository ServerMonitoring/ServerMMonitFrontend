import { useSelector } from "react-redux";
import { api } from "./config"
import axios, { AxiosInstance, AxiosError } from 'axios';
import { RootState } from "../state/RootReduceer";

// Определение интерфейсов
interface SignUpRequest {
  name: string;
  surname: string;
  patronymic: string;
  department: string;
  position: string;
  login: string;
  password: string;
  role: string;
  addInfo: string;
}

interface SignInRequest {
  login: string;
  password: string;
}

interface SignUpResponse {
  message: string;
}

interface SignInResponse {
  token: string;
}

// Создание экземпляра Axios
const apiClient: AxiosInstance = axios.create({
  baseURL: api,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Функция регистрации
async function signUp(userData: SignUpRequest,jwt:string): Promise<SignUpResponse> {
  try {
    const response = await apiClient.post<SignUpResponse>('/auth/sign_up', userData,{        headers: {
            Authorization: `Bearer ${jwt}`
        }
    }
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    throw error;
  }
}

// Функция входа
async function signIn(credentials: SignInRequest): Promise<SignInResponse> {
  try {
    const response = await apiClient.post<SignInResponse>('/auth/sign_in', credentials);
    console.log(response.data)
    
    return response.data;
  } catch (error) {
    console.error('Ошибка при входе:', error);
    throw error;
  }
}

export { signUp, signIn };