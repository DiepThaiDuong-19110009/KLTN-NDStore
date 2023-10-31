import '../Cart/Cart.css'
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import getCartProductUser, { addProductToCart, removeItemCart } from '../../apis/cart.api';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader/Loader'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionCartRequest } from '../../redux/actions/ActionsCart';

const Cart = () => {

    const [cart, setCart] = useState([])
    const [totalPrice, setTotalrice] = useState(0)
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('access-token')) {
            navigate('/');
        } else {
            getAllCart();
        }
    }, [navigate])

    const getAllCart = () => {
        setIsLoading(true)
        getCartProductUser()
            .then((res) => {
                if (res?.data?.data?.items) {
                    setIsLoading(false)
                    setCart(res?.data?.data?.items)
                    setTotalrice(res?.data?.data?.totalPrice)
                } else {
                    setCart([])
                    setTotalrice(0)
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                setIsLoading(false)
                console.log(err)
            })
    }

    const numberWithCommas = (x) => {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const deleteItemCart = (itemCartId) => {
        setIsLoading(true);
        removeItemCart(itemCartId)
            .then((res) => {
                if (res?.data?.success === true) {
                    dispatch(actionCartRequest())
                    getAllCart();
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
    }

    const minusQuantity = (productId) => {
        setIsLoading(true);
        addProductToCart(productId, -1)
            .then((res) => {
                if (res?.data?.success === true) {
                    dispatch(actionCartRequest())
                    getAllCart();
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
    }

    const plusQuantity = (productId) => {
        setIsLoading(true);
        addProductToCart(productId, 1)
            .then((res) => {
                if (res?.data?.success === true) {
                    dispatch(actionCartRequest())
                    getAllCart();
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
    }

    const goToPayment = () => {
        if (cart?.length === 0) {
            return;
        }
        navigate('/payment')
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
                        {/* {
                            (cart?.length !== 0) &&
                            <span style={{ color: 'red', fontWeight: 'bold' }}>Xóa tất cả</span>
                        } */}
                        <button style={{ background: 'var(--main-color)', border: 'none', padding: '10px', color: '#FFFFFF', borderRadius: '5px' }}
                            onClick={() => navigate(`/product?all=${true}`)} className="add-to-cart">
                            <i style={{ marginRight: '10px' }} className="fas fa-arrow-left"></i>Tiếp tục mua hàng
                        </button>
                    </div>
                    {
                        (cart?.length !== 0 || !cart) &&
                        <table className='cart'>
                            <tr className='header-cart-table'>
                                <th>Tên sản phẩm</th>
                                <th className='img-product' style={{ textAlign: 'center' }}>Hình ảnh</th>
                                <th className='unit-price'>Đơn giá</th>
                                <th style={{ textAlign: 'center' }}>Số lượng</th>
                                <th style={{ textAlign: 'right' }}>Thành tiền</th>
                                <th></th>
                            </tr>
                            {
                                cart?.map((item) => (
                                    <tr key={item?.itemCartId} className='body-cart-table'>
                                        <td style={{ wordBreak: 'break-word', maxWidth: '40px' }}>
                                            <span style={{ cursor: 'pointer', color: 'var(--main-color)' }} onClick={() => navigate(`/product/${item?.productId}`)}>{item?.productName}</span>
                                        </td>
                                        <td className='img-product' style={{ textAlign: 'center' }}>
                                            <img style={{ width: '80px', height: '80px', border: '1px solid rgb(224, 224, 224)', borderRadius: '5px' }} alt=''
                                                src={item?.image ? item?.image[0]?.url : ''}></img>
                                        </td>
                                        <td className='unit-price'>
                                            <strong>{numberWithCommas(parseInt(item?.discountPrice))} VNĐ</strong>
                                            <div style={{ display: 'flex' }}>
                                                <small style={{ textDecoration: 'line-through', marginRight: '6px' }}>{numberWithCommas(parseInt(item?.productPrice))} VNĐ</small>
                                                <small style={{ color: 'var(--main-color)' }}>{item?.discount} %</small>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <button style={{
                                                    width: '30px', height: '30px', border: 'none', backgroundColor: 'var(--main-color)',
                                                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
                                                    lineHeight: '25px', borderRadius: '5px', background: item?.quantity === 1 ? '#009ed469' : 'var(--main-color)'
                                                }}
                                                    onClick={() => minusQuantity(item?.productId)} disabled={item?.quantity === 1}>
                                                    <strong>-</strong>
                                                </button>
                                                <input readOnly style={{ textAlign: 'center', border: 'none', outline: 'none', fontWeight: 'bold', maxWidth: '30px' }}
                                                    value={item?.quantity}></input>
                                                <button style={{
                                                    width: '30px', height: '30px', border: 'none', backgroundColor: 'var(--main-color)',
                                                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
                                                    lineHeight: '25px', borderRadius: '5px', background: item?.quantity === item?.productStock ? '#009ed469' : 'var(--main-color)'
                                                }}
                                                    onClick={() => plusQuantity(item?.productId)} disabled={item?.quantity === item?.productStock}>
                                                    <strong>+</strong>
                                                </button>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <strong style={{ color: 'var(--main-color)', textAlign: 'right' }}>{numberWithCommas(parseInt(item?.discountPrice) * parseInt(item?.quantity))} VNĐ</strong>
                                        </td>
                                        <td>
                                            <span onClick={() => deleteItemCart(item?.itemCartId)} style={{ color: 'red', cursor: 'pointer' }}>Xóa</span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </table>
                    }
                    {
                        cart?.length === 0 &&
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', flexDirection: 'column' }}>
                            <img style={{ width: '150px' }} src='https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png' alt='Giỏ hàng trống'></img>
                            <strong>Giỏ hàng trống</strong><br />
                            <button onClick={() => navigate('/product')} style={{ border: 'none', backgroundColor: 'var(--main-color)', padding: '10px 20px', color: '#FFFFFF', borderRadius: '10px' }}>Mua ngay</button>
                        </div>
                    }
                </div>
                <div className='total-payment-cart'>
                    <h5 style={{ marginBottom: '20px' }}>Thanh toán</h5>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <strong>Thành tiền:</strong>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: '10px' }}>
                            <strong style={{ color: 'var(--main-color)' }}>{numberWithCommas(parseInt(totalPrice))} VNĐ</strong>
                        </div>
                    </div>
                    <button
                        disabled={(cart?.length === 0)}
                        onClick={() => goToPayment()}
                        style={{ background: (cart?.length === 0) ? '#009ed469' : 'var(--main-color)' }}
                        className='btn-payment-for-cart'>Tiến hành thanh toán</button>
                </div>
            </div>
            <Footer></Footer>
        </div >
    )
}

export default Cart;