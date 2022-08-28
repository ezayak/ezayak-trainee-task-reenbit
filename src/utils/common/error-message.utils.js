export const errorMessages = (error) => { 
    console.log(error);
    switch (error.message) {
        case 'Firebase: TOO_SHORT (auth/invalid-phone-number).': return 'The phone number is too short';
        case 'reCAPTCHA has already been rendered in this element': return 'Refresh the page and try again';
        case ERROR_MESSAGES.WRONG_VERIFICATION_CODE: return 'User could not sign in (bad verification code?)';
        case ERROR_MESSAGES.USER_DOES_NOT_EXISTS: return 'User does not exist';
        default: return error.message;
    }
}

export const ERROR_MESSAGES = {
    WRONG_VERIFICATION_CODE: 'WRONG_VERIFICATION_CODE',
    USER_DOES_NOT_EXISTS: 'USER_DOES_NOT_EXISTS'
}