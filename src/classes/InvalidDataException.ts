export default class InvalidDataException extends Error {
    public constructor(message: string) {
        super(message);
    }
}