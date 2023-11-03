import { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import CloseIcon from '@material-ui/icons/Close';
import managementOrderApi from "../../../apis/management-order.api";
import imgPayPal from '../../../assets/images/paypal.png'
import imgVNPay from '../../../assets/images/vnpay.png'

const OrderDetailManagement = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [orderDetail, setOrderDetail] = useState({})

    const numberWithCommas = (x) => {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        getOrderDetail(props?.id);
    }, [props])

    const getOrderDetail = (id) => {
        managementOrderApi
            .getOrderDetail(id)
            .then((res) => {
                if (res?.success === true) {
                    setOrderDetail(res?.data)
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
            {isLoading ? <Loading isLoading={isLoading} /> : undefined}
            <div style={{
                width: '600px', height: '90vh', margin: '30px auto',
                background: 'white', overflowY: 'auto', padding: '20px',
                borderRadius: '5px'
            }}>
                <div style={{ textAlign: 'right' }}>
                    <CloseIcon style={{ cursor: 'pointer' }} onClick={props?.handleClose} />
                </div>
                <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>Chi tiết đơn hàng</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <span>Người nhận: <strong>{orderDetail?.shipment?.customerName || ''}</strong></span>
                    <span>Số điện thoại: <strong>{orderDetail?.shipment?.customerPhone || ''}</strong></span>
                    <span>Địa chỉ: <strong>{orderDetail?.shipment?.customerAddress}{', '}
                        {orderDetail?.shipment?.customerWard}{', '}
                        {orderDetail?.shipment?.customerDistrict}{', '}
                        {orderDetail?.shipment?.customerProvince}</strong></span>
                    <span>Tổng thanh toán: <strong style={{ color: 'var(--main-color)' }}>{numberWithCommas(orderDetail?.totalPrice)} VNĐ</strong></span>
                    <span>Phí vận chuyển: <strong style={{ color: 'var(--main-color)' }}>
                        {numberWithCommas(orderDetail?.shipment?.serviceShipDetail?.totalFeeShip)} VNĐ
                    </strong></span>
                    <span style={{display: 'flex', alignItems: 'center', gap: '20px'}}>Phương thức thanh toán: <strong>
                        {
                            orderDetail?.paymentType === 'COD' ?
                                <p style={{
                                    width: '100px',
                                    backgroundColor: 'green', color: '#FFF',
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
                    <div style={{ border: '1px solid #BABABA', borderRadius: '5px', background: '#F2F2F2' }}>
                        {
                            orderDetail?.items &&
                            orderDetail.items.map((item) => {
                                return (
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center', padding: '10px', gap: '50px'
                                    }} key={item?.itemCartId}>
                                        <h5 style={{ width: '120px' }}>{item?.productName}</h5>
                                        <h5 style={{ width: '30px' }}>x {item?.quantity}</h5>
                                        <h5 style={{ width: '120px' }}>{numberWithCommas(item?.productPrice)} VNĐ</h5>
                                        <h5 style={{ color: 'var(--main-color)' }}>{numberWithCommas(item?.subPrice)} VNĐ</h5>
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

export default OrderDetailManagement;