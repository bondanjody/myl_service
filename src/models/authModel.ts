interface InputRegister {
    username: string,
    firstname: string,
    lastname?: string,
    email: string,
    password: string
}

interface InputLoginService {
    username: string,
    password: string
}

interface OutputLoginService {
    status: boolean,
    message: string,
    token?: string,
}

export {
    InputRegister,
    InputLoginService,
    OutputLoginService,
}