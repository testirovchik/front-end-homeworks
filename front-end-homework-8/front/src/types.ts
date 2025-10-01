export interface IUser {
    name: string
    surname: string
    login: string
    isPrivate: number
    password: string
    picture: string
}

export type ILogin  = Pick<IUser, "login" | "password" >

export interface IResponse<T> {
    status: string
    message: string
    payload: T;
}

export interface IContext {
    account: IUser
    setAccount:(account: IUser) => void
}

export interface IPosts {
    id: number
    title: string
    picture: string
    userId: number
    likes?: any[]
    comments: object
}
export type IAccount = Omit<IUser, "password"> & {
    posts: IPosts[];
    followers: IAccount[];
    following: IAccount[];
}

export interface INewLogin {
    password: string
    newLogin: string
}

export interface INewPassword {
    oldPassword: string
    newPassword: string
}