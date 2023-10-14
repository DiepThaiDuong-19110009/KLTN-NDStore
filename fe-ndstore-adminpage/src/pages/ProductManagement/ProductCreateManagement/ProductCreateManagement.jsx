import { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import Header from "../../../components/Header/Header";
import { Breadcrumbs, Drawer, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Menu from "../../../components/Menu/Menu";
import Footer from "../../../components/Footer/Footer";
import { PATH } from "../../../contants/Path";
import managementCategoryApi from "../../../apis/management-category.api";

const ProductCreateManagement = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [openConfirmClose, setOpenConfirmClose] = useState(false);
    const [messageImageCategory, setMessageImageCategory] = useState('')

    const navigate = useNavigate()

    const handleClickBreadcrumb = (link) => {
        navigate(link);
    }

    useEffect(() => {
    }, [])

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Vui lòng cung cấp tên sản phẩm'),
        description: Yup.string()
            .required('Vui lòng cung cấp mô tả sản phẩm'),
        price: Yup.string()
            .required('Vui lòng cung cấp giá sản phẩm'),
        stock: Yup.string()
            .required('Vui lòng cung cấp số lượng nhập sản phẩm'),
        discount: Yup.string()
            .required('Vui lòng cung cấp giảm giá sản phẩm'),
        category: Yup.string()
            .required('Vui lòng cung cấp danh mục sản phẩm'),
        brand: Yup.string()
            .required('Vui lòng cung cấp thương hiệu sản phẩm'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
        setIsLoading(true)
        managementCategoryApi
            .createNewCategory(data)
            .then((res) => {
                if (res?.success === true) {
                    navigate(PATH.CATEGORY)
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    const handleCloseConfirm = () => {
        setOpenConfirmClose(false)
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
            <div style={{ backgroundColor: '#f3f3f3', padding: '70px 15px 15px 15px', height: 'auto' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography onClick={() => handleClickBreadcrumb(PATH.HOME)} color="gray" fontSize='14px' style={{ cursor: 'pointer' }}>Trang chủ</Typography>
                    <Typography onClick={() => handleClickBreadcrumb(PATH.PRODUCT)} color="gray" fontSize='14px' style={{ cursor: 'pointer' }}>Sản phẩm</Typography>
                    <Typography color="var(--main-color)" fontSize='14px'>Thêm mới sản phẩm</Typography>
                </Breadcrumbs>
                <div style={{
                    display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '70px',
                    backgroundColor: '#FFFFFF', padding: '20px', marginTop: '20px', borderRadius: '5px'
                }}>
                    <div>
                        <h3 style={{ marginBottom: '20px' }}>Thêm mới sản phẩm</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                            <div style={{
                                display: 'flex', flexDirection: 'column', width: '80%',
                                border: '1px solid #BABABA', padding: '15px', borderRadius: '5px'
                            }}>

                                <div>
                                    <TextField
                                        required
                                        id="name"
                                        name="name"
                                        type="text"
                                        label="Tên sản phẩm"
                                        placeholder="Tên sản phẩm"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        {...register('name')}
                                    />
                                    <small style={{ color: 'red' }}>{errors.name?.message}</small>
                                </div>
                                <div>
                                    <TextField
                                        required
                                        id="description"
                                        name="description"
                                        type="text"
                                        label="Mô tả sản phẩm"
                                        placeholder="Mô tả sản phẩm"
                                        fullWidth
                                        margin="normal"
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                        {...register('description')}
                                    />
                                    <small style={{ color: 'red' }}>{errors.description?.message}</small>
                                </div>
                                <div>
                                    <TextField
                                        required
                                        id="price"
                                        name="price"
                                        type="number"
                                        label="Giá sản phẩm"
                                        placeholder="Giá sản phẩm"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        {...register('price')}
                                    />
                                    <small style={{ color: 'red' }}>{errors.price?.message}</small>
                                </div>
                                <div>
                                    <TextField
                                        required
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        label="Số lượng sản phẩm"
                                        placeholder="Số lượng sản phẩm"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        {...register('stock')}
                                    />
                                    <small style={{ color: 'red' }}>{errors.stock?.message}</small>
                                </div>
                                <div style={{marginBottom: '20px'}}>
                                    <TextField
                                        required
                                        id="discount"
                                        name="discount"
                                        type="number"
                                        label="Giảm giá"
                                        placeholder="Giảm giá"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        inputProps={{ maxLength: 5 }}
                                        {...register('discount')}
                                    />
                                    <small style={{ color: 'red' }}>{errors.discount?.message}</small>
                                </div>
                                <div>
                                    <FormControl style={{ width: '100%' }}>
                                        <InputLabel id="category">Category</InputLabel>
                                        <Select
                                            required
                                            name="category"
                                            labelId="category"
                                            id="category"
                                            label="Category"
                                            {...register('category')}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Twenty</MenuItem>
                                            <MenuItem value={21}>Twenty one</MenuItem>
                                            <MenuItem value={22}>Twenty one and a half</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '40px' }}>
                                    <button onClick={handleSubmit(onSubmit)} style={{
                                        backgroundColor: 'var(--main-color)', border: 'none',
                                        outline: 'none', padding: '10px 20px', color: 'white',
                                        borderRadius: '5px', cursor: 'pointer'
                                    }}>Lưu</button>
                                    <button onClick={() => setOpenConfirmClose(true)} style={{
                                        backgroundColor: 'gray', border: 'none',
                                        outline: 'none', padding: '10px 20px', color: 'white',
                                        borderRadius: '5px', cursor: 'pointer'
                                    }}>Hủy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ position: 'fixed', bottom: '0', left: '0', width: 'calc(100% - 260px)', marginLeft: '260px' }}>
                <Footer />
            </div>
            <Modal
                open={openConfirmClose}
                onClose={handleCloseConfirm}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                <div style={{
                    width: '500px', height: 'auto', margin: '100px auto',
                    background: 'white', overflowY: 'auto', padding: '20px',
                    borderRadius: '5px'
                }}>
                    <p>Bạn có chắc chắn muốn hủy tạo mới sản phẩm không?</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'end', marginTop: '50px' }}>
                        <button onClick={() => navigate(PATH.PRODUCT)} style={{
                            backgroundColor: 'var(--main-color)', border: 'none',
                            outline: 'none', padding: '10px 20px', color: 'white',
                            borderRadius: '5px', cursor: 'pointer'
                        }}>Đồng ý</button>
                        <button onClick={() => handleCloseConfirm()} style={{
                            backgroundColor: 'gray', border: 'none',
                            outline: 'none', padding: '10px 20px', color: 'white',
                            borderRadius: '5px', cursor: 'pointer'
                        }}>Không</button>
                    </div>
                </div>
            </Modal>
        </div >
    )
}

export default ProductCreateManagement;