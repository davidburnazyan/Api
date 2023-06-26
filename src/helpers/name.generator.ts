export const getDate = () => {
    const d = new Date();
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [ year, month, day ].join('-');
};

export const buildFileNameWithDate = (name: string) => {
    const date = getDate();
    const currentDate = new Date();
    const milliseconds = currentDate.getMilliseconds();
    const seconds = currentDate.getSeconds();
    const minutes = currentDate.getMinutes();
    return `${name}--${date}--${minutes}${seconds}${milliseconds}`;
};
