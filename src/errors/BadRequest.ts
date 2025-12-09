import { ERROR_TYPES } from "../constants/error.constant";
import { HTTP_STATUS } from "../constants/http.constant";
import { BaseError } from "./BaseError";

export class BadRequest extends BaseError {
    constructor(message = "Bad Request", errors?: any) {
        super(message, HTTP_STATUS.BAD_REQUEST, ERROR_TYPES.BAD_REQUEST, errors);
    }
}