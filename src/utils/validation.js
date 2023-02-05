function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

export const handleEmailChange = (email, setError) => {
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

export const handlePasswordChange = (password, setError) => {
    if (!password) {
        setError('Password is required')
        return false
    }
    setError(null)
    return true
}