import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import '../Payment/Payment.css'
import logoPayPal from '../../images/paypal.svg'
import logoVNPay from '../../images/Logo-VNPAY-1.png'
const Payment = () => {
    return (
        <div>
            <Header></Header>
            <div className="container-payment">
                <div className="info-payment">
                    <h5>Phương thức thanh toán</h5>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '15px' }}>
                        <button className="choose-method">
                            <img style={{ height: '30px' }} src={logoPayPal} alt="" />
                        </button>
                        <button className="choose-method">
                            <img style={{ height: '30px' }} src={logoVNPay} alt="" />
                        </button>
                        <button className="choose-method">
                            <strong>Tiền mặt</strong>
                        </button>
                    </div>
                    <hr />
                    <h5>Thông tin giao hàng</h5>
                    <div className="information-delivery" style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>Tên người nhận</label>
                        <input type="text" placeholder="Tên người nhận"></input>
                        <label htmlFor="">Số điện thoại</label>
                        <input placeholder="Số điện thoại nhận hàng" type="number"></input>
                        <label htmlFor="">Địa chỉ</label>
                        <input placeholder="Số nhà, tên đường" type="text"></input>
                        <label htmlFor="">Tỉnh, Thành phố</label>
                        <select>
                            <option value=''>Tỉnh / Thành Phố</option>
                        </select>
                        <label htmlFor="">Xã, phường</label>
                        <select>
                            <option value=''>Xã / Phường</option>
                        </select>
                        <label htmlFor="">Quận, huyện</label>
                        <select>
                            <option value=''>Quận / Huyện</option>
                        </select>
                    </div>
                </div>
                <div className="total-payment">
                    <h4>Thanh toán</h4>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
export default Payment;