import { Breadcrumbs, Drawer, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import statisticApi from "../../apis/statistic.api";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import managementProductApi from "../../apis/management-product.api";
ChartJS.register(...registerables);

const StatisticManagement = () => {
    const [isLoading, setIsLoading] = useState(false);
    // Report sales
    const today = new Date() // get today's date
    const tomorrow = new Date(today)
    const [fromDayReportSales, setFromDayReportSales] = useState(dayjs('2023-09-01'))
    const [toDayReportSales, setToDayReportSales] = useState(dayjs(tomorrow.setDate(today.getDate() + 1)))
    // const [dataChartReportSales, setDataChartReportSales] = useState()
    // Statistic
    const [fromDayStatistic, setFromDayStatistic] = useState(dayjs('2023-09-01'))
    const [toDayStatistic, setToDayStatistic] = useState(dayjs(tomorrow.setDate(today.getDate() + 1)))
    const [type, setType] = useState('month')

    const [listStatistic, setListStatistic] = useState([])
    const [listReportSales, setListReportSales] = useState([])

    const [listSold, setListSold] = useState([])
    const [totalAmount, setTotalAmount] = useState(0);
    const [size, setSize] = useState(10)
    const [page, setPage] = useState(0)

    const navigate = useNavigate();

    const handleClickBreadcrumb = (link) => {
        navigate(link);
    }

    const numberWithCommas = (x) => {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        getStatistic(fromDayStatistic.format('DD-MM-YYYY'), toDayStatistic.format('DD-MM-YYYY'), type)
    }, [toDayStatistic, fromDayStatistic, type])

    useEffect(() => {
        getProductSales(fromDayReportSales.format('DD-MM-YYYY'), toDayReportSales.format('DD-MM-YYYY'));
    }, [fromDayReportSales, toDayReportSales])

    useEffect(() => {
        getSold()
    }, [])

    const getProductSales = (fromDay, toDay) => {
        setIsLoading(true)
        statisticApi
            .getReportProductSales(fromDay, toDay)
            .then((res) => {
                if (res?.success === true) {
                    setListReportSales(res?.data)
                    setIsLoading(false);
                } else {
                    setListReportSales([])
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                setListReportSales([])
                console.log(err)
            })
    }

    const getStatistic = (fromDay, toDay, type) => {
        setIsLoading(true)
        statisticApi
            .getStatistic(fromDay, toDay, type)
            .then((res) => {
                if (res?.success === true) {
                    setListStatistic(res?.data);
                    setIsLoading(false);
                } else {
                    setListStatistic([]);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                setListStatistic([])
                console.log(err)
            })
    }

    const handleChangePage = (e, newPage) => {
        getSold();
        setPage(newPage)
    };

    const handleChangeSize = (event) => {
        setSize(parseInt(+event.target.value));
        getSold();
        setPage(0);
    };

    const getSold = () => {
        setIsLoading(true)
        managementProductApi
            .getProductBySold(0, 10, 'asc', '')
            .then((res) => {
                if (res?.success === true) {
                    setTotalAmount(res?.data?.totalQuantity)
                    setListSold(res?.data?.list);
                    setIsLoading(false);
                } else {
                    setListSold([]);
                    setTotalAmount(0)
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                setListSold([])
                setTotalAmount(0)
                console.log(err)
            })
    }

    const chartData = {
        labels: listReportSales?.map((item) => { return item?.name }),
        datasets: [
            {
                label: 'Số lương bán',
                data: listReportSales?.map((item) => { return item?.salable }),
                backgroundColor: [
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ]
            }
        ],
    }

    const chartDataStatistic = {
        labels: listStatistic?.map((item) => { return item?.date }),
        datasets: [
            {
                label: 'Doanh thu',
                data: listStatistic?.map((item) => { return item?.revenue }),
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ],
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
                <Menu selected='statistic' />
            </Drawer>
            <div style={{ padding: '70px 15px 70px 15px', height: 'auto' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography onClick={() => handleClickBreadcrumb('/home')} color="gray" fontSize='14px'
                        style={{ cursor: 'pointer' }}>Trang chủ</Typography>
                    <Typography color="var(--main-color)" fontSize='14px'>Thống kê</Typography>
                </Breadcrumbs>
                <div>
                    <div style={{ margin: '15px 0' }}>
                        <h3 style={{ marginBottom: '15px' }}>Thống kê</h3>
                    </div>
                    <Paper style={{ width: '100%', padding: '20px' }}>
                        <h4 style={{ marginBottom: '20px' }}>Thống kê số lượng bán theo sản phẩm</h4>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker
                                    label="Từ ngày"
                                    value={fromDayReportSales}
                                    onChange={(newValue) => setFromDayReportSales(newValue)}
                                />
                                <DatePicker
                                    label="Đến ngày"
                                    value={toDayReportSales}
                                    onChange={(newValue) => setToDayReportSales(newValue)}
                                />
                            </DemoContainer>
                            <Bar
                                data={chartData}
                                options={{
                                    title: {
                                        display: true,
                                        text: 'Largest Cities in Massachusetts',
                                        fontSize: 25
                                    },
                                    legend: {
                                        display: true,
                                        position: 'right'
                                    },
                                }}
                            />
                        </LocalizationProvider>
                        <br />
                        <h4 style={{ marginBottom: '20px' }}>Thống kê doanh thu</h4>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker
                                    label="Từ ngày"
                                    value={fromDayStatistic}
                                    onChange={(newValue) => setFromDayStatistic(newValue)}
                                />
                                <DatePicker
                                    label="Đến ngày"
                                    value={toDayStatistic}
                                    onChange={(newValue) => setToDayStatistic(newValue)}
                                />
                            </DemoContainer>
                            <Line
                                data={chartDataStatistic}
                                options={{
                                    title: {
                                        display: true,
                                        text: 'Largest Cities in Massachusetts',
                                        fontSize: 25
                                    },
                                    legend: {
                                        display: true,
                                        position: 'right'
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Paper>
                    {/* <Paper style={{ width: '100%' }}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table" style={{ width: '100%' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }} align="center">#</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Tên sản phẩm</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="center">Hình ảnh</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Danh mục</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Thương hiệu</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Giá gốc</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Kho</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listSold?.map((product, index) => (
                                        <TableRow key={product?.id} hover role="checkbox" tabIndex={-1}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="left">{product?.name}</TableCell>
                                            <TableCell align="center">
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                    <img style={{ width: '70px' }} alt={product?.name} src={product?.images && product?.images[0] ? product?.images[0]?.url : 'https://static.vecteezy.com/system/resources/thumbnails/011/537/824/small/picture-image-empty-state-single-isolated-icon-with-outline-style-free-vector.jpg'}></img>
                                                    {
                                                        product?.images && product?.images[0] ? '' :
                                                            <span style={{ marginTop: '5px', color: 'red' }}>Chưa cập nhật</span>
                                                    }
                                                </div>
                                            </TableCell>
                                            <TableCell align="left">{product?.nameCategory}</TableCell>
                                            <TableCell align="left">{product?.nameBrand}</TableCell>
                                            <TableCell align="left">{numberWithCommas(product?.originPrice)} VNĐ</TableCell>
                                            <TableCell align="left">{product?.stock}</TableCell>
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
                    </Paper> */}
                </div>
            </div>
            <div style={{ position: 'fixed', bottom: '0', left: '0', width: 'calc(100% - 260px)', marginLeft: '260px' }}>
                <Footer />
            </div>
        </div>
    )
}

export default StatisticManagement;