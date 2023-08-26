import { React, useEffect, useState } from 'react'
import '../Register/Register.css'
import logoGoogle from '../../images/icon-google.png'
import { Image } from 'react-bootstrap'
import { EMAIL_REGEX_PATTERN } from '../../common/common'
import { getDistrict, getProvince, getWard } from '../../apis/user.api'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [gender, setGender] = useState('')
    const [province, setProvince] = useState([])
    const [district, setDistrict] = useState([])
    const [ward, setWard] = useState([])
    const [provinceId, setProvinceId] = useState('')
    const [districtId, setDistrictId] = useState('')
    const [wardId, setWardId] = useState('')
    const [message, setMessage] = useState('')
    // Back - next
    const [isNext, setIsNext] = useState(false)
    // Check show password
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

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

    const getGender = (e) => {
        setMessage("")
        setGender(e)
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

    const onNext = () => {
        setIsNext(true);
    }

    const onBack = () => {
        setIsNext(false);
    }

    const login = () => {
        console.log(name, email, password, phone, address, gender, provinceId, districtId, wardId)
        setMessage('');
        if (name === '' || email === '' || password === '' || phone === '' || address === '' || gender === '' || provinceId === '' || districtId === '' || wardId === '') {
            setMessage("Vui lòng điền đủ thông tin");
            return;
        }
        if (!email.match(EMAIL_REGEX_PATTERN)) {
            setMessage("Email không đúng định dạng");
            return;
        }
        console.log('success')
    }

    return (
        <div className='box'>
            <a href='/' className='back-home'>Trang chủ</a>
            <div className='form-login'>
                <div>
                    <h4 style={{ textAlign: 'center' }}>Đăng ký tài khoản</h4>
                    {
                        isNext === false &&
                        <div>
                            <div className='row-input'>
                                <label>Tên người dùng</label>
                                <input value={name} onChange={(e) => getName(e.target.value)} placeholder='Tên người dùng' type='text'></input>
                            </div>
                            <div className='row-input'>
                                <label>Email</label>
                                <input value={email} onChange={(e) => getEmail(e.target.value)} placeholder='Email' type='email'></input>
                            </div>
                            <div className='row-input'>
                                <label>Mật khẩu</label>
                                <input value={password} onChange={(e) => getPassword(e.target.value)} placeholder='Mật khẩu' type={passwordShown ? "text" : "password"}></input>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: ' 5px 20px' }}>
                                <div className='show-password'>
                                    <input onClick={togglePasswordVisiblity} style={{ margin: '0px 10px 0px 0px' }} type='checkBox'></input>
                                    <label style={{ margin: '0px' }}>Hiển thị mật khẩu</label>
                                </div>
                            </div>
                            <div className='row-input' style={{ marginBottom: '20px' }}>
                                <p onClick={onNext} style={{ color: 'var(--main-color)', fontWeight: 'bold', textAlign: 'center', cursor: 'pointer' }}>Tiếp tục</p>
                            </div>
                        </div>
                    }
                    {
                        isNext === true &&
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div className='row-input' style={{ width: '60%' }}>
                                    <label>Số điện thoại</label>
                                    <input value={phone} onChange={(e) => getPhone(e.target.value)} placeholder='Số điện thoại' type='number'></input>
                                </div>
                                <div className='row-input' style={{ width: '40%' }}>
                                    <label>Giới tính</label>
                                    <select onChange={(e) => getGender(e.target.value)}>
                                        <option value=''>Giới tính</option>
                                        <option value='MALE'>Nam</option>
                                        <option value='FEMALE'>Nữ</option>
                                        <option value='OTHER'>Khác</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div className='row-input' style={{ width: '50%' }}>
                                    <label>Địa chỉ</label>
                                    <input value={address} onChange={(e) => getAddress(e.target.value)} placeholder='Số nhà, tên đường' type='text'></input>
                                </div>
                                <div className='row-input' style={{ width: '50%' }}>
                                    <label>Tỉnh / Thành phố</label>
                                    <select onChange={(e) => getProvinceId(e.target.value)}>
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
                                <div className='row-input' style={{ width: '50%' }}>
                                    <label>Quận / Huyện</label>
                                    <select onChange={(e) => getDistrictId(e.target.value)}>
                                        <option value=''>Quận / Huyện</option>
                                        {
                                            district.map((item, index) =>
                                                <option value={item.DistrictID} key={index}>{item?.DistrictName}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className='row-input' style={{ width: '50%' }}>
                                    <label>Xã / Phường</label>
                                    <select onChange={(e) => getWardId(e.target.value)}>
                                        <option value=''>Xã / Phường</option>
                                        {
                                            ward.map((item, index) =>
                                                <option value={item.WardCode} key={index}>{item?.WardName}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <p onClick={onBack} style={{ color: 'var(--main-color)', fontWeight: 'bold', textAlign: 'center', cursor: 'pointer' }}>Quay lại</p>
                            </div>
                            {<p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
                            <div className='row-input'>
                                <button onClick={login} className='btn-login'>Đăng ký</button>
                            </div>
                            <div className='row-input'>
                                <span style={{ margin: '0 auto' }}>Hoặc</span>
                            </div>
                            <div className='row-input'>
                                <button className='btn-login-google'>
                                    <Image style={{ width: '30px', marginRight: '20px' }} src={logoGoogle} alt='icon-google'></Image>
                                    <span>Đăng ký với Google</span>
                                </button>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0px 25px 0px' }}>
                                <span style={{ marginRight: '6px' }}>Bạn đã có tài khoản?</span>
                                <a style={{ color: 'var(--main-color)', fontWeight: 'bold' }} href='/login'>Đăng nhập</a>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Register