interface InputNewCategoryService {
    name: string,
    userId: any
}

interface OutputNewCategoryService {
    status: boolean,
    message: string
}

export {
    InputNewCategoryService,
    OutputNewCategoryService
}