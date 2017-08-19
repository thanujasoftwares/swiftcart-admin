export class Error {
    constructor(
        public key: string,
        public value: string,
        public message: string,
        public raise:boolean
    ){}
}