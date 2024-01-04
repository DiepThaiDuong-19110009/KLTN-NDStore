import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import {
    Alert,
    Breadcrumbs, Button, Drawer, FormControl, MenuItem, Modal, Paper,
    Select,
    Snackbar,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TablePagination, TableRow, Typography
} from "@mui/material";
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import managementOrderApi from "../../apis/management-order.api";
import VisibilityIcon from '@material-ui/icons/Visibility';
import StoreIcon from '@material-ui/icons/Store';
import OrderDetailManagement from "./OrderDetailManagement/OrderDetailManagement";
import imgPayPal from '../../assets/images/paypal.png'
import imgVNPay from '../../assets/images/vnpay.png'
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";

const OrderManagement = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [openSetStatus, setOpenSetStatus] = useState(false);
    const [orderIdDetail, setOrderIdDetail] = useState('')
    const [nextState, setNextState] = useState('')
    const [orderDetail, setOrderDetail] = useState({})
    // data for call api get all
    const [size, setSize] = useState(10);
    const [page, setPage] = useState(0);
    const [customerName, setCustomerName] = useState('');
    const [status, setStatus] = useState('');
    const [fromDay, setFromDay] = useState(dayjs('2023-09-01'));
    const [toDay, setToDay] = useState(dayjs(tomorrow.setDate(today.getDate() + 1)))

    // set data response
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [listOrder, setListOrder] = useState([]);

    const navigate = useNavigate()

    const numberWithCommas = (x) => {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleChangePage = (e, newPage) => {
        setPage(newPage)
        getAllOrder(newPage, size, customerName, status, fromDay.format('DD-MM-YYYY'), toDay.format('DD-MM-YYYY'))
    };

    const handleChangeSize = (event) => {
        setSize(parseInt(+event.target.value));
        setPage(0);
    };

    const handleClickBreadcrumb = (link) => {
        navigate(link);
    }

    useEffect(() => {
        getAllOrder(page, size, customerName, status, fromDay.format('DD-MM-YYYY'), toDay.format('DD-MM-YYYY'));
    }, [])

    // Close snackbar
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    // Get All Order for page
    const getAllOrder = (page, size, customerName, status, fromDay, toDay) => {
        setIsLoading(true)
        managementOrderApi
            .getOrderList(page, size, customerName, status, fromDay, toDay)
            .then((res) => {
                if (res?.success === true) {
                    setTotalAmount(res?.data?.totalQuantity)
                    setTotalPage(res?.data?.totalPage)
                    setListOrder(res?.data?.list)
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                if (err?.success === false) {
                    setTotalAmount(0)
                    setListOrder([])
                    setIsLoading(false);
                }
                setIsLoading(false);
                console.log(err)
            })
    }

    // function to update status with state
    const handleUpdateStatus = () => {
        if (!nextState) {
            return;
        }
        if (nextState === 'delivery') {
            createOrderGHN(orderDetail?.shipment, orderDetail?.items?.map((item) => {
                return { name: item?.productName, quantity: item?.quantity }
            }))
        }
        if (nextState === 'complete') {
            updateStateOrderToComplete(orderDetail?.id)
        }
        if (nextState === 'cancel') {
            updateStateOrderToCancel(orderDetail?.id)
        }
    }

    // Update status Order to cancel
    const updateStateOrderToCancel = (idOrder) => {
        if (!idOrder) {
            return;
        }
        setIsLoading(true)
        managementOrderApi
            .setStatusOrderToCancel(idOrder)
            .then((res) => {
                if (res?.success === true) {
                    getAllOrder(page, size, customerName, status, fromDay.format('DD-MM-YYYY'), toDay.format('DD-MM-YYYY'))
                    setOpenSnackbar(true)
                    handleCloseSetStatus();
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    // Update status Order to complete
    const updateStateOrderToComplete = (idOrder) => {
        if (!idOrder) {
            return;
        }
        setIsLoading(true)
        managementOrderApi
            .setStatusOrderToComplete(idOrder)
            .then((res) => {
                if (res?.success === true) {
                    getAllOrder(page, size, customerName, status, fromDay.format('DD-MM-YYYY'), toDay.format('DD-MM-YYYY'))
                    setOpenSnackbar(true)
                    handleCloseSetStatus();
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    // Create Order for GHN and update status to delivery
    const updateStateOrderToDelivery = (expected_delivery_time) => {
        if (!expected_delivery_time) {
            return;
        }
        setIsLoading(true)
        managementOrderApi
            .setStatusOrderToDelivery(orderDetail?.id, expected_delivery_time.toString())
            .then((res) => {
                if (res?.success === true) {
                    getAllOrder(page, size, customerName, status, fromDay.format('DD-MM-YYYY'), toDay.format('DD-MM-YYYY'))
                    setOpenSnackbar(true)
                    handleCloseSetStatus();
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    const createOrderGHN = (customerInfo, productList) => {
        console.log(customerInfo, productList)
        if (!productList || !customerInfo) {
            return;
        }
        setIsLoading(true)
        managementOrderApi
            .createOrderForGHN(customerInfo, productList)
            .then((res) => {
                if (res?.data?.code === 200) {
                    updateStateOrderToDelivery(res?.data?.data?.expected_delivery_time)
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    // Show Detail Order
    const showDetailOrder = (id) => {
        setOrderIdDetail(id)
        setOpenDetail(true)
    }

    const handleClose = () => {
        setOpenDetail(false)
    }

    // Update status
    const showSetStatus = (order, nextState) => {
        setOpenSetStatus(true)
        setNextState(nextState)
        setOrderDetail(order)
    }

    const handleCloseSetStatus = () => {
        setOpenSetStatus(false)
    }

    const searchUser = () => {
        getAllOrder(0, 10, customerName, status, fromDay.format('DD-MM-YYYY'), toDay.format('DD-MM-YYYY'));
    };

    const resetSearch = () => {
        setCustomerName('');
        setStatus('');
        setFromDay(dayjs('2023-09-01'))
        setToDay(dayjs(tomorrow.setDate(today.getDate() + 1)))
        setPage(0);
        setSize(10);
        getAllOrder(0, 10, '', '', '01-09-2023', dayjs(tomorrow.setDate(today.getDate() + 1)).format('DD-MM-YYYY'));
    }

    return (
        <div style={{ paddingLeft: '260px' }}>
            {isLoading ? <Loading isLoading={isLoading} /> : undefined}
            <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', zIndex: '1300' }}>
                <Header />
            </div>
            <Drawer
                variant="permanent"
                open
                anchor="left">
                <Menu selected='order' />
            </Drawer>
            <div style={{ padding: '70px 15px 70px 15px', height: 'auto' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography onClick={() => handleClickBreadcrumb('/home')} color="gray" fontSize='14px' style={{ cursor: 'pointer' }}>Trang chủ</Typography>
                    <Typography color="var(--main-color)" fontSize='14px'>Quản lý đơn hàng</Typography>
                </Breadcrumbs>
                <div>
                    <div style={{ margin: '15px 0' }}>
                        <h3 style={{ marginBottom: '15px' }}>Quản lý đơn hàng</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Tổng số đơn hàng: <strong>{totalAmount}</strong></span>
                            <a href="https://5sao.ghn.dev/order" target="blank"
                                style={{
                                    display: 'flex', justifyContent: 'space-between',
                                    alignItems: 'center', textDecoration: 'none',
                                    color: 'var(--main-color)'
                                }}>
                                <StoreIcon style={{ marginRight: '10px' }} />
                                Xem đơn tại GHN
                            </a>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
                        <input style={{ width: '260px', height: '40px' }} value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="input-search-admin" placeholder="Tìm kiếm bằng tên"></input>
                        <FormControl sx={{ minWidth: 300 }} style={{ backgroundColor: 'white' }}>
                            <Select
                                size="small"
                                value={status}
                                onChange={(e) => { setStatus(e.target.value) }}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">
                                    <em>Tất cả trạng thái</em>
                                </MenuItem>
                                <MenuItem value={'waiting'}>Chờ lấy hàng</MenuItem>
                                <MenuItem value={'process'}>Chờ thanh toán</MenuItem>
                                <MenuItem value={'delivery'}>Đang giao hàng</MenuItem>
                                <MenuItem value={'success'}>Đã giao</MenuItem>
                                <MenuItem value={'cancel'}>Đã hủy</MenuItem>
                            </Select>
                        </FormControl>
                        <button onClick={() => searchUser()} className="btn-search-admin">Tìm kiếm</button>
                        <button onClick={() => resetSearch()} className="btn-search-admin">Tải lại</button>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker
                                slotProps={{ textField: { size: 'small' } }}
                                label="Từ ngày"
                                value={fromDay}
                                onChange={(newValue) => setFromDay(newValue)}
                            />
                            <DatePicker
                                slotProps={{ textField: { size: 'small' } }}
                                label="Đến ngày"
                                value={toDay}
                                onChange={(newValue) => setToDay(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <div style={{ marginBottom: '20px' }}></div>
                    <Paper style={{ width: '100%' }}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table" style={{ width: '100%' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }} align="center">#</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Tên người nhận</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Số điện thoại</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Địa chỉ nhận hàng</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Ngày đặt hàng</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Phương thức</TableCell>
                                        <TableCell style={{ fontWeight: 'bold', minWidth: '250px', textAlign: 'left' }} align="left">Tổng tiền</TableCell>
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
                                                            <img alt="VNPAY" style={{ width: '100px' }} src={imgVNPay} /> : order?.paymentType === 'PAYPAL' ?
                                                                <img alt="PAYPAL" style={{ width: '100px' }} src={imgPayPal} /> : order?.paymentType
                                                }
                                            </TableCell>
                                            <TableCell style={{ minWidth: '250px' }} align="right">
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                                    <p>
                                                        <strong>Tiền hàng:</strong> {numberWithCommas(order?.totalPrice)} VNĐ
                                                    </p>
                                                    <p style={{ padding: '5px 0' }}>
                                                        <strong>Phí vận chuyển:</strong> {numberWithCommas(order?.shipment?.serviceShipDetail?.totalFeeShip)} VNĐ
                                                    </p>
                                                    <p>
                                                        <strong>Thành tiền: </strong>
                                                        <span style={{fontSize: '16px', color: 'var(--main-color)'}}>
                                                            {numberWithCommas(order?.totalPrice + order?.shipment?.serviceShipDetail?.totalFeeShip)} VNĐ
                                                        </span>
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell style={{ minWidth: '150px' }} align="left">
                                                {
                                                    order?.state === 'waiting' && <strong style={{ color: 'orange' }}>Chờ lấy hàng</strong>
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
                                                        <div>
                                                            <button onClick={() => showSetStatus(order, 'delivery')} style={{
                                                                width: '150px', backgroundColor: 'var(--main-color)',
                                                                border: 'none', padding: '10px 0', cursor: 'pointer', marginBottom: '10px',
                                                                color: 'white', boxShadow: '1px 2px 8px #BABABA', borderRadius: '5px'
                                                            }}>
                                                                Tiến hành giao hàng
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
                                                    {
                                                        (order?.state === 'delivery') &&
                                                        <div>
                                                            <button onClick={() => showSetStatus(order, 'complete')} style={{
                                                                width: '150px', backgroundColor: 'green',
                                                                border: 'none', padding: '10px 0', cursor: 'pointer', marginBottom: '10px',
                                                                color: 'white', boxShadow: '1px 2px 8px #BABABA', borderRadius: '5px'
                                                            }}>
                                                                Xác nhận đã giao
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
                                                    {
                                                        order?.state === 'process' &&
                                                        <button onClick={() => showSetStatus(order, 'cancel')} style={{
                                                            width: '150px', backgroundColor: 'red',
                                                            border: 'none', padding: '10px 0', cursor: 'pointer',
                                                            color: 'white', boxShadow: '1px 2px 8px #BABABA', borderRadius: '5px'
                                                        }}>
                                                            Hủy đơn hàng
                                                        </button>
                                                    }
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">
                                                <VisibilityIcon
                                                    onClick={() => showDetailOrder(order?.id)}
                                                    style={{
                                                        fontSize: '28px', background: 'transparent', padding: '5px',
                                                        borderRadius: '50%', border: '1px solid var(--main-color)',
                                                        color: 'var(--main-color)', cursor: 'pointer'
                                                    }} />
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
                    </Paper>
                </div>
            </div>
            <div style={{ position: 'fixed', bottom: '0', left: '0', width: 'calc(100% - 260px)', marginLeft: '260px' }}>
                <Footer />
            </div>

            {/* detail modal */}
            <Modal
                open={openDetail}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                <div>
                    <OrderDetailManagement id={orderIdDetail} handleClose={handleClose}></OrderDetailManagement>
                </div>
            </Modal>

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
                        nextState === 'delivery' &&
                        <div>
                            <h4 style={{ marginBottom: '20px' }}>Tiến hành giao hàng</h4>
                            <p style={{ lineHeight: '35px' }}>
                                Lưu ý: Thông tin đơn hàng sẽ được gửi cho đơn vị vận chuyển <span style={{ color: '#f26522' }}>Giao hàng nhanh </span>để tiến hành giao hàng!
                            </p>
                        </div>
                    }
                    {
                        nextState === 'complete' &&
                        <div>
                            <h4 style={{ marginBottom: '20px' }}>Giao hàng thành công</h4>
                            <p style={{ lineHeight: '35px' }}>
                                Xác nhận giao hàng thành công
                            </p>
                        </div>
                    }
                    {
                        nextState === 'cancel' &&
                        <div>
                            <h4 style={{ marginBottom: '20px' }}>Hủy đơn hàng</h4>
                            <p style={{ lineHeight: '35px' }}>
                                Lưu ý: Đơn hàng sau khi HỦY sẽ không thể hoàn tác!
                            </p>
                        </div>
                    }
                    <div style={{ display: 'flex', justifyContent: 'end', gap: '30px', marginTop: '40px' }}>
                        <Button autoFocus onClick={handleCloseSetStatus}>
                            Hủy
                        </Button>
                        <Button autoFocus onClick={handleUpdateStatus}>
                            Xác nhận
                        </Button>
                    </div>
                </div>
            </Modal>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Cập nhật trạng thái đơn hàng thành công
                </Alert>
            </Snackbar>
        </div>
    )
}

export default OrderManagement;