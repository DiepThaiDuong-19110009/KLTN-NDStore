import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import '../OrderHistory/OrderHistory.css'
import {
    Box, Button, Modal, Paper,
    Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow
} from "@mui/material";
import { cancelOrderUser, getHistoryOrderUser, remakelOrderUser } from "../../apis/order.api";
import { Loader } from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import imgVNPay from '../../images/vnpay.png';
import imgPayPal from '../../images/paypal.png'


const OrderHistory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [state, setState] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [openSetStatus, setOpenSetStatus] = useState(false);
    const [orderIdDetail, setOrderIdDetail] = useState('')
    const [currentState, setCurrentState] = useState('')
    const [orderDetail, setOrderDetail] = useState({})
    const [listOrder, setListOrder] = useState([])

    let navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setState(newValue);
    };

    const handleChangePage = (e, newPage) => {
        setPage(newPage)
        getOrderHistory(newPage, size, state);
    };

    const handleChangeSize = (event) => {
        getOrderHistory(0, event.target.value, state);
        setSize(parseInt(+event.target.value));
        setPage(0);
    };

    useEffect(() => {
        getOrderHistory(page, size, state)
    }, [page, size, state])

    useEffect(() => {
        if (!localStorage.getItem('access-token')) {
            navigate('/');
        }
    }, [navigate])

    const handleUpdateStatus = () => {
        if (!currentState) {
            return;
        }
        if (currentState === 'process') {
            remakeOrder(orderDetail);
        }
        if (currentState === 'cancel') {
            cancelOrder(orderDetail);
        }
    }

    // Cancel Order
    const cancelOrder = (orderDetail) => {
        if (!orderDetail) {
            return;
        }
        setIsLoading(true)
        cancelOrderUser(orderDetail?.id)
            .then((res) => {
                if (res?.data?.success === true) {
                    setIsLoading(false);
                    getOrderHistory(page, size, state)
                    setOpenSetStatus(false)
                }
            })
            .catch((err) => {
                setIsLoading(false)
                console.log(err)
            })
    }

    // Remake Order
    const remakeOrder = (orderDetail) => {
        setIsLoading(true)
        remakelOrderUser(orderDetail?.id, orderDetail?.paymentType?.toLowerCase())
            .then((res) => {
                if (res?.data?.success === true) {
                    setIsLoading(false)
                    console.log(res?.data?.data)
                    if (res?.data?.data !== '') {
                        window.location.href = res?.data?.data;
                    } else if (res?.data?.data === '') {
                        window.location.href = 'http://localhost:3000/checkout/order/payment?complete=&cancel=&cod=true';
                    }
                }
            })
            .catch((err) => {
                if (err) {
                    setIsLoading(false)
                    window.location.href = 'http://localhost:3000/checkout/order/payment?complete=true&cancel=true';
                }
            })
    }


    // Get list order user
    const getOrderHistory = (page, size, state) => {
        if (!localStorage.getItem('access-token')) {
            return;
        }
        setIsLoading(true)
        getHistoryOrderUser(page, size, state)
            .then((res) => {
                if (res?.data?.success === true) {
                    setIsLoading(false);
                    setTotalAmount(res?.data?.data?.totalOrder)
                    if (res?.data?.data?.listOrder) {
                        setListOrder(res?.data?.data?.listOrder)
                    }
                }
            })
            .catch((err) => {
                setIsLoading(false)
                setListOrder([])
                return err;
            })
    }

    const numberWithCommas = (x) => {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const showSetStatus = (order, currentState) => {
        setOpenSetStatus(true)
        setCurrentState(currentState)
        setOrderDetail(order)
    }

    const handleCloseSetStatus = () => {
        setOpenSetStatus(false)
    }

    return (
        <div>
            <Header></Header>
            {
                isLoading === true && <Loader></Loader>
            }
            <div className="order-history">
                <Box sx={{ minWidth: 120 }}>
                    <Box sx={{ width: '100%' }} style={{ backgroundColor: 'white' }}>
                        <Tabs
                            scrollButtons="auto"
                            variant="scrollable"
                            allowScrollButtonsMobile
                            onChange={handleChange}
                            value={state}
                            aria-label="wrapped label tabs example">
                            <Tab label="Tất cả" value="" />
                            <Tab label="Chờ giao hàng" value="waiting" />
                            <Tab label="Chờ thanh toán" value="process" />
                            <Tab label="Đang giao hàng" value="delivery" />
                            <Tab label="Giao hàng thành công" value="success" />
                            <Tab label="Đã hủy" value="cancel" />
                        </Tabs>
                    </Box>
                    <Paper style={{ width: '100%' }}>
                        {
                            listOrder?.length !== 0 ?
                                <>
                                    <TableContainer style={{ minHeight: '60vh' }} component={Paper}>
                                        <Table stickyHeader aria-label="sticky table" style={{ width: '100%' }}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ fontWeight: 'bold' }} align="center">#</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }} align="left">Tên người nhận</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }} align="left">Số điện thoại</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }} align="left">Địa chỉ nhận hàng</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }} align="left">Ngày đặt hàng</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }} align="left">Phương thức thanh toán</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold', minWidth: '150px', textAlign: 'right' }} align="left">Tổng tiền</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }} align="left">Trạng thái</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }} align="center">Cập nhật trạng thái</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }} align="left"></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {listOrder?.map((order, index) => (
                                                    <TableRow key={order?.id} hover role="checkbox" tabIndex={-1}>
                                                        <TableCell align="center">{index + 1}</TableCell>
                                                        <TableCell align="left">{order?.shipment?.customerName}</TableCell>
                                                        <TableCell align="left">{order?.shipment?.customerPhone}</TableCell>
                                                        <TableCell style={{ maxWidth: '200px' }} align="left">{order?.shipment?.customerAddress}{', '}
                                                            {order?.shipment?.customerWard}{', '}
                                                            {order?.shipment?.customerDistrict}{', '}
                                                            {order?.shipment?.customerProvince}</TableCell>
                                                        <TableCell align="left">{order?.createdDate}</TableCell>
                                                        <TableCell align="left">
                                                            {
                                                                order?.paymentType === 'COD' ?
                                                                    <p style={{
                                                                        width: '100px', border: '1px solid green',
                                                                        backgroundColor: 'transparent', color: 'green',
                                                                        textAlign: 'center', padding: '10px 0',
                                                                        borderRadius: '5px'
                                                                    }}>Tiền mặt</p>
                                                                    : order?.paymentType === 'VNPAY' ?
                                                                        <img style={{ width: '100px' }} src={imgVNPay} alt="" /> : order?.paymentType === 'PAYPAL' ?
                                                                            <img style={{ width: '100px' }} src={imgPayPal} alt="" /> : order?.paymentType
                                                            }
                                                        </TableCell>
                                                        <TableCell style={{ minWidth: '150px', color: 'var(--main-color)' }} align="right">{numberWithCommas(order?.totalPrice)} VNĐ</TableCell>
                                                        <TableCell style={{ minWidth: '150px' }} align="left">
                                                            {
                                                                order?.state === 'waiting' && <strong style={{ color: '#FFD700' }}>Chờ xác nhận</strong>
                                                            }
                                                            {
                                                                order?.state === 'cancel' && <strong style={{ color: 'red' }}>Đã hủy</strong>
                                                            }
                                                            {
                                                                order?.state === 'process' && <strong style={{ color: 'blue' }}>Chờ thanh toán</strong>
                                                            }
                                                            {
                                                                order?.state === 'delivery' && <strong style={{ color: '#f26522' }}>Đang giao hàng</strong>
                                                            }
                                                            {
                                                                order?.state === 'success' && <strong style={{ color: 'green' }}>Đã giao</strong>
                                                            }
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <div>
                                                                {
                                                                    order?.state === 'waiting' &&
                                                                    <button onClick={() => showSetStatus(order, 'cancel')} style={{
                                                                        width: '150px', backgroundColor: 'red',
                                                                        border: 'none', padding: '10px 0', cursor: 'pointer',
                                                                        color: 'white', boxShadow: '1px 2px 8px #BABABA', borderRadius: '5px'
                                                                    }}>
                                                                        Hủy đơn hàng
                                                                    </button>
                                                                }
                                                                {
                                                                    order?.state === 'process' &&
                                                                    <div>
                                                                        <button onClick={() => showSetStatus(order, 'process')} style={{
                                                                            width: '150px', backgroundColor: 'green', marginBottom: '20px',
                                                                            border: 'none', padding: '10px 0', cursor: 'pointer',
                                                                            color: 'white', boxShadow: '1px 2px 8px #BABABA', borderRadius: '5px'
                                                                        }}>
                                                                            Thanh toán lại
                                                                        </button>
                                                                        <button onClick={() => showSetStatus(order, 'cancel')} style={{
                                                                            width: '150px', backgroundColor: 'red',
                                                                            border: 'none', padding: '10px 0', cursor: 'pointer',
                                                                            color: 'white', boxShadow: '1px 2px 8px #BABABA', borderRadius: '5px'
                                                                        }}>
                                                                            Hủy đơn hàng
                                                                        </button>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {/* <VisibilityIcon
                                                    onClick={() => showDetailOrder(order?.id)}
                                                    style={{
                                                        fontSize: '28px', background: 'transparent', padding: '5px',
                                                        borderRadius: '50%', border: '1px solid var(--main-color)',
                                                        color: 'var(--main-color)', cursor: 'pointer'
                                                    }} /> */}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 15]}
                                        component="div"
                                        labelRowsPerPage='Hiển thị:'
                                        count={totalAmount}
                                        rowsPerPage={size}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeSize}
                                    />
                                </> :
                                <div style={{ height: '60vh', textAlign: 'center', paddingTop: '10vh' }}>
                                    <p style={{ fontSize: '20px' }}>Không có đơn hàng</p>
                                </div>
                        }
                    </Paper>
                </Box>
            </div>
            <Footer></Footer>
            {/* Set status */}
            <Modal
                open={openSetStatus}
                onClose={handleCloseSetStatus}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                <div style={{
                    width: '500px', height: 'auto', margin: '30px auto',
                    background: 'white', overflowY: 'auto', padding: '20px',
                    borderRadius: '5px'
                }}>
                    {
                        currentState === 'cancel' &&
                        <div>
                            <h4 style={{ marginBottom: '20px' }}>Hủy đơn hàng</h4>
                            <p style={{ lineHeight: '35px' }}>
                                Lưu ý: Đơn hàng sau khi HỦY sẽ không thể hoàn tác!
                            </p>
                            <p>Bạn có chắc chắn muốn hủy đơn hàng không?</p>
                        </div>
                    }
                    {
                        currentState === 'process' &&
                        <div>
                            <h4 style={{ marginBottom: '20px' }}>Thanh toán lại đơn hàng</h4>
                            <p>Đơn hàng sẽ được tiến hành thanh toán lại!</p>
                        </div>
                    }
                    <div style={{ display: 'flex', justifyContent: 'end', gap: '30px', marginTop: '40px' }}>
                        <Button autoFocus onClick={handleCloseSetStatus}>
                            Không
                        </Button>
                        <Button autoFocus onClick={handleUpdateStatus}>
                            Xác nhận
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default OrderHistory;