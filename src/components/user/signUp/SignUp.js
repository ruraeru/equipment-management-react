import "./SignUp.scss";

export default function SignUp({ children }) {
    return (
        <div id="loginWrap">
            <div id="center">
                <h1>회원가입</h1>
                {children}
            </div>
        </div>
    );
}