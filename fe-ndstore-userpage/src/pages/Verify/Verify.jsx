import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OTPInput, { ResendOTP } from "otp-input-react";
import '../Verify/Verify.css'
import { verifyUser } from "../../apis/user.api";
import { Loader } from "../../components/Loader/Loader";

const Verify = () => {
   const [OTP, setOTP] = useState("");
   const [message, setMessage] = useState('')
   const [isLoading, setIsLoading] = useState(false);

   let navigate = useNavigate();

   useEffect(() => {

   }, [])

   const { email } = useParams('email')

   const verifyRegister = () => {
      setMessage('');
      if (OTP.length < 6) {
         setMessage('Vui lòng cung cấp mã OTP')
         return;
      }
      verifyUser(email, OTP)
         .then((res) => {
            if (res?.data?.success === true) {
               setIsLoading(false);
               return navigate("/login")
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

   return (
      <div className="verify">
         {
            isLoading === true && <Loader></Loader>
         }
         <a href='/' className='back-home'>Trang chủ</a>
         <h4>Xác thực tài khoản</h4>
         <p>Vui lòng cung cấp mã OTP được gửi qua địa chỉ email</p>
         <div className="email-verify">
            <label style={{margin: '0', marginRight: '10px'}}>Email: </label>
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
         <strong style={{ color: 'var(--main-color)', marginTop: '20px', cursor: 'pointer' }}>Gửi lại mã OTP</strong>
      </div>
   )
}



export default Verify;