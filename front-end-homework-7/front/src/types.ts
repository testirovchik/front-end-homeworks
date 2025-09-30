export interface IUser {
    name: string
    surname: string
    login: string
    password: string
}

export type ILogin  = Pick<IUser, "login" | "password" >

export interface IResponse {
    status: string
    message: string
    payload: IUser
}

export interface IContext {
    account: IUser
}

export interface INewLogin {
    password: string
    newLogin: string
}

export interface INewPassword {
    oldPassword: string
    newPassword: string
}