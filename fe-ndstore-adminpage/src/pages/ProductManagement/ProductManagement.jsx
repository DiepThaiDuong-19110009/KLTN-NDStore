import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import {
    Breadcrumbs, Drawer, FormControlLabel, Modal, Paper, Switch,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TablePagination, TableRow, Typography
} from "@mui/material";
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import managementProductApi from "../../apis/management-product.api";
import { PATH } from "../../contants/Path";
import ProductDetailManagement from "./ProductDetailManagement/ProductDetailManagement";

const ProductManagement = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [productIdDetail, setProductIdDetail] = useState('')
    // data for call api get all
    const [size, setSize] = useState(5)
    const [page, setPage] = useState(0)

    // set datar response
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [listProduct, setListProduct] = useState([]);

    const navigate = useNavigate()

    const handleChangePage = (e, newPage) => {
        setPage(newPage)
        getAllProduct(newPage, size);
    };

    const handleChangeSize = (event) => {
        getAllProduct(0, event.target.value);
        setSize(parseInt(+event.target.value));
        setPage(0);
    };

    const handleClickBreadcrumb = (link) => {
        navigate(link);
    }

    useEffect(() => {
        getAllProduct(page, size);
    }, [])

    const getAllProduct = (page, size) => {
        setIsLoading(true)
        managementProductApi
            .getProductList(page, size)
            .then((res) => {
                if (res?.success === true) {
                    setTotalAmount(res?.data?.totalQuantity)
                    setTotalPage(res?.data?.totalPage)
                    setListProduct(res?.data?.list)
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    const updateStatusProduct = (id, role, images) => {
        console.log(images)
        if (!id || role === 'Role_Admin') {
            return;
        }
        if (images?.length === 0) {
            console.log('Vui lòng cập nhật')
            return;
        }
        setIsLoading(true)
        managementProductApi
            .setStatusProduct(id)
            .then((res) => {
                if (res?.success === true) {
                    getAllProduct(page, size);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    const showDetailProduct = (id) => {
        setProductIdDetail(id)
        setOpenDetail(true)
    }

    const handleClose = () => {
        setOpenDetail(false)
    }

    return (
        <div style={{ minHeight: '100vh', paddingLeft: '260px' }}>
            {isLoading ? <Loading isLoading={isLoading} /> : undefined}
            <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', zIndex: '1300' }}>
                <Header />
            </div>
            <Drawer
                variant="permanent"
                open
                anchor="left">
                <Menu selected='product' />
            </Drawer>
            <div style={{ backgroundColor: '#f3f3f3', padding: '70px 15px 15px 15px', height: '100vh' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography onClick={() => handleClickBreadcrumb('/home')} color="gray" fontSize='14px' style={{ cursor: 'pointer' }}>Trang chủ</Typography>
                    <Typography color="var(--main-color)" fontSize='14px'>Quản lý sản phẩm</Typography>
                </Breadcrumbs>
                <div>
                    <div style={{ margin: '15px 0' }}>
                        <h3 style={{ marginBottom: '15px' }}>Quản lý sản phẩm</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Tổng số sản phẩm: <strong>{totalAmount}</strong></span>
                            <button onClick={() => navigate(PATH.PRODUCT_CREATE)} style={{
                                backgroundColor: 'var(--main-color)', border: 'none',
                                outline: 'none', padding: '10px 20px', color: 'white', borderRadius: '5px', cursor: 'pointer'
                            }}>Thêm mới</button>
                        </div>
                    </div>
                    <Paper style={{ width: '100%' }}>
                        <TableContainer style={{ maxHeight: '400px' }} component={Paper}>
                            <Table stickyHeader aria-label="sticky table" style={{ width: '100%' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }} align="center">#</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Tên sản phẩm</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="center">Hình ảnh</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Danh mục</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Thương hiệu</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Giá gốc</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Giảm giá</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Kho</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Trạng thái</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listProduct?.map((product, index) => (
                                        <TableRow key={product?.id} hover role="checkbox" tabIndex={-1}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="left">{product?.name}</TableCell>
                                            <TableCell align="center">
                                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                                    <img style={{ width: '70px' }} alt={product?.name} src={product?.images && product?.images[0] ? product?.images[0]?.url : 'https://static.vecteezy.com/system/resources/thumbnails/011/537/824/small/picture-image-empty-state-single-isolated-icon-with-outline-style-free-vector.jpg'}></img>
                                                    {
                                                        product?.images && product?.images[0] ? '' :
                                                            <span style={{marginTop: '5px', color: 'red'}}>Chưa cập nhật</span>
                                                    }
                                                </div>
                                            </TableCell>
                                            <TableCell align="left">{product?.nameCategory}</TableCell>
                                            <TableCell align="left">{product?.nameBrand}</TableCell>
                                            <TableCell align="left">{product?.originPrice}</TableCell>
                                            <TableCell align="left">{product?.discount}%</TableCell>
                                            <TableCell align="left">{product?.stock}</TableCell>
                                            <TableCell align="left">
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={product.state === 'enable'}
                                                            onChange={() => updateStatusProduct(product?.id, product?.state, product?.images)}
                                                            name="checkedB"
                                                            color="primary"
                                                        />
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <EditIcon
                                                    onClick={() => navigate(PATH.PRODUCT + '/' + product?.id)}
                                                    style={{
                                                        fontSize: '28px', background: 'transparent', padding: '5px',
                                                        borderRadius: '50%', border: '1px solid var(--main-color)',
                                                        color: 'var(--main-color)', cursor: 'pointer', marginRight: '7px'
                                                    }} />
                                                <VisibilityIcon
                                                    onClick={() => showDetailProduct(product?.id)}
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
                    <ProductDetailManagement id={productIdDetail} handleClose={handleClose}></ProductDetailManagement>
                </div>
            </Modal>
        </div>
    )
}

export default ProductManagement;