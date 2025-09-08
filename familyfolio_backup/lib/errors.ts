// testing for error handling

export class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

export class FamilyMemberError extends CustomError {
    constructor(message: string) {
        super(message);
        this.name = 'FamilyMemberError';
    }
}