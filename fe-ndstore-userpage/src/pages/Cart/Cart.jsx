import '../Cart/Cart.css'
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import getCartProductUser from '../../apis/cart.api';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader/Loader'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    const [cart, setCart] = useState([])
    const [totalPrice, setTotalrice] = useState(0)
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        getAllCart();
    }, [])

    const getAllCart = () => {
        setIsLoading(true)
        getCartProductUser()
            .then((res) => {
                if (res) {
                    setIsLoading(false)
                    console.log(res?.data)
                    setCart(res?.data?.data?.items)
                    setTotalrice(res?.data?.data?.totalPrice)
                }
            })
            .catch((err) => {
                setIsLoading(false)
                console.log(err)
            })
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div>
            <Header></Header>
            {
                isLoading === true && <Loader></Loader>
            }
            <div className='container-cart'>
                <div className='cart-left'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h4>Giỏ hàng</h4>
                        {
                            cart?.length !== 0 &&
                            <span style={{ color: 'red', fontWeight: 'bold' }}>Xóa tất cả</span>
                        }
                    </div>
                    {
                        cart?.length !== 0 ?
                            <table className='cart'>
                                <tr className='header-cart-table'>
                                    <th>Tên sản phẩm</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                    <th></th>
                                </tr>
                                {
                                    cart.map((item) => (
                                        <tr key={item?.itemCartId} className='body-cart-table'>
                                            <td>
                                                <img style={{ width: '80px', height: '80px', border: '1px solid rgb(224, 224, 224)', borderRadius: '5px' }} alt=''
                                                    src={item?.image ? item?.image[0]?.url : ''}></img>
                                            </td>
                                            <td style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                                                <strong>{numberWithCommas(parseInt(item?.discountPrice))} VNĐ</strong>
                                                <div style={{ display: 'flex' }}>
                                                    <small style={{ textDecoration: 'line-through', marginRight: '6px' }}>{numberWithCommas(parseInt(item?.productPrice))} VNĐ</small>
                                                    <small style={{ color: 'var(--main-color)' }}>{item?.discount} %</small>
                                                </div>
                                            </td>
                                            <td>{item?.quantity}</td>
                                            <td>
                                                <strong>{numberWithCommas(parseInt(item?.discountPrice) * parseInt(item?.quantity))} VNĐ</strong>
                                            </td>
                                            <td style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                                                <span style={{ color: 'red', cursor: 'pointer' }}>Xóa</span>
                                                <span style={{ color: 'var(--main-color)', cursor: 'pointer' }}>Chỉnh sửa</span>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </table>
                            :
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', flexDirection: 'column' }}>
                                <img style={{ width: '150px' }} src='https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png' alt='Giỏ hàng trống'></img>
                                <strong>Giỏ hàng trống</strong><br/>
                                <button onClick={() => navigate('/product')} style={{border: 'none', backgroundColor: 'var(--main-color)', padding: '10px 20px', color: '#FFFFFF', borderRadius: '10px'}}>Mua ngay</button>
                            </div>
                    }
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
                            <strong style={{ color: 'var(--main-color)' }}>{numberWithCommas(parseInt(totalPrice))} VNĐ</strong>
                        </div>
                    </div>
                    <button className='btn-payment-for-cart'>THANH TOÁN</button>
                </div>
            </div>
            <Footer></Footer>
        </div >
    )
}

export default Cart;