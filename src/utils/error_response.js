export default class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
