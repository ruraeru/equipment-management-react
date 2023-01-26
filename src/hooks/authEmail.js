import axios from "axios";


const authEmail = async (user_email, setAuth) => {
    console.log(user_email)
    await axios.get(`${process.env.REACT_APP_DOMAIN}/email/${user_email}`)
        .then((res) => {
            console.log(res);
        })
}

const authTrue = (input, auth) => {
    if (input === auth) return true;
}

export {
    authEmail, authTrue
}