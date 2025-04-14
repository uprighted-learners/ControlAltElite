// Button
const LoginButton = (props) => {
    return (
        <div className="login-button" onClick={props.onClick}>
            {props.children}
        </div>
    );
}

export default LoginButton;
