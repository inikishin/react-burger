  interface DateTimeFormatOptions {
        localeMatcher?: 'lookup' | 'best fit';
        weekday?: 'long' | 'short' | 'narrow';
        era?:  'long' | 'short' | 'narrow';
        year?: 'numeric' | '2-digit';
        month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
        day?: 'numeric' | '2-digit';
        hour?: 'numeric' | '2-digit';
        minute?: 'numeric' | '2-digit';
        second?: 'numeric' | '2-digit';
        timeZoneName?: 'long' | 'short';
        formatMatcher?: 'basic' | 'best fit';
        hour12?: boolean;
        timeZone?: string; // this is more complicated than the others, not sure what I expect here
    }

export function convertOrderDate(date: string): string{
    const newDate = new Date(date);
    const currentDate = new Date();
    const delta = currentDate.getDate() - newDate.getDate();
    let deltaString = '';
    if (delta === 0) {
        deltaString = 'Сегодня';
    }
    else if (delta === 1) {
        deltaString = 'Вчера';
    }
    else if (delta <= 4){
        deltaString = delta + ' дня назад';
    }
    else {
        deltaString = delta + ' дней назад';
    }

    const options: DateTimeFormatOptions = {timeZone: 'Europe/Moscow', timeZoneName: 'short', hour: '2-digit', minute: '2-digit'}
    return deltaString + ", " + newDate.toLocaleTimeString('ru-RU', options);
}

export function getReadableStatus(status: string): string{
    switch (status) {
        case 'done': {
            return 'Выполнен';
        }
        case 'pending': {
            return 'Готовится';
        }
        default: {
            return 'Создан';
        }
    }
}

export default convertOrderDate;