import { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import Header from "../../../components/Header/Header";
import { Breadcrumbs, Drawer, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Menu from "../../../components/Menu/Menu";
import Footer from "../../../components/Footer/Footer";
import AddIcon from '@material-ui/icons/Add';
import { PATH } from "../../../contants/Path";
import PublishIcon from '@material-ui/icons/Publish';
import managementCategoryApi from "../../../apis/management-category.api";
import managementBrandApi from "../../../apis/management-brand.api";
import managementProductApi from "../../../apis/management-product.api";

const ProductEditManagement = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [openConfirmClose, setOpenConfirmClose] = useState(false);
    const [listCategory, setListCategory] = useState([]);
    const [listBrand, setListBrand] = useState([]);
    const [categoryId, setCategoryId] = useState('')
    const [messageCategoryId, setMessageCategoryId] = useState('')
    const [brandId, setBrandId] = useState('')
    const [state, setState] = useState('')
    const [imageBrand, setImageBrand] = useState([])
    const [messageBrandId, setMessageBrandId] = useState('')
    const [messageImageBrand, setMessageImageBrand] = useState('')

    const [inputList, setInputList] = useState([{ key: "", value: "" }]);

    let { id } = useParams()

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { key: "", value: "" }]);
    };

    const navigate = useNavigate()

    const handleClickBreadcrumb = (link) => {
        navigate(link);
    }

    useEffect(() => {
        getProductDetail(id)
        getAllCategory();
        getAllBrand();
    }, [])

    const getProductDetail = (id) => {
        managementProductApi
            .getDetailProduct(id)
            .then((res) => {
                if (res?.success === true) {
                    setValue('name', res?.data?.name)
                    setValue('description', res?.data?.description)
                    setValue('stock', res?.data?.stock)
                    setValue('price', res?.data?.originPrice)
                    setValue('discount', res?.data?.discount)
                    setCategoryId(res?.data?.categoryId)
                    setBrandId(res?.data?.brandId)
                    setState(res?.data?.state)
                    setImageBrand(res?.data?.images)
                    setIsLoading(false);
                    const arr = []
                    for (let key in res?.data?.productConfiguration[0]) {
                        if (res?.data?.productConfiguration[0].hasOwnProperty(key)) {
                            let tempObj = {};
                            tempObj[key] = res?.data?.productConfiguration[0][key];
                            arr.push({key: key, value: tempObj[key]});
                        }
                    }
                    setInputList(arr);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    const getAllBrand = (page, size) => {
        setIsLoading(true)
        managementBrandApi
            .getBrandList(page, size, 'enable')
            .then((res) => {
                if (res?.success === true) {
                    setListBrand(res?.data?.listBrand)
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
            .getCategoryList(null, null, 'enable')
            .then((res) => {
                if (res?.success === true) {
                    setListCategory(res?.data?.listCategory)
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    const updateImage = (img) => {
        if (img === '') {
            setMessageImageBrand('Vui lòng cung cấp hình ảnh thương hiệu');
            return;
        }
        setIsLoading(true)
        managementProductApi
            .addImageProduct(img, id)
            .then((res) => {
                if (res?.success === true) {
                    setIsLoading(false)
                    getProductDetail(id)
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    const handleSelectFile = (e) => {
        setMessageImageBrand('')
        updateImage(e.target.files[0])
    };

    const deleteImage = (idImage) => {
        setIsLoading(true)
        managementProductApi
            .deleteImageProduct(idImage, id)
            .then((res) => {
                if (res?.success === true) {
                    setIsLoading(false)
                    getProductDetail(id)
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    };

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
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });


    const onSubmit = (data) => {
        if (!categoryId) {
            setMessageCategoryId('Vui lòng chọn danh mục')
        }
        if (!messageBrandId) {
            setMessageBrandId('Vui lòng chọn thương hiệu')
        }
        console.log({ ...data, category: categoryId, brand: brandId, state: state }, id)
        setIsLoading(true)
        managementProductApi
            .editProduct({ ...data, category: categoryId, brand: brandId, state: state }, id)
            .then((res) => {
                if (res?.success === true) {
                    navigate(PATH.PRODUCT)
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    const updateConfig = () => {
        let arr = []
        inputList.map((item) => (
            arr.push({ [item.key]: item.value })
        ))
        const mergedObj = arr.reduce((acc, cur) => ({ ...acc, ...cur }), {});
        setIsLoading(true)
        managementProductApi
            .editConfigProduct(mergedObj, id)
            .then((res) => {
                if (res?.success === true) {
                    navigate(PATH.PRODUCT)
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
            <div style={{ padding: '70px 15px 15px 15px', height: 'auto' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography onClick={() => handleClickBreadcrumb(PATH.HOME)} color="gray" fontSize='14px' style={{ cursor: 'pointer' }}>Trang chủ</Typography>
                    <Typography onClick={() => handleClickBreadcrumb(PATH.PRODUCT)} color="gray" fontSize='14px' style={{ cursor: 'pointer' }}>Sản phẩm</Typography>
                    <Typography color="var(--main-color)" fontSize='14px'>Chỉnh sửa sản phẩm</Typography>
                </Breadcrumbs>
                <div style={{
                    display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '70px',
                    backgroundColor: '#FFFFFF', padding: '20px', marginTop: '20px', borderRadius: '5px'
                }}>
                    <div>
                        <h3 style={{ marginBottom: '20px' }}>Chỉnh sửa sản phẩm</h3>
                        <h5 style={{
                            color: 'white', background: 'var(--main-color)',
                            padding: '6px 10px', borderRadius: '5px', marginBottom: '10px'
                        }}>Chỉnh sửa hình ảnh</h5>
                        <div style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            border: '1px solid #BABABA', padding: '15px', borderRadius: '5px'
                        }}>
                            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                                {
                                    imageBrand?.length !== 0 ?
                                        imageBrand?.map((img, index) => (
                                            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <img style={{
                                                    width: '120px', minHeight: '120px',
                                                    background: '#f2f2f2', boxShadow: '1px 2px 8px gray'
                                                }}
                                                    alt="image_brand" src={img?.url}></img>
                                                <button
                                                    onClick={() => deleteImage(img?.id_image)}
                                                    style={{
                                                        width: '40px', marginBottom: '15px', height: '30px', marginTop: '10px',
                                                        border: 'none', backgroundColor: 'red',
                                                        borderRadius: '5px', color: 'white', cursor: 'pointer'
                                                    }}>
                                                    Xóa
                                                </button>
                                            </div>
                                        ))
                                        :
                                        <img style={{
                                            width: '150px', minHeight: '150px',
                                            background: '#f2f2f2', boxShadow: '1px 2px 8px gray'
                                        }}
                                            alt="image_brand" src='https://headhuntvietnam.com/images/default.jpg'></img>
                                }
                            </div>
                            <button style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                                width: '150px', border: 'none', outline: 'none', color: 'white', padding: '7px',
                                backgroundColor: 'var(--main-color)', marginTop: '15px', borderRadius: '5px'
                            }}>
                                <PublishIcon />
                                Thêm ảnh
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
                                multiple={true}
                            />
                            <small style={{ color: 'red', marginTop: '10px', width: '150px', textAlign: 'center' }}>{messageImageBrand}</small>
                        </div>
                        <h5 style={{
                            color: 'white', background: 'var(--main-color)',
                            padding: '6px 10px', borderRadius: '5px', marginBottom: '10px', marginTop: '20px'
                        }}>Chỉnh sửa thông tin</h5>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                            <div style={{
                                display: 'flex', flexDirection: 'column', width: '100%',
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
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
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
                                        rows={10}
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
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
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
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
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...register('stock')}
                                    />
                                    <small style={{ color: 'red' }}>{errors.stock?.message}</small>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
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
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{ maxLength: 5 }}
                                        {...register('discount')}
                                    />
                                    <small style={{ color: 'red' }}>{errors.discount?.message}</small>
                                </div>
                                <div style={{ marginBottom: '30px' }}>
                                    <FormControl style={{ width: '100%' }}>
                                        <InputLabel id="category">Danh mục</InputLabel>
                                        <Select
                                            required
                                            name="category"
                                            labelId="category"
                                            id="category"
                                            label="Danh mục"
                                            onChange={(e) => {
                                                setMessageCategoryId('')
                                                setCategoryId(e.target.value)
                                            }}
                                            value={categoryId}
                                        >
                                            {
                                                listCategory?.length !== 0 &&
                                                listCategory?.map((category) => (
                                                    <MenuItem key={category?.id} value={category?.id}>
                                                        <p>{category?.titleCategory}</p>
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                    <small style={{ color: 'red' }}>{messageCategoryId}</small>
                                </div>
                                <div>
                                    <FormControl style={{ width: '100%' }}>
                                        <InputLabel id="brand">Thương hiệu</InputLabel>
                                        <Select
                                            required
                                            name="brand"
                                            labelId="brand"
                                            id="brand"
                                            label="Thương hiệu"
                                            onChange={(e) => {
                                                setMessageBrandId('')
                                                setBrandId(e.target.value)
                                            }}
                                            value={brandId}
                                        >
                                            {
                                                listBrand?.length !== 0 &&
                                                listBrand?.map((brand) => (
                                                    <MenuItem key={brand?.id} value={brand?.id}>
                                                        <p>{brand?.name}</p>
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                    <small style={{ color: 'red' }}>{errors.brand?.message}</small>
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
                        <h5 style={{
                            color: 'white', background: 'var(--main-color)',
                            padding: '6px 10px', borderRadius: '5px', marginTop: '20px', marginBottom: '10px'
                        }}>Chỉnh sửa thông số</h5>
                        <div style={{ border: '1px solid #BABABA', padding: '15px', borderRadius: '5px' }}>
                            {inputList.map((x, i) => {
                                return (
                                    <>
                                        <div key={i} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                            <input
                                                style={{
                                                    width: '45%', marginBottom: '15px',
                                                    border: '1px solid rgb(133, 133, 133)',
                                                    padding: '15px 10px', borderRadius: '5px'
                                                }}
                                                name="key"
                                                value={x.key}
                                                onChange={e => handleInputChange(e, i)}
                                            />
                                            <input
                                                style={{
                                                    width: '45%', marginBottom: '15px',
                                                    border: '1px solid rgb(133, 133, 133)',
                                                    padding: '15px 10px', borderRadius: '5px'
                                                }}
                                                name="value"
                                                value={x.value}
                                                onChange={e => handleInputChange(e, i)}
                                            />
                                            {inputList.length !== 1 &&
                                                <button
                                                    style={{
                                                        width: '5%', marginBottom: '15px',
                                                        border: 'none', backgroundColor: 'red',
                                                        borderRadius: '5px', color: 'white', cursor: 'pointer'
                                                    }}
                                                    onClick={() => handleRemoveClick(i)}>
                                                    Xóa
                                                </button>}
                                        </div>
                                        <div>
                                            {inputList.length - 1 === i &&
                                                <button style={{
                                                    padding: '5px', border: 'none',
                                                    display: 'flex', alignItems: 'center',
                                                    justifyContent: 'center', gap: '10px', cursor: 'pointer'
                                                }} onClick={handleAddClick}>
                                                    <AddIcon /> Thêm thông số
                                                </button>}
                                        </div>
                                    </>
                                );
                            })}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '40px' }}>
                                <button onClick={() => updateConfig()} style={{
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
            <div style={{ position: 'fixed', bottom: '0', left: '0', width: 'calc(100% - 260px)', marginLeft: '260px', zIndex: '1000' }}>
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
                    <p>Bạn có chắc chắn muốn hủy chỉnh sửa sản phẩm không?</p>
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

export default ProductEditManagement;