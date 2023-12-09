import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import {
    Alert,
    Breadcrumbs, Drawer, FormControl, FormControlLabel, MenuItem, Modal, Paper, Select, Snackbar, Switch,
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
import managementBrandApi from "../../apis/management-brand.api";
import managementCategoryApi from "../../apis/management-category.api";

const ProductManagement = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [productIdDetail, setProductIdDetail] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    // data for call api get all
    const [size, setSize] = useState(10)
    const [page, setPage] = useState(0)
    const [name, setName] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [brandId, setBrandId] = useState('')

    // set datar response
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [listProduct, setListProduct] = useState([]);
    const [listCategory, setCategory] = useState([])
    const [listBrand, setBrand] = useState([])

    const numberWithCommas = (x) => {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const navigate = useNavigate()

    const handleChangePage = (e, newPage) => {
        getAllProduct(newPage, size, categoryId, brandId, name);
        setPage(newPage)
    };

    const handleChangeSize = (event) => {
        setSize(parseInt(+event.target.value));
        getAllProduct(0, event.target.value, '', '', '');
        setPage(0);
    };

    const handleClickBreadcrumb = (link) => {
        navigate(link);
    }

    useEffect(() => {
        getAllCategory();
        getAllBrand();
    }, [])

    useEffect(() => {
        getAllProduct(page, size, categoryId, brandId, name);
    }, [])

    // Close snackbar
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const getAllBrand = (page, size) => {
        setIsLoading(true)
        managementBrandApi
            .getBrandAll(page, size, 'enable')
            .then((res) => {
                if (res?.success === true) {
                    setBrand(res?.data?.listBrand)
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }


    const getAllCategory = () => {
        setIsLoading(true)
        managementCategoryApi
            .getAllCategory(null, null, 'enable')
            .then((res) => {
                if (res?.success === true) {
                    setCategory(res?.data?.listCategory)
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    // Get all product
    const getAllProduct = (page, size, categoryId, brandId, name) => {
        setIsLoading(true)
        managementProductApi
            .getProductList(page, size, categoryId, brandId, name)
            .then((res) => {
                if (res?.success === true) {
                    setTotalAmount(res?.data?.totalQuantity)
                    setTotalPage(res?.data?.totalPage)
                    setListProduct(res?.data?.list)
                    setIsLoading(false);
                } else {
                    setTotalAmount(0)
                    setTotalPage(0)
                    setListProduct([])
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                if (err?.success === false) {
                    setTotalAmount(0)
                    setListProduct([])
                    setIsLoading(false);
                }
                setIsLoading(false);
                console.log(err)
            })
    }

    const updateStatusProduct = (id, role, images) => {
        if (!id || role === 'Role_Admin') {
            return;
        }
        if (images?.length === 0) {
            setOpenSnackbar(true)
            return;
        }
        setIsLoading(true)
        managementProductApi
            .setStatusProduct(id)
            .then((res) => {
                if (res?.success === true) {
                    getAllProduct(page, size, categoryId, brandId, name);
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

    const searchUser = () => {
        getAllProduct(0, 10, categoryId, brandId, name);
    };

    const resetSearch = () => {
        setName('');
        setCategoryId('');
        setBrandId('');
        setPage(0);
        setSize(10);
        getAllProduct(0, 10, '', '', '');
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
                <Menu selected='product' />
            </Drawer>
            <div style={{ padding: '70px 15px 70px 15px', height: 'auto' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography onClick={() => handleClickBreadcrumb('/home')} color="gray" fontSize='14px'
                        style={{ cursor: 'pointer' }}>Trang chủ</Typography>
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
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="input-search-admin" placeholder="Tìm kiếm bằng tên"></input>
                        <select className="input-search-admin" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                        <option value={''}>Danh mục (Tất cả)</option>
                            {
                                listCategory.map((item) => (
                                    <option value={item.id}>{item.titleCategory}</option>
                                ))
                            }
                        </select>
                        <select className="input-search-admin" value={brandId} onChange={(e) => setBrandId(e.target.value)}>
                        <option value={''}>Thương hiệu (Tất cả)</option>
                            {
                                listBrand.map((item) => (
                                    <option value={item.id}>{item.name}</option>
                                ))
                            }
                        </select>
                        <button onClick={() => searchUser()} className="btn-search-admin">Tìm kiếm</button>
                        <button onClick={() => resetSearch()} className="btn-search-admin">Tải lại</button>
                    </div>
                    {/* <FormControl sx={{ minWidth: 300 }} style={{ marginBottom: '20px', backgroundColor: 'white' }}>
                        <Select
                            value={state}
                            onChange={(e) => { setState(e.target.value); setPage(0); setSize(5) }}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <em>Tất cả trạng thái</em>
                            </MenuItem>
                            <MenuItem value={'enable'}>Đang hoạt động</MenuItem>
                            <MenuItem value={'disable'}>Khóa</MenuItem>
                        </Select>
                    </FormControl> */}
                    <Paper style={{ width: '100%' }}>
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
                                            <TableCell align="left">{numberWithCommas(product?.originPrice)}</TableCell>
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
                                            <TableCell style={{minWidth: '100px'}} align="right">
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

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    Cập nhật trạng thái không thành công. Vui lòng cập nhật hình ảnh sản phẩm
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ProductManagement;