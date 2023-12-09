import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import '../ProductDetail/ProductDetail.css'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, TextField } from "@mui/material";
import { getProductDetailById } from "../../apis/product.api";
import { useNavigate, useParams } from "react-router-dom";
import { addProductToCart } from "../../apis/cart.api";
import { Loader } from "../../components/Loader/Loader";
import { useDispatch } from "react-redux";
import { actionCartRequest } from "../../redux/actions/ActionsCart";
import { getListComment, createComment } from "../../apis/comment";
import { getHistoryOrderUser } from "../../apis/order.api";

const ProductDetail = () => {
    const [srcImg, setSrcImg] = useState('')
    const [openComment, setOpenComment] = useState(false);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [productDetail, setProductDetail] = useState({});
    const [openZoomImage, setOpenZoomImage] = useState(false);

    // Comment
    const [productComment, setProductComment] = useState([]);
    const [contentComment, setContentComment] = useState('');
    const [errorMessageComment, setErrorMessageComment] = useState('')
    const [page, setPage] = useState(0);
    const [vote, setVote] = useState(0);

    // Orde succes
    const [listOrderSuccess, setListOrderSuccess] = useState([])

    const dispatch = useDispatch()

    const navigate = useNavigate()

    let { id } = useParams()

    const handleClickOpen = () => {
        setOpenComment(true);
    };

    const handleClose = () => {
        setOpenComment(false);
        setContentComment('')
        setErrorMessageComment('')
        setVote(0)
    };

    useEffect(() => {
        getProductDetail(id)
        getOrderSucces()
    }, [id])

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getImage = (src) => {
        setSrcImg(src);
    }

    const sendComment = () => {
        console.log(productDetail?.id, contentComment, vote)
        createProductComment(productDetail?.id, contentComment, vote)
    }

    // redirect to login
    const handleRedirect = () => {
        navigate('/login')
    }

    // Get product detail
    const getProductDetail = (id) => {
        setIsLoading(true)
        getProductDetailById(id)
            .then((res) => {
                if (res) {
                    setIsLoading(false)
                    setProductDetail(res?.data?.data)
                    getProductComment(page, res?.data?.data?.id)
                    setSrcImg(res?.data?.data?.images[0]?.url)
                }
            })
            .catch((err) => {
                if (err) {
                    console.log(err)
                    setIsLoading(false)
                }
            })
    }

    // Get order with status Success
    const getOrderSucces = () => {
        const token = localStorage.getItem('access-token')
        if (!token) {
            return;
        }
        getHistoryOrderUser(0, 100, 'success')
            .then((res) => {
                if (res?.data?.success === true) {
                    setIsLoading(false)
                    setListOrderSuccess(res?.data?.data?.listOrder)
                } else if (res?.data?.success === false) {
                    setListOrderSuccess([])
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                if (err) {
                    console.log(err)
                    setListOrderSuccess([])
                    setIsLoading(false)
                }
            })
    }

    // Check order exist product bought success
    const checkProductExistOrderSuccess = () => {
        let check = false;
        listOrderSuccess?.forEach((order) => {
            order?.items?.forEach(item => {
                if (item?.productId.toString() === id.toString()) {
                    check = true;
                }
            })
        })
        return check;
    }

    // Get comment product
    const getProductComment = (page, productId) => {
        setIsLoading(true)
        getListComment(page, productId)
            .then((res) => {
                if (res?.data?.success === true) {
                    setIsLoading(false)
                    setProductComment(res?.data?.data)
                } else if (res?.data?.success === false) {
                    setProductComment([])
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                if (err) {
                    console.log(err)
                    setProductComment([])
                    setIsLoading(false)
                }
            })
    }
    // Check negative word
    const checkNegativeWord = (text) => {
        const listNegativeWord = ['gạt', 'lừa', 'cắp', 'ngu', 'đểu', 'fake']
        let checkPass = true;
        listNegativeWord.forEach((word) => {
            if(text.includes(word)) {
                checkPass = false
            }
        })
        return checkPass;
    }

    // Create Comment
    const createProductComment = (productId, description, vote) => {
        if (!checkNegativeWord(description)) {
            setErrorMessageComment('Vui lòng không sử dụng các từ ngữ tiêu cực')
            return;
        }
        setIsLoading(true)
        createComment(productId, description, vote)
            .then((res) => {
                if (res) {
                    setIsLoading(false)
                    getProductDetail(id)
                    getProductComment(page, productId)
                }
            })
            .catch((err) => {
                if (err) {
                    console.log(err)
                    setErrorMessageComment('Bạn đã đánh giá sản phẩm này')
                    setIsLoading(false)
                }
            })
    }

    // Add to cart
    const addToCart = (stock) => {
        if (stock === 0) {
            return;
        }
        const token = localStorage.getItem('access-token')
        if (!token) {
            setOpen(true)
            return;
        }
        setIsLoading(true)
        addProductToCart(id, 1)
            .then((res) => {
                if (res?.data?.success === true) {
                    dispatch(actionCartRequest())
                    getProductDetail(id)
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                if (err) {
                    if (err?.request?.status === 401) {
                        setOpen(true)
                    }
                    setIsLoading(false)
                }
            })
    }

    return (
        <div style={{ position: 'relative' }}>
            <Header></Header>
            {
                isLoading === true && <Loader></Loader>
            }
            <div className="container-product-detail">
                <div className="product-detail">
                    <div className="imgae-product">
                        <img style={{ cursor: 'zoom-in' }} onClick={() => setOpenZoomImage(true)} alt="img-product" src={srcImg}></img>
                        <div className="list-detail-imgage">
                            {
                                productDetail?.images?.map((img) => {
                                    return (
                                        <img style={{ border: (img?.url === srcImg) && '1px solid var(--main-color)', cursor: 'pointer' }}
                                            key={img?.id_image} alt={img?.id_image} onClick={() => getImage(img.url)} src={img?.url}></img>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="image-info-detail">
                        <h3 style={{ marginRight: '10px', wordBreak: 'break-all' }}>{productDetail?.name}</h3>
                        <span>(Đã bán {productDetail?.sold} sản phẩm)</span>
                        <div style={{ marginTop: '10px' }}>
                            {
                                productDetail?.stock === 0 ?
                                    <p>Tình trạng: <strong style={{ color: 'red' }}>Hết hàng</strong></p> :
                                    <p>Tình trạng: <strong style={{ color: 'green' }}>Còn hàng</strong></p>
                            }
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Rating name="read-only" value={parseInt(productDetail?.rate)} readOnly /> <span>({productDetail?.rateCount} đánh giá)</span>
                        </div>
                        <p style={{ marginTop: '10px' }}>Thương hiệu: <strong style={{ color: 'var(--main-color)' }}>{productDetail?.nameBrand}</strong></p>
                        <div>
                            <h2 style={{ color: 'var(--main-color)', marginTop: '5px' }} className='price'>{numberWithCommas(parseInt(productDetail?.discountPrice))} VNĐ</h2>
                            <div style={{ display: 'flex' }}>
                                <p style={{ textDecoration: 'line-through', marginRight: '10px' }}>{numberWithCommas(parseInt(productDetail?.originPrice))} VNĐ</p>
                                <p style={{ color: 'var(--main-color)' }}>{productDetail?.discount}%</p>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <h5>Thông số sản phẩm</h5>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    {
                                        productDetail?.productConfiguration &&
                                        Object.keys(productDetail?.productConfiguration[0]).map((key, index) => (
                                            <p style={{ margin: '0 5px 0 0' }} key={index}>- {key}:</p>
                                        ))
                                    }
                                </div>
                                <div>
                                    {
                                        productDetail?.productConfiguration &&
                                        Object.values(productDetail?.productConfiguration[0]).map((key, index) => (
                                            <p style={{ margin: '0' }} key={index}>{key || ''}</p>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', gap: '30px' }}>
                            <button className="view-comment" onClick={handleClickOpen}>Xem đánh giá sản phẩm</button>
                            <button style={{ background: productDetail?.stock === 0 ? '#009ed469' : 'var(--main-color)' }}
                                disabled={productDetail?.stock === 0} onClick={() => addToCart(productDetail?.stock)} className="add-to-cart">
                                <i style={{ marginRight: '10px' }} className="fas fa-cart-plus"></i>Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
                <div className="policy">
                    <h5>Chính sách bán hàng</h5>
                    <span><i className="fas fa-shield-alt"></i>Cam kết hàng chính hãng</span><br />
                    <span><i className="fas fa-shipping-fast"></i>Giao hàng trên toàn quốc</span><br />
                    <span><i className="fas fa-headset"></i>Hỗ trợ đổi trả</span>
                </div>
            </div>
            <div className="container-product-detail">
                <button style={{ background: 'var(--main-color)', border: 'none', padding: '10px', color: '#FFFFFF', borderRadius: '5px' }}
                    onClick={() => navigate(`/product?all=${true}`)} className="add-to-cart">
                    <i style={{ marginRight: '10px' }} className="fas fa-arrow-left"></i>Tiếp tục mua hàng
                </button>
            </div>
            <div className="container-product-detail">
                <div className="detail-infor-product">
                    <h4>Mô tả sản phẩm</h4>
                    <p>{productDetail?.description}</p>
                </div>
            </div>
            <Dialog fullWidth open={openComment} onClose={handleClose}>
                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <Button style={{ width: '100px' }} onClick={handleClose}>Quay lại</Button>
                </div>
                <DialogTitle>Đánh giá sản phẩm</DialogTitle>
                <DialogContent>
                    {
                        checkProductExistOrderSuccess() === true ?
                            <>
                                <DialogContentText>
                                    Chọn sao đánh giá sản phẩm.
                                </DialogContentText>
                                <Rating
                                    style={{ marginBottom: '10px', marginTop: '5px' }}
                                    name="simple-controlled"
                                    value={vote}
                                    onChange={(event, newValue) => {
                                        setVote(newValue);
                                    }}
                                />
                                <DialogContentText>
                                    Nội dung đánh giá sản phẩm.
                                </DialogContentText>
                                <textarea value={contentComment} onChange={(e) => setContentComment(e.target.value)} className="text-area-comment"></textarea>
                                <DialogActions style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'red' }}>{errorMessageComment}</span>
                                    <Button disabled={!contentComment || !vote ? true : false} onClick={sendComment}>Gửi bình luận</Button>
                                </DialogActions>
                            </> : 'Vui lòng mua hàng để có thể đánh giá sản phẩm'
                    }
                    <div className="last-comment">
                        <h5 style={{ marginBottom: '20px' }}>Các đánh giá trước đó <span style={{ color: 'var(--main-color)' }}>({productComment?.numberOfReview ? productComment?.numberOfReview : '0'})</span></h5>
                        {
                            productComment?.allReview?.map((comment) => (
                                <div key={comment?.id} style={{ boxShadow: '1px 2px 10px rgb(224, 224, 224)', padding: '10px', marginTop: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div>
                                            <strong>{comment?.userNameReview}</strong>
                                            <br />
                                            <small style={{ margin: 0 }}>{comment?.commentCreateDate}</small>
                                            <br />
                                            <Rating style={{padding: '10px 0', fontSize: '15px'}} name="read-only" value={parseInt(comment?.rate)} readOnly />
                                        </div>
                                    </div>
                                    <p style={{ marginTop: '10px' }}>{comment?.reviewDescription}</p>
                                </div>
                            ))
                        }
                    </div>
                </DialogContent>
            </Dialog>
            {/* Check login */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Thông báo"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Vui lòng đăng nhập để tiến hành mua hàng
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRedirect}>
                        Đăng nhập
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Open zoom image */}
            <Dialog
                fullScreen
                open={openZoomImage}
                onClose={() => setOpenZoomImage(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent>
                    <div style={{ position: 'fixed', top: '15px', right: '0' }}>
                        <Button style={{ width: '100px' }} onClick={() => setOpenZoomImage(false)}>
                            <i style={{ fontSize: '30px' }} className="fas fa-times"></i>
                        </Button>
                    </div>
                    <DialogContentText style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <img src={srcImg} alt="img-product" />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <Footer></Footer>
        </div>
    )
}

export default ProductDetail;