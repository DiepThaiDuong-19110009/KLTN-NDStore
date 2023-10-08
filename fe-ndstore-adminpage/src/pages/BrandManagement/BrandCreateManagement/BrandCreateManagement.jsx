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
import { PATH } from "../../../contants/Path";

const BrandCreateManagement = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [openConfirmClose, setOpenConfirmClose] = useState(false);
    const [imageBrand, setImageBrand] = useState('https://icon-library.com/images/icon-uploader/icon-uploader-25.jpg')
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
            .required('Tên chưa được cung cấp')
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
            setMessageImageBrand('Hình ảnh chưa được cung cấp');
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
        <div style={{ minHeight: '100vh', paddingLeft: '260px' }}>
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
            <div style={{ backgroundColor: '#f3f3f3', padding: '70px 15px 15px 15px', height: '100vh' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography onClick={() => handleClickBreadcrumb(PATH.HOME)} color="gray" fontSize='14px' style={{ cursor: 'pointer' }}>Trang chủ</Typography>
                    <Typography onClick={() => handleClickBreadcrumb(PATH.BRAND)} color="gray" fontSize='14px' style={{ cursor: 'pointer' }}>Thương hiệu</Typography>
                    <Typography color="var(--main-color)" fontSize='14px'>Thêm mới thương hiệu</Typography>
                </Breadcrumbs>
                <div style={{
                    display: 'flex', flexDirection: 'column', gap: '20px',
                    backgroundColor: '#FFFFFF', padding: '20px', marginTop: '20px', borderRadius: '5px'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ marginBottom: '10px' }}>Hình ảnh thương hiệu</label>
                        <img style={{
                            width: '150px', height: '150px',
                            background: '#f2f2f2', boxShadow: '1px 2px 8px gray'
                        }}
                            alt="image_brand" src={imageBrand}></img>
                        <input
                            onChange={handleSelectFile}
                            style={{
                                width: '150px',
                                height: '150px',
                                border: '1px solid red',
                                opacity: '0',
                                marginTop: '-150px'
                            }}
                            required
                            type="file"
                            multiple={false}
                        />
                        <span style={{ color: 'red' }}>{messageImageBrand}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            style={{
                                width: '50%'
                            }}
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
                        <span style={{ color: 'red' }}>{errors.name?.message}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <button onClick={handleSubmit(onSubmit)} style={{
                            backgroundColor: 'var(--main-color)', border: 'none',
                            outline: 'none', padding: '10px 20px', color: 'white',
                            borderRadius: '5px', cursor: 'pointer'
                        }}>Lưu</button>
                        <button onClick={() => setOpenConfirmClose(true)} style={{
                            backgroundColor: 'red', border: 'none',
                            outline: 'none', padding: '10px 20px', color: 'white',
                            borderRadius: '5px', cursor: 'pointer'
                        }}>Hủy</button>
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
                            backgroundColor: 'red', border: 'none',
                            outline: 'none', padding: '10px 20px', color: 'white',
                            borderRadius: '5px', cursor: 'pointer'
                        }}>Không</button>
                    </div>
                </div>
            </Modal>
        </div >
    )
}

export default BrandCreateManagement;