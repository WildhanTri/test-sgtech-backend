
export const getFromByPage = (page: number, offset: number) => {
    return page < 2 ? 0 : (page - 1) * offset;
}

export const getPageCount = (rowCount: number, offset: number) => {
    console.log(rowCount)
    console.log(offset)
    return Math.round((rowCount / offset) + 1)
}

export const convertISODateToYYYYMMDD = (date: any) => {
    var newDate = new Date(date);
    var stringNewDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();//prints expected format.
    console.log(stringNewDate)
    return stringNewDate
}