export const extractMetricData = (
        data: Array<{ [key: string]: any }>, // Данные с API
        metricName: string // Название метрики
    ) : number[] => {
        return data.map((item) => item[metricName] || 0); // Если метрика отсутствует, возвращаем 0
    };

export function calculateTimeIntervals(startTime: string, endTime: string, numIntervals: number): string[] {
    /**
     * Вычисляет временные промежутки между startTime и endTime.
     * 
     * @param startTime - Начальное время в формате ISO 8601 (например, "2025-05-13T13:34:19Z").
     * @param endTime - Конечное время в формате ISO 8601 (например, "2025-05-13T13:35:18Z").
     * @param numIntervals - Количество временных промежутков.
     * @returns - Массив временных меток в формате ISO 8601.
     */

    // Преобразуем строки времени в объекты Date
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Проверяем корректность входных данных
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.warn(start.getTime(),"\n",end.getTime());
        throw new Error("Неверный формат времени. Используйте ISO 8601." );
    }
    if (start <= end) {
        throw new Error("Начальное время должно быть больше конечного времени.");
    }
    if (numIntervals <= 0) {
        throw new Error("Количество интервалов должно быть больше 0.");
    }
    // Вычисляем общую длительность интервала в миллисекундах
    const totalDuration = end.getTime() - start.getTime();

    // Вычисляем длительность одного временного промежутка
    const intervalDuration = totalDuration / numIntervals;

    // Генерируем временные метки
    const intervals: string[] = [];
    for (let i = 0; i <= numIntervals; i++) {
        const currentTimestamp = new Date(start.getTime() + intervalDuration * i);
        intervals.push(currentTimestamp.toISOString());
    }

    return intervals;
}

export function addTimeToCurrent(timeString: string): string {
    /**
     * Добавляет указанное время к текущему времени.
     * 
     * @param timeString - Строка с временем для добавления (например, "5m", "1h", "1d").
     * @returns - Новое время в формате ISO 8601.
     */

    // Регулярное выражение для извлечения числа и типа интервала
    const regex = /^(\d+)([mhdwMy])$/;
    const match = timeString.match(regex);

    if (!match) {
        throw new Error("Неверный формат времени. Используйте формат 'число[mhdwMy]'.");
    }

    // Извлекаем число и тип интервала
    const value = parseInt(match[1], 10);
    const unit = match[2];
        const now = new Date();
        const currentTime = new Date(now.getTime() - 1 * 60 * 1000);
    // Получаем текущее врем
    console.log("UNIT",unit)
    console.log("VALUE",value)
    // Прибавляем время в зависимости от типа интервала
    switch (unit) {
        case "m": // Минуты
            currentTime.setMinutes(currentTime.getMinutes() - value);
            break;
        case "h": // Часы
            currentTime.setHours(currentTime.getHours() - value);
            break;
        case "d": // Дни
            currentTime.setDate(currentTime.getDate() - value);
            break;
        case "w": // Недели
            currentTime.setDate(currentTime.getDate() - value * 7);
            break;
        case "M": // Месяцы
            currentTime.setMonth(currentTime.getMonth() - value);
            break;
        case "y": // Годы
            currentTime.setFullYear(currentTime.getFullYear() - value);
            break;
        default:
            throw new Error("Неизвестный тип интервала.");
    }

    // Преобразуем результат в строку в формате ISO 8601
    return currentTime.toISOString();
}