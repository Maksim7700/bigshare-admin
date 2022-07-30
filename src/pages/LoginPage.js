import {useState} from 'react';
import {connect} from 'react-redux';
import {authenticate, authFailure, authSuccess} from '../redux/authActions';
import './loginpage.css';
import {userLogin} from '../api/authenticationService';
import {Alert, Spinner} from 'react-bootstrap';

const LoginPage = ({loading, error, ...props}) => {

    const InvalidPasswordOrUsername = "INVALID_PASSWORD_OR_USERNAME";
    const [errorUsername, setErrorUsername] = useState(false);

    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.authenticate();

        userLogin(values).then((response) => {
            if (response.status === 200) {
                props.setUser(response.data);
                props.history.push('/dashboard');
            } else {
                props.loginFailure('Something Wrong!Please Try Again');
            }

        }).catch((err) => {
            if (err.response.data.status === 400 && err.response.data.errorCode === InvalidPasswordOrUsername) {
                setErrorUsername(true);
            }
            if (err && err.response) {
                switch (err.response.status) {
                    case 401:
                        props.loginFailure("Authentication Failed.Bad Credentials");
                        break;
                    default:
                        props.loginFailure('Something Wrong!Please Try Again');

                }
            } else {
                props.loginFailure('Something Wrong!Please Try Again');
            }
        });
    }

    const handleChange = (e) => {
        e.persist();
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className='admin-container'>
            <div className='left-side'>
                <div className='image-bighsare'><img id='image' src={process.env.PUBLIC_URL + '/bigshare.svg'}
                                                     alt='bigshare'/></div>
            </div>
            <div className='right-side'>
                <div className='title'>Login to your account</div>
                <div className='container'>
                    <div className='forma'>

                        <form className="my-login-validation" onSubmit={handleSubmit} noValidate={false}>
                            <div className='login-input'>
                                <label className='login' htmlFor='login'>Login</label>
                                <input placeholder='Enter your email' id="login" type="text" className='form-login' minLength={5}
                                       value={values.username} onChange={handleChange} name="username" required/>
                            </div>

                            <div className='password-input'>
                                <label className='password'>Password</label>
                                <input placeholder='Password' id="password" type="password" className="form-login" minLength={6}
                                       value={values.password} onChange={handleChange} name="password" required/>
                                {errorUsername &&<div className='red-text'>
                                    Username or password is invalid.
                                </div>}
                            </div>

                            <div className="button-submit">
                                <button type="submit" className="login-now">
                                    Login now
                                    {loading && (
                                        <Spinner className='spinner-login'
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )


}

const mapStateToProps = ({auth}) => {
    return {
        loading: auth.loading,
        error: auth.error
    }
}


const mapDispatchToProps = (dispatch) => {

    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);