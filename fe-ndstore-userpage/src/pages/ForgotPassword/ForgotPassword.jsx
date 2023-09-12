import { useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import { EMAIL_REGEX_PATTERN } from "../../common/common";
import { useNavigate } from "react-router-dom";
import { forgotPasswordUser } from "../../apis/user.api";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [openDialog, setOpenDialog] = useState(false);

    let navigate = useNavigate();

    const getEmail = (e) => {
        setMessage("")
        setEmail(e.target.value)
    }

    const forgotPassword = () => {
        setMessage('');
        if (email === '') {
            setMessage("Vui lòng cung cấp email");
            return;
        }
        if (!email.match(EMAIL_REGEX_PATTERN)) {
            setMessage("Email không đúng định dạng");
            return;
        }
        setIsLoading(true)
        forgotPasswordUser(email)
            .then((res) => {
                if (res?.data?.success === true) {
                    setIsLoading(false);
                    setOpenDialog(true)
                }
            })
            .catch((err) => {
                setIsLoading(false);
                setMessage('Đã xảy ra lỗi')
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
                        <h4 className='title-login' style={{ textAlign: 'center' }}>Quên mật khẩu</h4>
                        <div className='row-input-login'>
                            <label>Email</label>
                            <input className='input-login' value={email} onChange={(e) => getEmail(e)} placeholder='Email' type='email'></input>
                        </div>
                        {<p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{message}</p>}
                        <div className='row-input-login'>
                            <button onClick={forgotPassword} className='btn-login'>Quên mật khẩu</button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0px 25px 0px' }}>
                            <a style={{ color: 'var(--main-color)', fontWeight: 'bold' }} href='/login'>Quay lại trang đăng nhập</a>
                        </div>
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
                            Mật khẩu mới đã được gửi qua email. Vui lòng kiểm tra!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>OK</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default ForgotPassword