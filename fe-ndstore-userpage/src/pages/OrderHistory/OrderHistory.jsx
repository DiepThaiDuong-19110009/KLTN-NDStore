import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import '../OrderHistory/OrderHistory.css'
import { Paper, Tab, Tabs } from "@mui/material";

const OrderHistory = () => {
    const [value, setValue] = useState(0);

    return (
        <div>
            <Header></Header>
            <div className="order-history">
                <Paper square>
                    <Tabs
                        value={value}
                        textColor="primary"
                        indicatorColor="primary"
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <Tab label="Chờ xác nhận" />
                        <Tab label="Đang giao hàng" />
                        <Tab label="Đã giao" />
                        <Tab label="Đã hủy" />
                    </Tabs>
                    {
                        value === 0 &&
                        <div className="content-order-history">
                            <div className="row-item-order">
                                <div className="top">
                                    <h5 style={{ marginBottom: '15px' }}>Laptop Gaming ASUS</h5>
                                    <button className="btn-cancel-order">Hủy đơn hàng</button>
                                </div>
                                <p>Số lượng: <strong>1</strong></p>
                                <p>Tên người nhận: <strong>Diệp Thái Dương</strong></p>
                                <p>Số điện thoại: <strong>0939816390</strong></p>
                                <p>Địa chỉ nhận hàng: <strong>234 Lê Văn Việt, TP Thủ Đức, TP.HCM</strong></p>
                                <p>Ngày đặt hàng: <strong>20/09/2023</strong></p>
                                <h5>Tổng thanh toán: <span style={{ color: 'var(--main-color)' }}>24.000.000 VNĐ</span></h5>
                            </div>
                        </div>
                    }
                    {
                        value === 1 &&
                        <div className="content-order-history">
                            <div className="row-item-order">
                                <h5 style={{ marginBottom: '15px' }}>Laptop Gaming ASUS</h5>
                                <p>Số lượng: <strong>1</strong></p>
                                <p>Tên người nhận: <strong>Diệp Thái Dương</strong></p>
                                <p>Số điện thoại: <strong>0939816390</strong></p>
                                <p>Địa chỉ nhận hàng: <strong>234 Lê Văn Việt, TP Thủ Đức, TP.HCM</strong></p>
                                <p>Ngày đặt hàng: <strong>20/09/2023</strong></p>
                                <h5>Tổng thanh toán: <span style={{ color: 'var(--main-color)' }}>24.000.000 VNĐ</span></h5>
                            </div>
                        </div>
                    }
                    {
                        value === 2 &&
                        <div className="content-order-history">
                            <div className="row-item-order">
                                <h5 style={{ marginBottom: '15px' }}>Laptop Gaming ASUS</h5>
                                <p>Số lượng: <strong>1</strong></p>
                                <p>Tên người nhận: <strong>Diệp Thái Dương</strong></p>
                                <p>Số điện thoại: <strong>0939816390</strong></p>
                                <p>Địa chỉ nhận hàng: <strong>234 Lê Văn Việt, TP Thủ Đức, TP.HCM</strong></p>
                                <p>Ngày đặt hàng: <strong>20/09/2023</strong></p>
                                <h5>Tổng thanh toán: <span style={{ color: 'var(--main-color)' }}>24.000.000 VNĐ</span></h5>
                            </div>
                        </div>
                    }
                    {
                        value === 3 &&
                        <div className="content-order-history">
                            <div className="row-item-order">
                                <div className="top">
                                    <h5 style={{ marginBottom: '15px' }}>Laptop Gaming ASUS</h5>
                                    <img style={{ width: '100px' }} alt="" src='https://static.vecteezy.com/system/resources/previews/021/433/014/non_2x/cancelled-rubber-stamp-free-png.png'></img>
                                </div>
                                <p>Số lượng: <strong>1</strong></p>
                                <p>Tên người nhận: <strong>Diệp Thái Dương</strong></p>
                                <p>Số điện thoại: <strong>0939816390</strong></p>
                                <p>Địa chỉ nhận hàng: <strong>234 Lê Văn Việt, TP Thủ Đức, TP.HCM</strong></p>
                                <p>Ngày đặt hàng: <strong>20/09/2023</strong></p>
                                <h5>Tổng thanh toán: <span style={{ color: 'var(--main-color)' }}>24.000.000 VNĐ</span></h5>
                            </div>
                        </div>
                    }
                </Paper>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default OrderHistory;