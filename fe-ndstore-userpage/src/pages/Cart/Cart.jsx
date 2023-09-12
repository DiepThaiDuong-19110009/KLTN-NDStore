import '../Cart/Cart.css'
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const Cart = () => {
    return (
        <div>
            <Header></Header>
            <div className='container-cart'>
                <div className='cart-left'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h4>Giỏ hàng</h4>
                        <span style={{ color: 'red', fontWeight: 'bold' }}>Xóa tất cả</span>
                    </div>
                    <table className='cart'>
                        <tr className='header-cart-table'>
                            <th>Tên sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                            <th></th>
                        </tr>
                        <tr className='body-cart-table'>
                            <td>
                                <img style={{ width: '80px', border: '1px solid rgb(224, 224, 224)', borderRadius: '5px' }} alt='' src='https://lh3.googleusercontent.com/N-tp-JYfRbASQfIqRrxe626j5US-0hV9PEuSXhwGQea_qrCbncfUJ5fE0ZUjgK5pbBdXsPf_ubm8hN1kKfCNRoMW87WsaW8=rw'></img>
                            </td>
                            <td>
                                <strong>16.000.000 VNĐ</strong>
                            </td>
                            <td>1</td>
                            <td>
                                <strong>16.000.000 VNĐ</strong>
                            </td>
                            <td>
                                <span style={{ color: 'red', cursor: 'pointer' }}>Xóa</span>
                            </td>
                        </tr>
                        <tr className='body-cart-table'>
                            <td>
                                <img style={{ width: '80px', border: '1px solid rgb(224, 224, 224)', borderRadius: '5px' }} alt='' src='https://lh3.googleusercontent.com/N-tp-JYfRbASQfIqRrxe626j5US-0hV9PEuSXhwGQea_qrCbncfUJ5fE0ZUjgK5pbBdXsPf_ubm8hN1kKfCNRoMW87WsaW8=rw'></img>
                            </td>
                            <td>
                                <strong>16.000.000 VNĐ</strong>
                            </td>
                            <td>1</td>
                            <td>
                                <strong>16.000.000 VNĐ</strong>
                            </td>
                            <td>
                                <span style={{ color: 'red', cursor: 'pointer' }}>Xóa</span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className='total-payment-cart'>
                    <h5 style={{ marginBottom: '20px' }}>Thanh toán</h5>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <strong>Tổng tạm tính:</strong>
                            <strong>Thành tiền:</strong>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: '10px' }}>
                            <span>16.000.000 VNĐ</span>
                            <strong style={{ color: 'var(--main-color)' }}>16.000.000 VNĐ</strong>
                        </div>
                    </div>
                    <button className='btn-payment-for-cart'>THANH TOÁN</button>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Cart;