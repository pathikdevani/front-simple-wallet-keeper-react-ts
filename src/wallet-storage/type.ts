export interface IStorage {
    set(key:string, data: object): void
    get(ket:string): object
}