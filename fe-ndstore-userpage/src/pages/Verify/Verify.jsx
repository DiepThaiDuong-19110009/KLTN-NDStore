import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OTPInput from "otp-input-react";
import '../Verify/Verify.css'
import { verifyUser, resendOTP } from "../../apis/user.api";
import { Loader } from "../../components/Loader/Loader";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const Verify = () => {
   const [OTP, setOTP] = useState("");
   const [message, setMessage] = useState('')
   const [isLoading, setIsLoading] = useState(false);
   const [openDialog, setOpenDialog] = useState(false);

   let navigate = useNavigate();

   useEffect(() => {

   }, [])

   const { email } = useParams('email')
   const { type } = useParams('type')

   const verifyRegister = () => {
      setMessage('');
      if (OTP.length < 6) {
         setMessage('Vui lòng cung cấp mã OTP')
         return;
      }
      setIsLoading(true);
      verifyUser(email, OTP, type)
         .then((res) => {
            if (res?.data?.success === true) {
               setIsLoading(false);
               if (type === 'reset') {
                  return navigate(`/reset-password/${res?.data?.data?.id}/${res?.data?.data?.token}`)
               } else {
                  return navigate("/login")
               }
            } else if (res?.data?.success === false) {
               setIsLoading(false);
               setMessage('Mã OTP không chính xác. Vui lòng kiểm tra lại')
            }
         })
         .catch((err) => {
            setIsLoading(false);
            setMessage('Đã xảy ra lỗi')
            return err;
         })
   }

   const resend = () => {
      setIsLoading(true);
      resendOTP(email)
         .then((res) => {
            if (res?.data?.success === true) {
               setIsLoading(false);
               setMessage('');
               setOpenDialog(true);
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
   };

   return (
      <div className="verify">
         {
            isLoading === true && <Loader></Loader>
         }
         <a href='/' className='back-home'>Trang chủ</a>
         <h4>Xác thực tài khoản</h4>
         <p>Vui lòng cung cấp mã OTP được gửi qua địa chỉ email</p>
         <div className="email-verify">
            <label style={{ margin: '0', marginRight: '10px' }}>Email: </label>
            <span className="label-email-verify">{'********' + email.substring(8, email.length)}</span>
         </div>
         <div className="OTP-input" style={{ margin: '20px 0 20px 20px' }}>
            <OTPInput
               value={OTP}
               onChange={setOTP}
               autoFocus
               OTPLength={6}
               otpType="number"
               disabled={false}
            // secure
            />
         </div>
         <p style={{ color: 'red' }}>{message}</p>
         <button onClick={() => verifyRegister()} className="btn-login">Xác thực</button>
         <strong onClick={() => resend()} style={{ color: 'var(--main-color)', marginTop: '20px', cursor: 'pointer' }}>Gửi lại mã OTP</strong>
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
                  Mã OTP đã được gửi lại thành công. Vui lòng kiểm tra Email!
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>OK</Button>
            </DialogActions>
         </Dialog>
      </div>
   )
}



export default Verify;