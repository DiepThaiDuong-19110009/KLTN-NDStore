import { useEffect, useState } from "react";
import imgVNPay from '../../../images/vnpay.png';
import imgPayPal from '../../../images/paypal.png'
import { getDetailOrderUser } from "../../../apis/order.api";
import { Loader } from "../../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

const OrderDetail = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [orderDetail, setOrderDetail] = useState({})

    const numberWithCommas = (x) => {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const navigate = useNavigate()

    useEffect(() => {
        getOrderDetail(props?.id);
    }, [props])

    const getOrderDetail = (id) => {
        getDetailOrderUser(id)
            .then((res) => {
                if (res?.data?.success === true) {
                    setOrderDetail(res?.data?.data)
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    return (
        <div>
            {
                isLoading === true && <Loader></Loader>
            }
            <div style={{
                width: '900px', height: '90vh', margin: '30px auto',
                background: 'white', overflowY: 'auto', padding: '20px',
                borderRadius: '5px'
            }}>
                <div style={{ textAlign: 'right' }}>
                    <strong style={{ cursor: 'pointer', fontSize: '20px' }} onClick={props?.handleClose}>X</strong>
                </div>
                <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>Chi tiết đơn hàng</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <span>Người nhận: <strong>{orderDetail?.shipment?.customerName || ''}</strong></span>
                    <span>Số điện thoại: <strong>{orderDetail?.shipment?.customerPhone || ''}</strong></span>
                    <span>Địa chỉ: <strong>{orderDetail?.shipment?.customerAddress}{', '}
                        {orderDetail?.shipment?.customerWard}{', '}
                        {orderDetail?.shipment?.customerDistrict}{', '}
                        {orderDetail?.shipment?.customerProvince}</strong></span>
                    <span>Tổng tiền sản phẩm: <strong style={{ color: 'var(--main-color)' }}>{numberWithCommas(orderDetail?.totalPrice)} VNĐ</strong></span>
                    <span>Phí vận chuyển: <strong style={{ color: 'var(--main-color)' }}>
                        {numberWithCommas(orderDetail?.shipment?.serviceShipDetail?.totalFeeShip)} VNĐ
                    </strong></span>
                    <span>Tổng thanh toán: <strong style={{ color: 'var(--main-color)', fontSize: '20px' }}>{numberWithCommas(orderDetail?.totalPrice + orderDetail?.shipment?.serviceShipDetail?.totalFeeShip)} VNĐ</strong></span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>Phương thức thanh toán: <strong>
                        {
                            orderDetail?.paymentType === 'COD' ?
                                <p style={{
                                    width: '100px', border: '1px solid green',
                                    backgroundColor: 'transparent', color: 'green',
                                    textAlign: 'center', padding: '10px 0',
                                    borderRadius: '5px'
                                }}>Tiền mặt</p>
                                : orderDetail?.paymentType === 'VNPAY' ?
                                    <img style={{ width: '100px' }} src={imgVNPay} /> : orderDetail?.paymentType === 'PAYPAL' ?
                                        <img style={{ width: '100px' }} src={imgPayPal} /> : orderDetail?.paymentType
                        }
                    </strong>
                    </span>
                    <span>Ngày tạo đơn hàng: <strong>{orderDetail?.createdDate}</strong></span>
                    <span>Trạng thái:
                        {
                            orderDetail?.state === 'waiting' && <strong style={{ color: '#FFD700' }}> Chờ giao hàng</strong>
                        }
                        {
                            orderDetail?.state === 'cancel' && <strong style={{ color: 'red' }}> Đã hủy</strong>
                        }
                        {
                            orderDetail?.state === 'process' && <strong style={{ color: 'blue' }}> Chờ thanh toán</strong>
                        }
                        {
                            orderDetail?.state === 'delivery' && <strong style={{ color: '#f26522' }}> Đang giao hàng</strong>
                        }
                        {
                            orderDetail?.state === 'success' && <strong style={{ color: 'green' }}> Đã giao</strong>
                        }
                    </span>
                    <h4>Danh sách sản phẩm:</h4>
                    <div style={{ border: '1px solid #BABABA', borderRadius: '5px', background: '#FFFFFF' }}>
                        {
                            orderDetail?.items &&
                            orderDetail.items.map((item) => {
                                return (
                                    <div style={{
                                        display: 'flex', justifyContent: 'space-between',
                                        alignItems: 'center', padding: '0 10px'
                                    }} key={item?.itemCartId}>
                                        <h5 style={{cursor: 'pointer'}} onClick={() => navigate(`/product/${item?.productId}`)}>{item?.productName}</h5>
                                        <img onClick={() => navigate(`/product/${item?.productId}`)} style={{ width: '100px', cursor: 'pointer' }} src={item?.image[0]?.url} alt="img-product" />
                                        <span>Số lượng: <h5>{item?.quantity} sản phẩm</h5></span>
                                        <span>Đơn giá: <h5>{numberWithCommas(item?.productPrice)} VNĐ</h5></span>
                                        <span style={{ color: 'var(--main-color)' }}>Thành tiền: <h5>{numberWithCommas(item?.subPrice)} VNĐ</h5></span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail;