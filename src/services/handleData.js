export function convertOrderDate(date){
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

    const options = {timeZoneName: 'short', hour: 'numeric', minute: 'numeric'}
    return deltaString + ", " + newDate.toLocaleTimeString("ru-RU", options);
}

export function getReadableStatus(status){
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
