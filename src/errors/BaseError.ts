export class BaseError extends Error {
    statusCode: number;
    type: string;
    errors?: any;
    
    constructor(message: string, statusCode: number, type: string, errors?: any) {
        super(message);
        this.statusCode = statusCode;
        this.type = type;
        this.errors = errors;
    }
}