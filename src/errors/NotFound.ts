import { ERROR_TYPES } from "../constants/error.constant";
import { HTTP_STATUS } from "../constants/http.constant";
import { BaseError } from "./BaseError";

export class NotFound extends BaseError {
    constructor(message = "Not Found") {
        super(message, HTTP_STATUS.NOT_FOUND, ERROR_TYPES.NOT_FOUND);
    }
}