import { ERROR_TYPES } from "../constants/error.constant";
import { HTTP_STATUS } from "../constants/http.constant";
import { BaseError } from "./BaseError";

export class Unauthorized extends BaseError {
    constructor(message = "Unauthorized") {
        super(message, HTTP_STATUS.UNAUTHORIZED, ERROR_TYPES.UNAUTHORIZED);
    }
}