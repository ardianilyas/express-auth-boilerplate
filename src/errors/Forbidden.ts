import { ERROR_TYPES } from "../constants/error.constant";
import { HTTP_STATUS } from "../constants/http.constant";
import { BaseError } from "./BaseError";

export class Forbidden extends BaseError {
    constructor(message = "Forbidden") {
        super(message, HTTP_STATUS.FORBIDDEN, ERROR_TYPES.FORBIDDEN);
    }
}