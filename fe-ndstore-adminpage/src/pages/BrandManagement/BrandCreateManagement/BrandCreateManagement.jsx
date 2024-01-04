import { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import Header from "../../../components/Header/Header";
import { Breadcrumbs, Drawer, Modal, TextField, Typography } from "@mui/material";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Menu from "../../../components/Menu/Menu";
import Footer from "../../../components/Footer/Footer";
import managementBrandApi from "../../../apis/management-brand.api";
import PublishIcon from '@material-ui/icons/Publish';
import { PATH } from "../../../contants/Path";

const BrandCreateManagement = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [openConfirmClose, setOpenConfirmClose] = useState(false);
    const [openPopupError, setOpenPopupError] = useState(false);
    const [imageBrand, setImageBrand] = useState('')
    const [imageBrandData, setImageBrandData] = useState('')
    const [messageImageBrand, setMessageImageBrand] = useState('')

    const navigate = useNavigate()

    const handleClickBreadcrumb = (link) => {
        navigate(link);
    }

    useEffect(() => {
    }, [])

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Vui lòng cung cấp tên thương hiệu')
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
        if (imageBrand === '') {
            setMessageImageBrand('Vui lòng cung cấp hình ảnh thương hiệu');
            return;
        }
        setIsLoading(true)
        managementBrandApi
            .createNewBrand({ ...data, file: imageBrandData })
            .then((res) => {
                if (res?.success === true) {
                    navigate(PATH.BRAND)
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
                setOpenPopupError(true)
            })
    }

    const handleSelectFile = (e) => {
        setMessageImageBrand('')
        const fileLoaded = URL.createObjectURL(e.target.files[0]);
        setImageBrand(fileLoaded);
        setImageBrandData(e.target.files[0])
    };

    const handleCloseConfirm = () => {
        setOpenConfirmClose(false)
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
            <div style={{ padding: '70px 15px 15px 15px', height: 'auto' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography onClick={() => handleClickBreadcrumb(PATH.HOME)} color="gray" fontSize='14px' style={{ cursor: 'pointer' }}>Trang chủ</Typography>
                    <Typography onClick={() => handleClickBreadcrumb(PATH.BRAND)} color="gray" fontSize='14px' style={{ cursor: 'pointer' }}>Thương hiệu</Typography>
                    <Typography color="var(--main-color)" fontSize='14px'>Thêm mới thương hiệu</Typography>
                </Breadcrumbs>
                <div style={{
                    display: 'flex', flexDirection: 'column', gap: '20px',
                    backgroundColor: '#FFFFFF', padding: '20px', marginTop: '20px', borderRadius: '5px'
                }}>
                    <div>
                        <h3 style={{ marginBottom: '20px' }}>Thêm mới thương hiệu</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                            <div style={{
                                display: 'flex', flexDirection: 'column',
                                border: '1px solid #BABABA', padding: '15px', borderRadius: '5px'
                            }}>
                                {
                                    imageBrand ?
                                        <img style={{
                                            width: '150px', minHeight: '150px',
                                            background: '#f2f2f2', boxShadow: '1px 2px 8px gray'
                                        }}
                                            alt="image_brand" src={imageBrand}></img>
                                        :
                                        <img style={{
                                            width: '150px', minHeight: '150px',
                                            background: '#f2f2f2', boxShadow: '1px 2px 8px gray'
                                        }}
                                            alt="image_brand" src='https://headhuntvietnam.com/images/default.jpg'></img>
                                }
                                <button style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                                    width: '150px', border: 'none', outline: 'none', color: 'white', padding: '7px',
                                    backgroundColor: 'var(--main-color)', marginTop: '15px', borderRadius: '5px'
                                }}>
                                    <PublishIcon />
                                    Tải ảnh lên
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
                                <small style={{ color: 'red', marginTop: '10px', width: '150px', textAlign: 'center' }}>{messageImageBrand}</small>
                            </div>
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
                                        label="Tên thương hiệu"
                                        placeholder="Tên thương hiệu"
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
                    <p>Bạn có chắc chắn muốn hủy tạo mới thương hiệu không?</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'end', marginTop: '50px' }}>
                        <button onClick={() => navigate(PATH.BRAND)} style={{
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

            <Modal
                open={openPopupError}
                onClose={() => setOpenPopupError(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                <div style={{
                    width: '500px', height: 'auto', margin: '100px auto',
                    background: 'white', overflowY: 'auto', padding: '20px',
                    borderRadius: '5px'
                }}>
                    <p>Tên thương hiệu đã tồn tại. Vui lòng nhập tên thương hiệu khác.</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'end', marginTop: '50px' }}>
                        <button onClick={() => setOpenPopupError(false)} style={{
                            backgroundColor: 'gray', border: 'none',
                            outline: 'none', padding: '10px 20px', color: 'white',
                            borderRadius: '5px', cursor: 'pointer'
                        }}>OK</button>
                    </div>
                </div>
            </Modal>
        </div >
    )
}

export default BrandCreateManagement;