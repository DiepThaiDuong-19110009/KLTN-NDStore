import { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import CloseIcon from '@material-ui/icons/Close';
import managementProductApi from "../../../apis/management-product.api";

const ProductDetailManagement = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [productDetail, setProductDetail] = useState({})

    const numberWithCommas = (x) => {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        getProductDetail(props?.id);
    }, [props])

    const getProductDetail = (id) => {
        managementProductApi
            .getDetailProduct(id)
            .then((res) => {
                if (res?.success === true) {
                    setProductDetail(res?.data)
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    return (
        <div>
            {isLoading ? <Loading isLoading={isLoading} /> : undefined}
            <div style={{
                width: '600px', height: '90vh', margin: '30px auto',
                background: 'white', overflowY: 'auto',
                borderRadius: '5px'
            }}>
                <div style={{ textAlign: 'right', position: 'sticky', top: '0', left: '0', background: 'white', padding: '10px' }}>
                    <CloseIcon style={{ cursor: 'pointer' }} onClick={props?.handleClose} />
                </div>
                <h4 style={{ textAlign: 'center' }}>Chi tiết sản phẩm</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '10px 20px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <img style={{ width: '150px' }} alt={productDetail?.name} src={productDetail?.images && productDetail?.images[0] ? productDetail?.images[0] : 'https://static.vecteezy.com/system/resources/thumbnails/011/537/824/small/picture-image-empty-state-single-isolated-icon-with-outline-style-free-vector.jpg'}></img>
                    </div>
                    <span>Tên sản phẩm: <strong>{productDetail?.name}</strong></span>
                    <span>Trạng thái: <strong>{productDetail?.state === 'enable' ?
                        <strong style={{ color: 'green' }}>Hoạt động</strong> :
                        <strong style={{ color: 'red' }}>Khóa</strong>}</strong></span>
                    <span>Thuộc danh mục: <strong>{productDetail?.nameCategory}</strong></span>
                    <span>Thương hiệu: <strong>{productDetail?.nameBrand}</strong></span>
                    <span>Mô tả sản phẩm: <strong>{productDetail?.description}</strong></span>
                    <span>Giá bán (trước giảm giá): <strong>{numberWithCommas(productDetail?.originPrice)} VNĐ</strong></span>
                    <span>Giá bán (sau giảm giá): <strong>{numberWithCommas(productDetail?.discountPrice)} VNĐ</strong></span>
                    <span>Giảm giá: <strong>{productDetail?.discount} %</strong></span>
                    <span>Kho: <strong>{productDetail?.stock}</strong></span>
                    <span>Đã bán: <strong>{productDetail?.sold}</strong></span>
                    <span>Đánh giá: <strong>{productDetail?.rate}</strong></span>
                    <span>Ngày tạo sản phẩm: <strong>{productDetail?.createdDate}</strong></span>
                    <div>
                        <div style={{ display: 'flex' }}>
                            <span style={{ marginRight: '10px' }}>Thông số sản phẩm: </span>
                            {
                                (productDetail?.productConfiguration && productDetail?.productConfiguration?.length !== 0) ?
                                <div style={{ display: 'flex' }}>
                                    <div>
                                        {
                                            productDetail?.productConfiguration &&
                                            Object.keys(productDetail?.productConfiguration[0]).map((key, index) => (
                                                <p style={{ marginRight: '5px' }} key={index}>- {key}:</p>
                                            ))
                                        }
                                    </div>
                                    <strong>
                                        {
                                            productDetail?.productConfiguration &&
                                            Object.values(productDetail?.productConfiguration[0]).map((key, index) => (
                                                <p key={index}>{key || ''}</p>
                                            ))
                                        }
                                    </strong>
                                </div> : 'Chưa cập nhật'
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailManagement