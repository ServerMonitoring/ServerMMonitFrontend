import axios, { AxiosInstance } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../state/RootReduceer';
import { api } from './config';

// Базовые интерфейсы
interface BaseCriteria {
  id?: number; // ID записи (необязательно)
  distinct?: boolean; // Сортировка по возрастанию/убыванию (необязательно)
  sortBy?: string; // Поле для сортировки (необязательно)
}

interface MetricTimeCriteria {
  startTime?: string; // Начало временного диапазона (необязательно)
  endTime?: string; // Конец временного диапазона (необязательно)
  currentTime?: string; // Текущее время (необязательно)
  metricId?: number; // ID метрики (необязательно)
  serverID: number; // ID сервера (обязательно)
}

// Интерфейсы для запросов
interface MetricRequest {
  baseCriteria?: BaseCriteria;
  metricTimeCriteria: MetricTimeCriteria;
}

interface StaticMetricRequest {
  userId: number;
  hostname: string;
  osInfo: string;
  address: string;
  addInfo: string;
  online: boolean;
  cpuModel: string;
  cpuCountCores: number;
  cpuCountCoresPhysical: number;
  minFreq: number;
  maxFreq: number;
}

interface DiskMetricRequest extends MetricRequest {
  device?: string;
  mountpoint?: string;
}

interface DiskIORequest extends MetricRequest {
  driveName?: string;
}

interface GpuMetricRequest extends MetricRequest {
  gpuName?: string;
}

// Интерфейсы для ответов
interface MetricResponse {
  id: number;
  timestamp: string;
  uptime: number | null;
  netSent: number | null;
  netRecv: number | null;
  netErrors: number | null;
  netDrops: number | null;
  failedLogins: number | null;
  activeConnections: number | null;
  diskTotalUsedPercent: number | null;
  diskTotalAvailable: number | null;
}

interface StaticMetricResponse {
  cpuModel: string;
  cpuCountCores: number;
  cpuCountCoresPhysical: number;
  minFreq: number;
  maxFreq: number;
}

interface MemoryMetricResponse {
  id: number;
  memoryTotal: number;
  memoryUsed: number;
  memoryFree: number;
  memoryCached: number;
  memoryUsedPercent: number;
}

interface SwapMetricResponse {
  id: number;
  swapTotal: number;
  swapUsed: number;
  swapFree: number;
  swapPercentUsed: number;
}

interface CpuMetricResponse {
  id: number;
  cpuPercentTotalLoad: number;
  cpuTimeUser: number;
  cpuTimeSystem: number;
  cpuTimeIdle: number;
  cpuTimeInterrupt: number;
  cpuTimeDpc: number;
  ctxSwitches: number;
  interrupts: number;
  softInterrupts: number;
  syscalls: number;
  currentFreq: number;
  cores: { coreIndex: number; corePercentLoad: number }[];
}

interface NetworkConnectionMetricResponse {
  id: number;
  tcp: number;
  udp: number;
}

interface NetInterfaceMetricResponse {
  id: number;
  interfaceName: string | null;
  sent: number;
  recv: number;
  packetsSent: number;
  packetsRecv: number;
  errIn: number;
  errOut: number;
  dropIn: number;
  dropOut: number;
}

interface DiskMetricResponse {
  id: number;
  device: string;
  mountpoint: string;
  diskTotal: number;
  diskUsed: number;
  diskFree: number;
  diskUsedPercent: number;
  timestamp: string;
  serverId: number;
}

interface DiskIOMetricResponse {
  id: number;
  driveName: string;
  readCount: number;
  writeCount: number;
  read: number;
  write: number;
}

interface GpuMetricResponse {
  gpuName: string;
  loadPercent: number;
  memoryTotal: number;
  memoryUsed: number;
  memoryFree: number;
  memoryUsedPercent: number;
  temperature: number;
}

// Класс для работы с метриками
    const apiClient = axios.create({
      baseURL: api,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  // Получение всех метрик
  export async function getMetrics(request: MetricRequest): Promise<MetricResponse[]> {
    const response = await apiClient.post<MetricResponse[]>('/api/metric', request);
    return response.data;
  }

  // Получение статических характеристик сервера
  export async function  getStaticMetrics(jwt:string,idserver:number): Promise<any> {
    const response = await apiClient.post<StaticMetricResponse[]>('/api/server/full_info', {id: idserver},{        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
    return response;
  }

  // Получение метрик памяти
  export async function getMemoryMetrics(idserver:number,starttime:string,endtime:string,jwt:string): Promise<any[]> {
    const response = await apiClient.post<MemoryMetricResponse[]>('/api/metric/memory',{
          "metricTimeCriteria":{
        "startTime":starttime,
        "endTime":endtime,
        "serverID":idserver
    }
    },{        
      headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
    return response.data;
  }

  // Получение метрик swap
  export async function  getSwapMetrics(request: MetricRequest, jwt:string): Promise<SwapMetricResponse[]> {
    const response = await apiClient.post<SwapMetricResponse[]>('/api/metric/swap', request,
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
    return response.data;
  }

  // Получение метрик CPU
  export async function getCpuMetrics(request: MetricRequest,jwt:string): Promise<CpuMetricResponse[]> {
    const response = await apiClient.post<CpuMetricResponse[]>('/api/metric/cpu', request,
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
    );
    return response.data;
  }

  // Получение сетевых соединений
  export async function getNetworkConnections(request: MetricRequest,jwt:string): Promise<NetworkConnectionMetricResponse[]> {
    const response = await apiClient.post<NetworkConnectionMetricResponse[]>('/api/metric/network_connection', request,
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
    );
    return response.data;
  }

  // Получение данных сетевых интерфейсов
  export async function  getNetInterfaceMetrics(request: MetricRequest,jwt:string): Promise<NetInterfaceMetricResponse[]> {
    const response = await apiClient.post<NetInterfaceMetricResponse[]>('/api/metric/net_interface', request,
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
    return response.data;
  }

  // Получение данных дисков
  async function getDiskMetrics(request: DiskMetricRequest): Promise<Record<string, DiskMetricResponse[]>> {
    const response = await apiClient.post<Record<string, DiskMetricResponse[]>>('/api/metric/disks', request);
    return response.data;
  }

  // Получение IO данных дисков
  async function getDiskIOMetrics(request: DiskIORequest): Promise<Record<string, DiskIOMetricResponse[]>> {
    const response = await apiClient.post<Record<string, DiskIOMetricResponse[]>>(
      '/api/metric/disksIO',
      request
    );
    return response.data;
  }

  // Получение данных GPU
  async function  getGpuMetrics(request: GpuMetricRequest): Promise<Record<string, GpuMetricResponse[]>> {
    const response = await apiClient.post<Record<string, GpuMetricResponse[]>>('/api/metric/gpu', request);
    return response.data;
  }

