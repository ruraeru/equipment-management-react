import axios from "axios";


const authEmail = async (user_email, setAuth) => {
    await axios.get(`${process.env.REACT_APP_DOMAIN}/authEmail`, {
        params: {
            user_email: user_email
        }
    })
        .then((res) => {
            if (res.data.suc) {
                setAuth(res.data.code);
            }
        }).catch((err) => {
            console.log(err);
        })
}

const authTrue = (input, auth) => {
    if (input === auth) return true;
}

export {
    authEmail, authTrue
}