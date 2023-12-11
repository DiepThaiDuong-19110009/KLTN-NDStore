import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import '../UserDetail/UserDetail.css'
import { useEffect, useState } from "react";
import { getDistrict, getProvince, getWard } from '../../apis/logictis.api'
import { changePassword, getProfileUser, updateAvatar, updateProfileUser } from "../../apis/user.api";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Loader } from "../../components/Loader/Loader";

const UserDetail = () => {
    // Get Address
    const [province, setProvince] = useState([])
    const [district, setDistrict] = useState([])
    const [ward, setWard] = useState([])
    const [provinceId, setProvinceId] = useState('')
    const [districtId, setDistrictId] = useState('')
    const [wardId, setWardId] = useState('')
    const [message, setMessage] = useState('')

    const [messageChangePassword, setMessageChangePassword] = useState('')

    const [isLoading, setIsLoading] = useState(false);

    // Change Password
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [openChangePassword, setOpenChangePassword] = useState(false);

    // Show Password
    const [passwordShown, setPasswordShown] = useState(false);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    // Change Avater

    const userId = JSON.parse(localStorage.getItem('user-infor'))?.id
    const typeLogin = JSON.parse(localStorage.getItem('user-infor'))?.type

    const [disableEdit, setDisableEdit] = useState(true)

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
        if (!provinceId) {
            setDistrict([])
            return;
        }
        getDistrict(provinceId)
            .then((res) => {
                setDistrict(res?.data?.data)
            })
            .catch((err) => {
                return err;
            })
    }
    const getWardList = (districtId) => {
        if (!districtId) {
            setDistrict([])
            return;
        }
        getWard(districtId)
            .then((res) => {
                setWard(res?.data?.data)
            })
            .catch((err) => {
                return err;
            })
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

    useEffect(() => {
        getProvinceList();
    }, [])

    useEffect(() => {
        getUserDetail(userId)
    }, [disableEdit])

    const getUserDetail = (userId) => {
        if (!userId) {
            navigate('/')
            return;
        }
        getProfileUser(userId)
            .then((res) => {
                if (res.status === 200) {
                    setName(res?.data?.data?.name)
                    setEmail(res?.data?.data?.email)
                    setPhone(res?.data?.data?.phone)
                    if (res?.data?.data?.avatar === null) {
                        setAvatar('https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Faenza-avatar-default-symbolic.svg/800px-Faenza-avatar-default-symbolic.svg.png')
                    } else {
                        setAvatar(res?.data?.data?.avatar)
                    }
                    setAddress(res?.data?.data?.address)
                    setProvinceId(res?.data?.data?.province)
                    getDistrictList(res?.data?.data?.province)
                    setDistrictId(res?.data?.data?.district)
                    getWardList(res?.data?.data?.district)
                    setWardId(res?.data?.data?.ward)
                }
            })
            .catch((err) => {
                return err;
            })
    }

    const acceptEdit = () => {
        setMessage('')
        disableEdit === true ? setDisableEdit(false) : setDisableEdit(true);
    }

    const saveEdit = () => {
        if (!phone || !address || !provinceId || !wardId || !districtId) {
            setMessage('Vui lòng cung cấp đầy đủ thông tin')
            return;
        }
        setMessage('')
        setIsLoading(true)
        updateProfileUser(userId, name, phone, provinceId, districtId, wardId, address)
            .then((res) => {
                if (res?.data?.success === true) {
                    getUserDetail(userId)
                    updateLocalStorageName(name)
                    window.location.reload();
                    setIsLoading(false)
                    setDisableEdit(true)
                }
            })
            .catch((err) => {
                setIsLoading(false)
                setDisableEdit(true)
                return err;
            })
    }

    // Change password
    const handleCloseChangePassword = () => {
        setOldPassword('')
        setNewPassword('')
        setMessageChangePassword('')
        setPasswordShown(false)
        setOpenChangePassword(false);
    };

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const getOldPassword = (e) => {
        setMessageChangePassword("")
        setOldPassword(e)
    }

    const getNewPassword = (e) => {
        setMessageChangePassword("")
        setNewPassword(e)
    }

    const saveChangePassword = () => {
        setMessage('')
        if (oldPassword === '' || newPassword === '') {
            setMessageChangePassword('Vui lòng cung cấp đủ thông tin mật khẩu')
            return;
        }
        changePassword(userId, oldPassword, newPassword)
            .then((res) => {
                console.log(res)
                if (res?.data?.success === true) {
                    localStorage.clear()
                    return navigate("/login")
                } else if (res?.data?.success === false) {
                    setMessageChangePassword('Vui lòng kiểm tra lại mật khẩu')
                }
            })
            .catch((err) => {
                if (err) {
                    setMessageChangePassword('Vui lòng kiểm tra lại mật khẩu')
                }
            })
    }

    const updateLocalStorageAvatar = (avatar) => {
        const data = JSON.parse(localStorage.getItem('user-infor'))
        localStorage.setItem('user-infor', JSON.stringify({ ...data, avatar: avatar }))
    }

    const updateLocalStorageName = (name) => {
        const data = JSON.parse(localStorage.getItem('user-infor'))
        localStorage.setItem('user-infor', JSON.stringify({ ...data, name: name }))
    }

    // Change Avatar
    const handleSelectFile = (e) => {
        setIsLoading(true)
        if (e.target.files[0]) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0]);
            fileReader.addEventListener("load", function () {
                setAvatar(this.result)
                updateAvatar(userId, e.target.files[0])
                    .then((res) => {
                        if (res?.data?.success === true) {
                            updateLocalStorageAvatar(res?.data?.data?.avatar)
                            window.location.reload();
                            setIsLoading(false);
                        }
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        return err;
                    })
            });
        }
    }

    return (
        <div>
            <Header></Header>
            {
                isLoading === true && <Loader></Loader>
            }
            <div className="container-user-detail">
                <div className="user-detail">
                    <div className="user-detail-left">
                        <div className="avatar">
                            {
                                avatar ?
                                    <img alt="avatar" src={avatar}></img> :
                                    <img alt="avatar" src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Faenza-avatar-default-symbolic.svg/800px-Faenza-avatar-default-symbolic.svg.png'></img>
                            }
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                            <p htmlFor='file-avatar' style={{ marginTop: '10px', color: 'var(--main-color)', cursor: 'pointer' }}>
                                Đổi ảnh đại diện <i style={{ marginLeft: '5px' }} className="fas fa-edit"></i>
                            </p>
                            <input
                                onChange={handleSelectFile}
                                style={{
                                    position: 'absolute', overflow: 'hidden', width: '120px',
                                    height: '20px', top: '10px', opacity: '0', cursor: 'pointer'
                                }}
                                id="file-avatar" type="file"></input>
                        </div>
                        <p>Email: <span style={{ color: 'var(--main-color)', fontWeight: '500' }}>{email}</span></p>
                        {
                            typeLogin !== 'email-google' &&
                            <div style={{ marginTop: '20px' }}>
                                <span style={{ cursor: 'pointer' }} onClick={() => setOpenChangePassword(true)}>
                                    <i style={{ marginRight: '5px' }} className="fas fa-sync-alt"></i> Đổi mật khẩu
                                </span>
                            </div>
                        }
                    </div>
                    <div className="user-detail-right">
                        <h4 style={{ color: 'var(--main-color)', textAlign: 'center', padding: '5px 0 15px 0' }}>Thông tin người dùng</h4>
                        <div className="delivery-info">
                            <div className="row-info">
                                <label htmlFor="">Tên người dùng</label>
                                <input value={name} onChange={(e) => setName(e.target.value)}
                                    className={disableEdit ? 'disable-edit' : ''}
                                    disabled={disableEdit} placeholder="Tên người dùng" type="text"></input>
                                <label htmlFor="">Địa chỉ</label>
                                <input value={address === 'unknown' ? '' : address} onChange={(e) => setAddress(e.target.value)}
                                    className={disableEdit ? 'disable-edit' : ''} disabled={disableEdit}
                                    placeholder="Số nhà, tên đường" type="text"></input>
                                <label htmlFor="">Quận, huyện</label>
                                <select className={disableEdit ? 'disable-edit' : ''} disabled={disableEdit}
                                    onChange={(e) => getDistrictId(e.target.value)} value={districtId}>
                                    <option value=''>Quận / Huyện</option>
                                    {
                                        district.map((item, index) =>
                                            <option value={item.DistrictID} key={index}>{item?.DistrictName}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="row-info">
                                <label htmlFor="">Số điện thoại</label>
                                <input value={phone} onChange={(e) => setPhone(e.target.value)}
                                    className={disableEdit ? 'disable-edit' : ''}
                                    disabled={disableEdit} placeholder="Số điện thoại" type="number"></input>
                                <label htmlFor="">Tỉnh, Thành phố</label>
                                <select className={disableEdit ? 'disable-edit' : ''} disabled={disableEdit}
                                    onChange={(e) => getProvinceId(e.target.value)} value={provinceId}>
                                    <option value=''>Tỉnh / Thành Phố</option>
                                    {
                                        province.map((item, index) =>
                                            <option value={item.ProvinceID} key={index}>{item?.ProvinceName}</option>
                                        )
                                    }
                                </select>
                                <label htmlFor="">Xã, phường</label>
                                <select className={disableEdit ? 'disable-edit' : ''} disabled={disableEdit}
                                    onChange={(e) => getWardId(e.target.value)} value={wardId}>
                                    <option value=''>Xã / Phường</option>
                                    {
                                        ward.map((item, index) =>
                                            <option value={item.WardCode} key={index}>{item?.WardName}</option>
                                        )
                                    }
                                </select>
                                <span style={{ height: '26px' }}></span>
                            </div>
                        </div>
                        <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>
                        <div>
                            {
                                disableEdit &&
                                <div>
                                    <button onClick={() => acceptEdit()} className="btn-edit-info" style={{ height: '32px', width: '100px', marginRight: '10px' }}>Chỉnh sửa</button>
                                </div>
                            }
                            {
                                !disableEdit &&
                                <div>
                                    <button onClick={() => saveEdit()} className="btn-edit-info" style={{ height: '32px', width: '100px', marginRight: '10px' }}>Lưu</button>
                                    <button onClick={() => acceptEdit()} className="btn-edit-info" style={{ height: '32px', width: '100px', marginRight: '10px', backgroundColor: 'var(--danger)' }}>Hủy</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                open={openChangePassword}
                onClose={handleCloseChangePassword}
                maxWidth='xl'
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" style={{ textAlign: 'center' }}>
                    <strong style={{ color: 'var(--main-color)' }}>Thay đổi mật khẩu</strong>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        * Kiểm tra mật khẩu cũ và mới trước khi bấm Lưu.
                    </DialogContentText>
                    <DialogContentText>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ margin: '15px 0 5px 0', color: 'black' }}>Mật khẩu cũ</label>
                            <input style={{ padding: '7px', border: '1px solid #BABABA', outline: 'none', borderRadius: '5px' }}
                                value={oldPassword} onChange={(e) => getOldPassword(e.target.value)}
                                type={passwordShown ? "text" : "password"}></input>
                            <label style={{ margin: '15px 0 5px 0', color: 'black' }}>Mật khẩu mới</label>
                            <input style={{ padding: '7px', border: '1px solid #BABABA', outline: 'none', borderRadius: '5px' }}
                                value={newPassword} onChange={(e) => getNewPassword(e.target.value)}
                                type={passwordShown ? "text" : "password"}></input>
                        </div>
                        <div style={{ marginTop: '8px' }}>
                            <input onClick={togglePasswordVisiblity} style={{ margin: '0px 10px 0px 0px' }} type='checkBox'></input>
                            <label style={{ margin: '0px' }}>Hiển thị mật khẩu</label>
                        </div>
                    </DialogContentText>
                    <DialogContentText>
                        <p style={{ color: 'red', textAlign: 'center', padding: '20px 0 0 0' }}>{messageChangePassword}</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseChangePassword}>
                        Hủy
                    </Button>
                    <Button onClick={saveChangePassword}>
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
            <Footer></Footer>
        </div>
    )
}

export default UserDetail;