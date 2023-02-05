function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

export const emailValidation = (email, setError) => {
    if (!email) {
        setError('Email is required')
        return false
    } else if (!isValidEmail(email)) {
        setError('Email is invalid');
        return false
    }
    setError(null)
    return true
};

export const isFieldEmptyValidation = (fieldValue, setError) => {
    if (!fieldValue) {
        setError('This field is required!')
        return false
    }
    setError(null)
    return true
}