import CardProduct from "../../components/CardProduct/CardProduct";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Pagination } from "@mui/material";
import '../Product/Product.css'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductByPage } from "../../apis/product.api";
import { Loader } from "../../components/Loader/Loader";

const Product = () => {
    const [page, setPage] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0)
    const [isLoading, setIsLoading] = useState(false);

    const handleChangePage = (event, value) => {
        console.log(listProduct)
        setPage(value);
    };
    const [listProduct, setListProduct] = useState([])

    useEffect(() => {
        getProduct(page)
    }, [page])

    const getProduct = (page) => {
        setIsLoading(true)
        getProductByPage(page - 1)
            .then((res) => {
                if (res?.data?.success === true) {
                    setIsLoading(false);
                    setTotalAmount(res?.data?.data?.totalQuantity);
                    setListProduct(res?.data?.data?.list)
                }
            })
            .catch((err) => {
                setListProduct([])
                setIsLoading(false)
                return err;
            })
    }

    return (
        <div>
            <Header></Header>
            {
                isLoading === true && <Loader></Loader>
            }
            <div className="container-product">
                <div className="filter-product">
                    <div className="filter-action">
                        <button>Lọc <i className="fas fa-filter"></i></button>
                        <button>Reset <i className="fas fa-undo"></i></button>
                    </div>
                    <hr />
                    <div className="range">
                        <strong>Chọn khoảng giá</strong>
                        <div style={{ marginTop: '10px' }}>
                            <label style={{ margin: 0, padding: 0 }}>Từ:</label>
                            <input value={0} min={0} style={{ margin: '0 0 10px 0' }} type="number"></input>
                            <label style={{ margin: 0, padding: 0 }}>Đến:</label>
                            <input value={10000000} max={10000000} type="number"></input>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <strong>Thương hiệu</strong>
                        <div style={{ margin: '10px 0' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input style={{ marginRight: '10px' }} type="checkbox"></input>
                                <label style={{ margin: 0, padding: 0 }}>ASUS</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input style={{ marginRight: '10px' }} type="checkbox"></input>
                                <label style={{ margin: 0, padding: 0 }}>MSI</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input style={{ marginRight: '10px' }} type="checkbox"></input>
                                <label style={{ margin: 0, padding: 0 }}>ACER</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input style={{ marginRight: '10px' }} type="checkbox"></input>
                                <label style={{ margin: 0, padding: 0 }}>HP</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input style={{ marginRight: '10px' }} type="checkbox"></input>
                                <label style={{ margin: 0, padding: 0 }}>LG</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="list-product">
                    <div className="name-category">
                        <h4>Tìm thấy: <span>{totalAmount} sản phẩm</span></h4>
                    </div>
                    <div className="filter-by">
                        <strong>Sắp xếp theo</strong>
                        <button>Giá tăng dần</button>
                        <button>Giá giảm dần dần</button>
                        <button>Sản phẩm mới nhất</button>
                        <button>Sản phẩm bán chạy nhất</button>
                    </div>
                    <div className="products">
                        {
                            listProduct.length !== 0 ?
                            listProduct.map((product) => (
                                <div key={product?.id}>
                                    <CardProduct
                                        src={product?.images[0]?.url || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXp7vG6vsG3u77s8fTCxsnn7O/f5OfFyczP09bM0dO8wMPk6ezY3eDd4uXR1tnJzdBvAX/cAAACVElEQVR4nO3b23KDIBRA0ShGU0n0//+2KmO94gWZ8Zxmr7fmwWEHJsJUHw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwO1MHHdn+L3rIoK6eshsNJ8kTaJI07fERPOO1Nc1vgQm2oiBTWJ+d8+CqV1heplLzMRNonED+4mg7L6p591FC+133/xCRNCtd3nL9BlxWP++MOaXFdEXFjZ7r8D9l45C8y6aG0cWtP/SUGhs2d8dA/ZfGgrzYX+TVqcTNRRO9l+fS5eSYzQs85psUcuzk6igcLoHPz2J8gvzWaH/JLS+95RfOD8o1p5CU5R7l5LkfKEp0mQ1UX7hsVXqDpRrifILD/3S9CfmlUQFhQfuFu0STTyJ8gsP3PH7GVxN1FC4t2sbBy4TNRTu7LyHJbqaqKFw+/Q0ncFloo7CjRPwMnCWqKXQZ75El4nKC9dmcJaou9AXOE5UXbi+RGeJygrz8Uf+GewSn9uXuplnWDZJ7d8f24F/s6iq0LYf9olbS3Q8i5oKrRu4S9ybwaQ/aCkqtP3I28QDgeoK7TBya/aXqL5COx67PTCD2grtdOwH+pQV2r0a7YVBgZoKwwIVFQYG6ikMDVRTGByopjD8ATcKb0UhhRTe77sKs2DV7FKSjId18TUEBYVyLhUThWfILHTDqmI85/2RWWjcE/bhP6OD7maT3h20MHsA47JC3PsW0wcwLhv9t0OOPOIkCn21y2bXXwlyylxiYMPk1SuCSmpfK8bNQvIrpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwNX4BCbAju9/X67UAAAAASUVORK5CYII='}
                                        brand={product?.nameBrand}
                                        name={product?.name}
                                        price={product?.discountPrice}
                                        discount={product?.originPrice}
                                        discountPercent={product?.discount}>
                                    </CardProduct>
                                </div>
                            )) : 
                            <div style={{margin: '10px auto', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <img style={{width: '80px', marginBottom: '20px'}} alt="Not Found" src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png"></img>
                                <p>Không tìm thấy sản phẩm</p>
                            </div>
                        }
                    </div>
                    <Pagination style={{ margin: '0 auto', marginTop: '20px' }} count={Math.floor(totalAmount/20) + 1} page={page} onChange={handleChangePage} />
                </div>

            </div>
            <Footer></Footer>
        </div>
    )
}

export default Product;