import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import '../ProductDetail/ProductDetail.css'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { getProductDetailById } from "../../apis/product.api";
import { useNavigate, useParams } from "react-router-dom";
import { addProductToCart } from "../../apis/cart.api";
import { Loader } from "../../components/Loader/Loader";
import { useDispatch } from "react-redux";
import { actionCartRequest } from "../../redux/actions/ActionsCart";

const ProductDetail = () => {
    const [srcImg, setSrcImg] = useState('')
    const [openComment, setOpenComment] = useState(false);
    const [contentComment, setContentComment] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const [productDetail, setProductDetail] = useState({})

    const dispatch = useDispatch()

    const navigate = useNavigate()

    let { id } = useParams()

    const handleClickOpen = () => {
        setOpenComment(true);
    };

    const handleClose = () => {
        setOpenComment(false);
        setContentComment('')
    };

    useEffect(() => {
        getProductDetail(id)
    }, [id])

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getImage = (src) => {
        setSrcImg(src);
    }

    const sendComment = () => {
        console.log(contentComment)
    }

    const getProductDetail = (id) => {
        setIsLoading(true)
        getProductDetailById(id)
            .then((res) => {
                if (res) {
                    setIsLoading(false)
                    setProductDetail(res?.data?.data)
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

    const addToCart = (stock) => {
        if (stock === 0) {
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
                    console.log(err)
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
                <button style={{ background: 'var(--main-color)', border: 'none', padding: '10px', color: '#FFFFFF', borderRadius: '5px' }}
                    onClick={() => navigate(-1)} className="add-to-cart">
                    <i style={{ marginRight: '10px' }} className="fas fa-arrow-left"></i>Tiếp tục mua hàng
                </button>
            </div>
            <div className="container-product-detail">
                <div className="product-detail">
                    <div className="imgae-product">
                        <img alt="img-product" src={srcImg}></img>
                        <div className="list-detail-imgage">
                            {
                                productDetail?.images?.map((img) => {
                                    return (
                                        <img key={img?.id_image} alt={img?.id_image} onClick={() => getImage(img.url)} src={img?.url}></img>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="image-info-detail">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h3 style={{ marginRight: '10px' }}>{productDetail?.name}</h3><span>(Đã bán {productDetail?.sold} sản phẩm)</span>
                        </div>
                        <div>
                            {
                                productDetail?.stock === 0 ?
                                    <p>Tình trạng: <strong style={{ color: 'red' }}>Hết hàng</strong></p> :
                                    <p>Tình trạng: <strong style={{ color: 'green' }}>Còn hàng</strong></p>
                            }
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
                                        productDetail?.productConfiguration[0] &&
                                        Object.keys(productDetail?.productConfiguration[0]).map((key, index) => (
                                            <p style={{marginRight: '5px'}} key={index}>- {key}:</p>
                                        ))
                                    }
                                </div>
                                <div>
                                    {
                                        productDetail?.productConfiguration[0] &&
                                        Object.values(productDetail?.productConfiguration[0]).map((key, index) => (
                                            <p key={index}>{key || ''}</p>
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
                <div className="detail-infor-product">
                    <h4>Mô tả sản phẩm</h4>
                    <p>{productDetail?.description}</p>
                </div>
            </div>
            <Dialog fullWidth open={openComment} onClose={handleClose}>
                <DialogTitle>Đánh giá sản phẩm</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Vui lòng đánh giá sản phẩm.
                    </DialogContentText>
                    <textarea value={contentComment} onChange={(e) => setContentComment(e.target.value)} className="text-area-comment"></textarea>
                    <DialogActions>
                        <Button onClick={handleClose}>Hủy</Button>
                        <Button disabled={!contentComment ? true : false} onClick={sendComment}>Gửi đánh giá</Button>
                    </DialogActions>
                    <div className="last-comment">
                        <h5 style={{ marginBottom: '20px' }}>Các đánh giá trước đó <span style={{ color: 'var(--main-color)' }}>(5)</span></h5>
                        <div style={{ boxShadow: '1px 2px 10px rgb(224, 224, 224)', padding: '10px', marginTop: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQAp-kUfbmEzt3HLLzgNOoQjCsz-mywoifMg&usqp=CAU" alt="" className="avatar-comment"></img>
                                <div>
                                    <strong>Duong Diep</strong><br />
                                    <small style={{ margin: 0 }}>20/07/2023 13:40</small>
                                </div>
                            </div>
                            <p style={{ marginTop: '10px' }}>Sản phẩm tạm ổn</p>
                        </div>
                        <div style={{ boxShadow: '1px 2px 10px rgb(224, 224, 224)', padding: '10px', marginTop: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQAp-kUfbmEzt3HLLzgNOoQjCsz-mywoifMg&usqp=CAU" alt="" className="avatar-comment"></img>
                                <div>
                                    <strong>Duong Diep</strong><br />
                                    <small style={{ margin: 0 }}>20/07/2023 13:40</small>
                                </div>
                            </div>
                            <p style={{ marginTop: '10px' }}>Sản phẩm tạm ổn</p>
                        </div>
                        <div style={{ boxShadow: '1px 2px 10px rgb(224, 224, 224)', padding: '10px', marginTop: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQAp-kUfbmEzt3HLLzgNOoQjCsz-mywoifMg&usqp=CAU" alt="" className="avatar-comment"></img>
                                <div>
                                    <strong>Duong Diep</strong><br />
                                    <small style={{ margin: 0 }}>20/07/2023 13:40</small>
                                </div>
                            </div>
                            <p style={{ marginTop: '10px' }}>Sản phẩm tạm ổn</p>
                        </div>
                        <div style={{ boxShadow: '1px 2px 10px rgb(224, 224, 224)', padding: '10px', marginTop: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQAp-kUfbmEzt3HLLzgNOoQjCsz-mywoifMg&usqp=CAU" alt="" className="avatar-comment"></img>
                                <div>
                                    <strong>Duong Diep</strong><br />
                                    <small style={{ margin: 0 }}>20/07/2023 13:40</small>
                                </div>
                            </div>
                            <p style={{ marginTop: '10px' }}>Sản phẩm tạm ổn</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <Footer></Footer>
        </div>
    )
}

export default ProductDetail;