import { Breadcrumbs, Drawer, Paper, Typography } from "@mui/material";
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
ChartJS.register(...registerables);

const StatisticManagement = () => {
    const [isLoading, setIsLoading] = useState(false);
    // Report sales
    const [fromDayReportSales, setFromDayReportSales] = useState(dayjs('2023-09-01'))
    const [toDayReportSales, setToDayReportSales] = useState(dayjs(new Date()))
    // const [dataChartReportSales, setDataChartReportSales] = useState()
    // Statistic
    const [fromDayStatistic, setFromDayStatistic] = useState(dayjs('2023-09-01'))
    const [toDayStatistic, setToDayStatistic] = useState(dayjs(new Date()))
    const [type, setType] = useState('month')

    const [listStatistic, setListStatistic] = useState([])
    const [listReportSales, setListReportSales] = useState([])

    const navigate = useNavigate();

    const handleClickBreadcrumb = (link) => {
        navigate(link);
    }

    useEffect(() => {
        getStatistic(fromDayStatistic.format('DD-MM-YYYY'), toDayStatistic.format('DD-MM-YYYY'), type)
    }, [toDayStatistic, fromDayStatistic, type])

    useEffect(() => {
        getProductSales(fromDayReportSales.format('DD-MM-YYYY'), toDayReportSales.format('DD-MM-YYYY'));
    }, [fromDayReportSales, toDayReportSales])

    const getProductSales = (fromDay, toDay) => {
        setIsLoading(true)
        statisticApi
            .getReportProductSales(fromDay, toDay)
            .then((res) => {
                if (res?.success === true) {
                    setListReportSales(res?.data)
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
                }
            })
            .catch((err) => {
                setIsLoading(false);
                setListStatistic([])
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
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
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
                </div>
            </div>
            <div style={{ position: 'fixed', bottom: '0', left: '0', width: 'calc(100% - 260px)', marginLeft: '260px' }}>
                <Footer />
            </div>
        </div>
    )
}

export default StatisticManagement;