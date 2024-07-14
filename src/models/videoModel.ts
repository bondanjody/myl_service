interface InputNewVideoService {
    title: string,
    link: string,
    categoryId: number,
    channelId: number,
    userId: any
}

interface OutputNewVideoService {
    status: boolean,
    message: string
}

export {
    InputNewVideoService,
    OutputNewVideoService
}