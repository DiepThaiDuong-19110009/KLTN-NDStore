import { React, useEffect, useState } from 'react'
import '../Login/Login.css'
import logoGoogle from '../../images/icon-google.png'
import {Image} from 'react-bootstrap'
import { EMAIL_REGEX_PATTERN } from '../../common/common'
import { loginUser } from '../../apis/user.api'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    // Check show password
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    useEffect(() => {

    }, [])

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
        loginUser(email, password)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            return err;
        })
    }

    return (
        <div className='box'>
            <a href='/' className='back-home'>Trang chủ</a>
            <div className='form-login'>
                <div>
                    <h4 style={{textAlign: 'center'}}>Đăng nhập</h4>
                    <div className='row-input'>
                        <label>Email</label>
                        <input value={email} onChange={(e) => getEmail(e)} placeholder='Email' type='email'></input>
                    </div>
                    <div className='row-input'>
                        <label>Mật khẩu</label>
                        <input value={password} onChange={(e) => getPassword(e)} placeholder='Mật khẩu' type={passwordShown ? "text" : "password"}></input>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: ' 10px 20px'}}>
                        <div className='show-password'>
                            <input onClick={togglePasswordVisiblity} style={{margin: '0px 10px 0px 0px'}} type='checkBox'></input>
                            <label style={{margin: '0px'}}>Hiển thị mật khẩu</label>
                        </div>
                        <a className='forgot-password' href='/'>Quên mật khẩu?</a>
                    </div>
                    {<p style={{color: 'red', textAlign: 'center', marginTop: '10px'}}>{message}</p>}
                    <div className='row-input'>
                        <button onClick={login} className='btn-login'>Đăng nhập</button>
                    </div>
                    <div className='row-input'>
                        <span style={{margin: '0 auto'}}>Hoặc</span>
                    </div>
                    <div className='row-input'>
                        <button className='btn-login-google'>
                            <Image style={{width: '30px', marginRight: '20px'}} src={logoGoogle} alt='icon-google'></Image>
                            <span>Đăng nhập với Google</span>
                        </button>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', margin: '15px 0px 25px 0px'}}>
                        <span style={{marginRight: '6px'}}>Bạn chưa có tài khoản?</span>
                        <a style={{color: 'var(--main-color)', fontWeight: 'bold'}} href='/register'>Đăng ký</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login