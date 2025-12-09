import { ERROR_TYPES } from "../constants/error.constant";
import { HTTP_STATUS } from "../constants/http.constant";
import { BaseError } from "./BaseError";

export class Conflict extends BaseError {
    constructor(message = "Conflict") {
        super(message, HTTP_STATUS.CONFLICT, ERROR_TYPES.CONFLICT);
    }
}