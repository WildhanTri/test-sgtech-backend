
export const getFromByPage = (page: number, offset: number) => {
    return page < 2 ? 0 : (page - 1) * offset;
}

export const getPageCount = (rowCount: number, offset: number) => {
    console.log(rowCount)
    console.log(offset)
    return Math.round((rowCount / offset) + 1)
}