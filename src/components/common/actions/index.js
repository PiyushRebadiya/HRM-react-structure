import { v4 as uuidv4 } from 'uuid';

export const generateCguId = (custId) => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const second = currentDate.getSeconds();
    const uuid = uuidv4();
    const UUID = `${day}CC${month}-AA${year}-${hours}-${minutes}${second}-${uuid}-${custId}`;
    return UUID;
};