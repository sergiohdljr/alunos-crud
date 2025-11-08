import { BaseError } from "./base-error.ts";

export class StudentEmailAlreadyExistsError extends BaseError {
    constructor(email: string) { 
        super(`Student with email ${email} already exists`, 409);
    }
}
    