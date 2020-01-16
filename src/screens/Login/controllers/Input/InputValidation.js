
const validateUsername = (username) => {
    if(!username || username.trim() == "")
        return "Username Should not be empty"
    else if(!isNaN(username))
        return "Username Should not contain numbers"
    return true
}


const validatePassword = (password) => {
    if(!password || password.trim() == "")
        return "Password Should not be empty"
    return true
}

const validateEmail = (email) => {
    const atCount = (email.match(/@/g) && email.match(/@/g).length || 0)
    const _email = email.split("@")
    if (atCount == 0)
        return "Must contain @ symbol"
    else if (atCount > 1)
        return "Only single @ is allowed"
    else if (email.indexOf("@.") > -1)
        return "Tld cannot start with ."
    else if (((email.length - 1) - email.lastIndexOf(".")) < 2)
        return `${email.substring(email.lastIndexOf(".") + 1)} is not a valid TLD, Last tld must contain atleast two characters`
    else if (!/[A-Za-z]/.test(email[0]))
        return `Email first character cannot start with ${email[0]}`
    else if (!/^[a-zA-Z0-9-_.@+]+$/.test(_email[0]))
        return `Email only allow character, digit, underscore, dot and dash`
    else if (!/^[a-zA-Z0-9]+$/.test(_email[1].split(".")[0]))
        return "Email tld is only allow characters or digits"
    else if (_email[0].split(".").length - 1 > 1)
        return "Double Dots are not allowed in email"
    else if (email.indexOf(".@") > -1)
        return 'Emails last character cannot end with dot'
    else if (!/^[a-zA-Z]+$/.test(email.split(".")[email.split(".").length - 1]))
        return 'Email TLD should contain only chars'
    else if (_email[1].split(".").length - 1 > 2)
        return 'Email cannot have multiple Tld'
    return true
}


const validateLogin = (data) => {
    let res = validateUsername(data.username.value) 
    if(res != true)
        return {errorMsg: res, feild: "username"}
    res = validatePassword(data.password.value)
    if(res != true)
        return {errorMsg: res, feild: "password"}
    return true
}

const validateSignUp = (data) => {
    let res = validateUsername(data.firstname.value) 
    if(res != true)
        return {errorMsg: res, feild: "firstname"}
    res = validateUsername(data.lastname.value)
    if(res != true)
        return {errorMsg: res, feild: "lastname"}
    if(data.password !== data.confirmpassword.value)
        return {errorMsg: "Password and Re-Password are mismached", feild: "password"}
    res = validatePassword(data.password.value)
    if(res != true)
        return {errorMsg: res, feild: "password"}
    return true
}

module.exports = {
    validatePassword,
    validateUsername,
    validateEmail,
    validateLogin,
    validateSignUp
}