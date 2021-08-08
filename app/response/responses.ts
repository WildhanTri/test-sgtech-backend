

export const objectResponse = (message: string, object?: any) => {
    return {
        'message': message,
        'object': object
    }
}

export const pagingResponse = (message: string, object?: any, page?: number, offset?: number, page_count?: number, row_count?: number,) => {
    return {
        'page': page,
        'offset': offset,
        'page_count': page_count,
        'row_count': row_count,
        'message': message,
        'object': object
    }
}