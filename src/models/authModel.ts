interface InputRegister {
    username: string,
    firstname: string,
    lastname?: string,
    email: string,
    password: string
}

interface InputLogin {
    username: string,
    password: string
}

export {
    InputRegister,
    InputLogin
}