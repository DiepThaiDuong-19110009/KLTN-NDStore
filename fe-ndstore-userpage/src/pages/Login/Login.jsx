import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Login/Login.css'
import logoGoogle from '../../images/icon-google.png'
import { EMAIL_REGEX_PATTERN } from '../../common/common'
import { loginUser } from '../../apis/user.api'
import { Loader } from '../../components/Loader/Loader'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    // Check show password
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('access-token')) {
            navigate('/');
        }
    }, [navigate])

    const getEmail = (e) => {
        setMessage("")
        setEmail(e.target.value)
    }

    const getPassword = (e) => {
        setMessage("")
        setPassword(e.target.value)
    }

    const login = () => {
        setMessage('');
        if (email === '' || password === '') {
            setMessage("Vui lòng điền đủ thông tin");
            return;
        }
        if (!email.match(EMAIL_REGEX_PATTERN)) {
            setMessage("Email không đúng định dạng");
            return;
        }
        setIsLoading(true)
        loginUser(email, password)
            .then((res) => {
                if (res?.data?.success === true) {
                    localStorage.setItem('history-keysearch', JSON.stringify([]))
                    localStorage.setItem('history-product', JSON.stringify([]))
                    localStorage.setItem('access-token', res?.data?.data?.accessToken)
                    localStorage.setItem('user-infor', JSON.stringify({
                        email: res?.data?.data?.email,
                        name: res?.data?.data?.name,
                        avatar: res?.data?.data?.avatar,
                        id: res?.data?.data?.id
                    }))
                    setIsLoading(false);
                    return navigate("/")
                } else if (res?.data?.success === false) {
                    if (res?.data?.message === 'Your account is unconfirm') {
                        setIsLoading(false);
                        navigate(`/verify/${email}`)
                    } else if (res?.data?.message === 'Your account is block') {
                        setMessage('Tài khoản đã bị vô hiệu hóa')
                    } else {
                        setMessage('Vui lòng kiểm tra lại Email hoặc Mật khẩu')
                    }
                    setIsLoading(false);
                    return;
                }
            })
            .catch((err) => {
                setIsLoading(false);
                if (err?.response?.data?.message === 'Email or password incorrect') {
                    setMessage('Vui lòng kiểm tra lại Email hoặc Mật khẩu')
                }
                return err;
            })
    }

    return (
        <div>
            {
                isLoading === true && <Loader></Loader>
            }
            <div className='box'>
                <a href='/' className='back-home'>Trang chủ</a>
                <div className='form-login'>
                    <div>
                        <h4 className='title-login' style={{ textAlign: 'center' }}>Đăng nhập</h4>
                        <div className='row-input-login'>
                            <label>Email</label>
                            <input className='input-login' value={email} onChange={(e) => getEmail(e)} placeholder='Email' type='email'></input>
                        </div>
                        <div className='row-input-login'>
                            <label>Mật khẩu</label>
                            <input className='input-login' value={password} onChange={(e) => getPassword(e)} placeholder='Mật khẩu' type={passwordShown ? "text" : "password"}></input>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: ' 10px 20px' }}>
                            <div className='show-password'>
                                <input onClick={togglePasswordVisiblity} style={{ margin: '0px 10px 0px 0px' }} type='checkBox'></input>
                                <label style={{ margin: '0px' }}>Hiển thị mật khẩu</label>
                            </div>
                            <a className='forgot-password' href='/forgot-password'>Quên mật khẩu?</a>
                        </div>
                        {<p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{message}</p>}
                        <div className='row-input-login'>
                            <button onClick={login} className='btn-login'>Đăng nhập</button>
                        </div>
                        <div className='row-input-login'>
                            <span style={{ margin: '0 auto' }}>Hoặc</span>
                        </div>
                        <div className='row-input-login'>
                            <a href='http://localhost:8080/oauth2/authorization/google' className='btn-login-google'>
                                <img style={{ width: '30px', marginRight: '20px' }} src={logoGoogle} alt='icon-google'></img>
                                <span>Đăng nhập với Google</span>
                            </a>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0px 25px 0px' }}>
                            <span style={{ marginRight: '6px' }}>Bạn chưa có tài khoản?</span>
                            <a style={{ color: 'var(--main-color)', fontWeight: 'bold' }} href='/register'>Đăng ký ngay</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login