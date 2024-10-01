
export interface ITasks{
    id: number
    text: string
    status: string
    date: string
}


export interface IState {
    items: ITasks[]
}