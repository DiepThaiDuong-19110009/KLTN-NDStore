import { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import Header from "../../../components/Header/Header";
import { Breadcrumbs, Drawer, Modal, TextField, Typography } from "@mui/material";
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Menu from "../../../components/Menu/Menu";
import Footer from "../../../components/Footer/Footer";
import PublishIcon from '@material-ui/icons/Publish';
import { PATH } from "../../../contants/Path";
import managementCategoryApi from "../../../apis/management-category.api";

const CategoryEditManagement = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [openConfirmClose, setOpenConfirmClose] = useState(false);
    const [imageCategory, setImageCategory] = useState('')
    const [state, setState] = useState('')
    const [messageImageCategory, setMessageImagecategory] = useState('')

    let { id } = useParams()

    const navigate = useNavigate()

    const handleClickBreadcrumb = (link) => {
        navigate(link);
    }

    useEffect(() => {
        getCategoryDetail(id)
    }, [id])

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Vui lòng cung cấp tên danh mục')
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const getCategoryDetail = (id) => {
        managementCategoryApi
            .getDetailCategory(id)
            .then((res) => {
                if (res?.success === true) {
                    setImageCategory(res?.data?.imageCategory)
                    setState(res?.data?.state)
                    setValue('name', res?.data?.titleCategory)
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    const handleSelectFile = (e) => {
        setMessageImagecategory('')
        const fileLoaded = URL.createObjectURL(e.target.files[0]);
        setImageCategory(fileLoaded);
        updateImage(e.target.files[0])
    };

    const handleCloseConfirm = () => {
        setOpenConfirmClose(false)
    }

    const onSubmit = (data) => {
        setIsLoading(true)
        managementCategoryApi
            .editCategory(data, state, id)
            .then((res) => {
                if (res?.success === true) {
                    setIsLoading(false)
                    navigate(PATH.CATEGORY)
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    const updateImage = (img) => {
        if (img === '') {
            setMessageImagecategory('Vui lòng cung cấp hình ảnh danh mục');
            return;
        }
        setIsLoading(true)
        managementCategoryApi
            .editImageCategory(img, id)
            .then((res) => {
                if (res?.success === true) {
                    setIsLoading(false)
                    navigate(PATH.CATEGORY)
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
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
                <Menu selected='category' />
            </Drawer>
            <div style={{ padding: '70px 15px 70px 15px' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography onClick={() => handleClickBreadcrumb(PATH.HOME)} color="gray" fontSize='14px' style={{ cursor: 'pointer' }}>Trang chủ</Typography>
                    <Typography onClick={() => handleClickBreadcrumb(PATH.CATEGORY)} color="gray" fontSize='14px' style={{ cursor: 'pointer' }}>Danh mục</Typography>
                    <Typography color="var(--main-color)" fontSize='14px'>Chỉnh sửa danh mục</Typography>
                </Breadcrumbs>
                <div style={{
                    display: 'flex', flexDirection: 'column', gap: '20px',
                    backgroundColor: '#FFFFFF', padding: '20px', marginTop: '20px', borderRadius: '5px'
                }}>
                    <div>
                        <h3 style={{ marginBottom: '20px' }}>Chỉnh sửa danh mục</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', flexDirection: 'column' }}>
                            <h5 style={{
                                color: 'white', background: 'var(--main-color)',
                                padding: '6px 10px', borderRadius: '5px'
                            }}>Chỉnh sửa hình ảnh</h5>
                            <div style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                border: '1px solid #BABABA', padding: '15px', borderRadius: '5px'
                            }}>
                                {
                                    imageCategory ?
                                        <img style={{
                                            width: '150px', minHeight: '150px',
                                            background: '#f2f2f2', boxShadow: '1px 2px 8px gray'
                                        }}
                                            alt="image_category" src={imageCategory}></img>
                                        :
                                        <img style={{
                                            width: '150px', minHeight: '150px',
                                            background: '#f2f2f2', boxShadow: '1px 2px 8px gray'
                                        }}
                                            alt="image_category" src='https://headhuntvietnam.com/images/default.jpg'></img>
                                }
                                <button style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                                    width: '150px', border: 'none', outline: 'none', color: 'white', padding: '7px',
                                    backgroundColor: 'var(--main-color)', marginTop: '15px', borderRadius: '5px'
                                }}>
                                    <PublishIcon />
                                    Cập nhật ảnh
                                </button>
                                <input
                                    onChange={handleSelectFile}
                                    style={{
                                        width: '150px',
                                        height: '30px',
                                        border: '1px solid red',
                                        marginTop: '-30px',
                                        opacity: '0',
                                        cursor: 'pointer'
                                    }}
                                    required
                                    type="file"
                                    multiple={false}
                                />
                                <small style={{ color: 'red', marginTop: '10px', width: '150px', textAlign: 'center' }}>{messageImageCategory}</small>
                            </div>
                            <h5 style={{
                                color: 'white', background: 'var(--main-color)',
                                padding: '6px 10px', borderRadius: '5px'
                            }}>Chỉnh sửa thông tin</h5>
                            <div style={{
                                display: 'flex', flexDirection: 'column',
                                border: '1px solid #BABABA', padding: '15px', borderRadius: '5px'
                            }}>

                                <div>
                                    <TextField
                                        required
                                        id="name"
                                        name="name"
                                        type="text"
                                        label="Tên danh mục"
                                        placeholder="Tên danh mục"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...register('name')}
                                    />
                                    <small style={{ color: 'red' }}>{errors.name?.message}</small>
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
                    <p>Bạn có chắc chắn muốn hủy các thay đổi không?</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'end', marginTop: '50px' }}>
                        <button onClick={() => navigate(PATH.CATEGORY)} style={{
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

export default CategoryEditManagement;