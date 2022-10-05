const getTime = (duration: number): string => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);

    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}

const padTo2Digits = (number: number): string => {
    return number.toString().padStart(2, '0');
}

const timestampToDate = (timestamp: number): string => (new Date(timestamp * 1000).toLocaleDateString());

export { getTime, padTo2Digits, timestampToDate }