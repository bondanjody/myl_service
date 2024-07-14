interface GetAllChannelByUserId {
    userId: number
}

interface InputNewChannelService {
    name: string,
    link: string,
    userId: any
}

interface OutputNewChannelService {
    status: boolean,
    message: string
}

export {
    GetAllChannelByUserId,
    InputNewChannelService,
    OutputNewChannelService
}