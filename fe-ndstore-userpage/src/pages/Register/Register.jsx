import { React, useEffect, useState } from 'react'
import '../Register/Register.css'
import logoGoogle from '../../images/icon-google.png'
import { EMAIL_REGEX_PATTERN } from '../../common/common'
import { registerUser } from '../../apis/user.api'
import { getDistrict, getProvince, getWard } from '../../apis/logictis.api'
import { Loader } from '../../components/Loader/Loader'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [province, setProvince] = useState([])
    const [district, setDistrict] = useState([])
    const [ward, setWard] = useState([])
    const [provinceId, setProvinceId] = useState('')
    const [districtId, setDistrictId] = useState('')
    const [wardId, setWardId] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    // Check show password
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    let navigate = useNavigate();

    const getProvinceList = () => {
        getProvince()
            .then((res) => {
                setProvince(res?.data?.data)
            })
            .catch((err) => {
                return err;
            })
    }
    const getDistrictList = (provinceId) => {
        getDistrict(provinceId)
            .then((res) => {
                setDistrict(res?.data?.data)
            })
            .catch((err) => {
                return err;
            })
    }
    const getWardList = (districtId) => {
        getWard(districtId)
            .then((res) => {
                setWard(res?.data?.data)
            })
            .catch((err) => {
                return err;
            })
    }

    useEffect(() => {
        getProvinceList();
    }, [])

    const getName = (e) => {
        setMessage("")
        setName(e)
    }

    const getEmail = (e) => {
        setMessage("")
        setEmail(e)
    }

    const getPassword = (e) => {
        setMessage("")
        setPassword(e)
    }

    const getPhone = (e) => {
        setMessage("")
        setPhone(e)
    }

    const getAddress = (e) => {
        setMessage("")
        setAddress(e)
    }

    const getProvinceId = (e) => {
        setMessage("");
        setProvinceId(e);
        setDistrict([]);
        setDistrictId('');
        getDistrictList(e);
    }

    const getDistrictId = (e) => {
        setMessage("");
        setDistrictId(e);
        setWard([]);
        setWardId('');
        getWardList(e);
    }

    const getWardId = (e) => {
        console.log('wardId', e)
        setMessage("")
        setWardId(e)
    }

    const register = () => {
        // console.log(name, email, password, phone, address, gender, provinceId, districtId, wardId)
        setMessage('');
        if (name === '' || email === '' || password === '' || phone === '' || address === '' || provinceId === '' || districtId === '' || wardId === '') {
            setMessage("Vui lòng điền đủ thông tin");
            return;
        }
        if (!email.match(EMAIL_REGEX_PATTERN)) {
            setMessage("Email không đúng định dạng");
            return;
        }
        setIsLoading(true)
        registerUser(name, email, password, phone, provinceId, districtId, wardId, address)
            .then((res) => {
                if (res?.data?.success === true) {
                    setIsLoading(false);
                    return navigate(`/verify/register/${email}`)
                }
            })
            .catch((err) => {
                setIsLoading(false);
                if (err?.response?.data?.message === 'Email already exists') {
                    setMessage('Email đã tồn tại')
                }
                return err;
            })
    }

    return (
        <div>

            {
                isLoading === true && <Loader></Loader>
            }
            <div className='box-register'>
                <a href='/' className='back-home'>Trang chủ</a>
                <div className='form-register'>
                    <h4 style={{ textAlign: 'center', marginTop: '20px' }}>Đăng ký tài khoản</h4>
                    <div className='register'>
                        <div className='register-left'>
                            <div className='row-input-register'>
                                <label>Tên người dùng</label>
                                <input className='input-register' value={name} onChange={(e) => getName(e.target.value)} placeholder='Tên người dùng' type='text'></input>
                            </div>
                            <div className='row-input-register'>
                                <label>Email</label>
                                <input className='input-register' value={email} onChange={(e) => getEmail(e.target.value)} placeholder='Email' type='email'></input>
                            </div>
                            <div className='row-input-register'>
                                <label>Mật khẩu</label>
                                <input className='input-register' value={password} onChange={(e) => getPassword(e.target.value)} placeholder='Mật khẩu' type={passwordShown ? "text" : "password"}></input>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: ' 5px 20px' }}>
                                <div className='show-password'>
                                    <input onClick={togglePasswordVisiblity} style={{ margin: '0px 10px 0px 0px' }} type='checkBox'></input>
                                    <label style={{ margin: '0px' }}>Hiển thị mật khẩu</label>
                                </div>
                            </div>
                        </div>
                        <div className='register-right'>
                            <div className='row-input-register'>
                                <label>Số điện thoại</label>
                                <input className='input-register' value={phone} onChange={(e) => getPhone(e.target.value)} placeholder='Số điện thoại' type='number'></input>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div className='row-input-register' style={{ width: '50%' }}>
                                    <label>Địa chỉ</label>
                                    <input className='input-register' value={address} onChange={(e) => getAddress(e.target.value)} placeholder='Số nhà, tên đường' type='text'></input>
                                </div>
                                <div className='row-input-register' style={{ width: '50%' }}>
                                    <label>Tỉnh / Thành phố</label>
                                    <select className='input-register' onChange={(e) => getProvinceId(e.target.value)}>
                                        <option value=''>Tỉnh / Thành Phố</option>
                                        {
                                            province.map((item, index) =>
                                                <option value={item.ProvinceID} key={index}>{item?.ProvinceName}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div className='row-input-register' style={{ width: '50%' }}>
                                    <label>Quận / Huyện</label>
                                    <select className='input-register' onChange={(e) => getDistrictId(e.target.value)}>
                                        <option value=''>Quận / Huyện</option>
                                        {
                                            district.map((item, index) =>
                                                <option value={item.DistrictID} key={index}>{item?.DistrictName}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className='row-input-register' style={{ width: '50%' }}>
                                    <label>Xã / Phường</label>
                                    <select className='input-register' onChange={(e) => getWardId(e.target.value)}>
                                        <option value=''>Xã / Phường</option>
                                        {
                                            ward.map((item, index) =>
                                                <option value={item.WardCode} key={index}>{item?.WardName}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                            {<p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
                            <div className='row-input-register'>
                                <button onClick={register} className='btn-login'>Đăng ký</button>
                            </div>
                            <div className='row-input-register'>
                                <span style={{ margin: '0 auto' }}>Hoặc</span>
                            </div>
                            <div className='row-input-register'>
                                <a href='http://localhost:8080/oauth2/authorization/google' className='btn-login-google'>
                                    <img style={{ width: '30px', marginRight: '20px' }} src={logoGoogle} alt='icon-google'></img>
                                    <span>Đăng ký với Google</span>
                                </a>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0px 25px 0px' }}>
                                <span style={{ marginRight: '6px' }}>Bạn đã có tài khoản?</span>
                                <a style={{ color: 'var(--main-color)', fontWeight: 'bold' }} href='/login'>Đăng nhập</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register