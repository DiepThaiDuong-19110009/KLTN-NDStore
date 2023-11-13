import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateNewPassword } from "../../apis/user.api";
import { Loader } from "../../components/Loader/Loader";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const ResetPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [newPass, setNewPass] = useState('')
    const [message, setMessage] = useState('')
    const [openDialog, setOpenDialog] = useState(false);
    // Check show password
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const { id } = useParams('id')
    const { token } = useParams('token')

    let navigate = useNavigate();

    const getNewPass = (e) => {
        setMessage("")
        setNewPass(e.target.value)
    }

    const resetPassword = () => {
        setMessage('');
        if (newPass === '') {
            setMessage("Vui lòng cung cấp mật khẩu mới");
            return;
        }
        setIsLoading(true)
        updateNewPassword(newPass, id, token)
            .then((res) => {
                if (res?.data?.success === true) {
                    setIsLoading(false);
                    setOpenDialog(true)
                }
            })
            .catch((err) => {
                setIsLoading(false);
                setMessage('Vui lòng kiểm tra lại mật khẩu')
                return err;
            })
    }

    const handleClose = () => {
        setOpenDialog(false);
        navigate('/login')
    };

    return (
        <div>
            {
                isLoading === true && <Loader></Loader>
            }
            <div className='box'>
                <a href='/' className='back-home'>Trang chủ</a>
                <div className='form-login'>
                    <div>
                        <h4 className='title-login' style={{ textAlign: 'center' }}>Cập nhật mật khẩu mới</h4>
                        <div className='row-input-login'>
                            <label>Mật khẩu mới</label>
                            <input className='input-login' value={newPass} onChange={(e) => getNewPass(e)} placeholder='Mật khẩu mới' type={passwordShown ? "text" : "password"}></input>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: ' 10px 20px' }}>
                            <div className='show-password'>
                                <input onClick={togglePasswordVisiblity} style={{ margin: '0px 10px 0px 0px' }} type='checkBox'></input>
                                <label style={{ margin: '0px' }}>Hiển thị mật khẩu</label>
                            </div>
                        </div>
                        {<p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{message}</p>}
                        <div className='row-input-login'>
                            <button onClick={resetPassword} className='btn-login'>Cập nhật mật khẩu</button>
                        </div>
                        <br />
                    </div>
                </div>
                <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Thông báo
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Bạn đã cập nhật mật khẩu mới thành công.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => navigate('/login')}>Đăng nhập</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default ResetPassword