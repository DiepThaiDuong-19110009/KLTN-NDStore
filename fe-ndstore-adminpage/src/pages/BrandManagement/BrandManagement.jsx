import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";
import { Breadcrumbs, Drawer, FormControlLabel, Modal, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import managementBrandApi from "../../apis/management-brand.api";
import BrandDetailManagement from "./BrandDetailManagement/BrandDetailManagement";
import { PATH } from "../../contants/Path";

const BrandManagement = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [brandIdDetail, setBrandIdDetail] = useState('')

    // data for call api get all
    const [size, setSize] = useState(5)
    const [page, setPage] = useState(0)

    // set datar response
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [listBrand, setListBrand] = useState([]);

    const navigate = useNavigate()

    const handleChangePage = (e, newPage) => {
        setPage(newPage)
        getAllBrand(newPage, size);
    };

    const handleChangeSize = (event) => {
        getAllBrand(0, event.target.value);
        setSize(parseInt(+event.target.value));
        setPage(0);
    };

    const handleClickBreadcrumb = (link) => {
        navigate(link);
    }

    useEffect(() => {
        getAllBrand(page, size);
    }, [])

    const getAllBrand = (page, size) => {
        setIsLoading(true)
        managementBrandApi
            .getBrandList(page, size, '')
            .then((res) => {
                if (res?.success === true) {
                    setTotalAmount(res?.data?.totalBrand)
                    setTotalPage(res?.data?.totalPage)
                    setListBrand(res?.data?.listBrand)
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    const updateStatusBrand = (id, state) => {
        if (!id || !state) {
            return;
        }
        setIsLoading(true)
        if (state === 'enable') {
            managementBrandApi
                .setStatusBrandToDisable(id)
                .then((res) => {
                    if (res?.success === true) {
                        getAllBrand(page, size);
                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log(err?.status)
                })
        } else if (state === 'disable') {
            managementBrandApi
                .setStatusBrandToEnable(id)
                .then((res) => {
                    if (res?.success === true) {
                        getAllBrand(page, size);
                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log(err)
                })
        }
    }

    const showDetailUser = (id) => {
        setBrandIdDetail(id)
        setOpenDetail(true)
    }

    const handleClose = () => {
        setOpenDetail(false)
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
                <Menu selected='brand' />
            </Drawer>
            <div style={{ padding: '70px 15px 70px 15px', height: 'auto' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography onClick={() => handleClickBreadcrumb('/home')} color="gray" fontSize='14px' style={{ cursor: 'pointer' }}>Trang chủ</Typography>
                    <Typography color="var(--main-color)" fontSize='14px'>Quản lý thương hiệu</Typography>
                </Breadcrumbs>
                <div>
                    <div style={{ margin: '15px 0' }}>
                        <h3 style={{ marginBottom: '15px' }}>Quản lý thương hiệu</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Tổng số thương hiệu: <strong>{totalAmount}</strong></span>
                            <button onClick={() => navigate(PATH.BRAND_CREATE)} style={{
                                backgroundColor: 'var(--main-color)', border: 'none',
                                outline: 'none', padding: '10px 20px', color: 'white', borderRadius: '5px', cursor: 'pointer'
                            }}>Thêm mới</button>
                        </div>
                    </div>
                    <Paper style={{ width: '100%' }}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table" style={{ width: '100%' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }} align="center">#</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Tên thương hiệu</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Hình ảnh</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Trạng thái</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listBrand?.map((brand, index) => (
                                        <TableRow key={brand?.id} hover role="checkbox" tabIndex={-1}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="left">{brand?.name}</TableCell>
                                            <TableCell align="left">
                                                <img style={{ width: '70px' }} alt={brand?.name} src={brand?.imageBrand}></img>
                                            </TableCell>
                                            <TableCell align="left">
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={brand.state === 'enable'}
                                                            onChange={() => updateStatusBrand(brand?.id, brand?.state)}
                                                            name="checkedB"
                                                            color="primary"
                                                        />
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <EditIcon
                                                onClick={() => navigate(PATH.BRAND + '/' + brand?.id)}
                                                    style={{
                                                        fontSize: '28px', background: 'transparent', padding: '5px',
                                                        borderRadius: '50%', border: '1px solid var(--main-color)',
                                                        color: 'var(--main-color)', cursor: 'pointer', marginRight: '7px'
                                                    }} />
                                                <VisibilityIcon
                                                    onClick={() => showDetailUser(brand?.id)}
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
                    <BrandDetailManagement id={brandIdDetail} handleClose={handleClose}></BrandDetailManagement>
                </div>
            </Modal>
        </div>
    )
}

export default BrandManagement;