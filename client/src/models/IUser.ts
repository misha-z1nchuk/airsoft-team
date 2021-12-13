export interface IUser{
    id?: number | null
    first_name: string
    last_name: string
    email: string
    password: string
    isActivated: boolean
}