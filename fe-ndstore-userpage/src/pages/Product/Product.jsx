import CardProduct from "../../components/CardProduct/CardProduct";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Pagination } from "@mui/material";
import '../Product/Product.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Product = () => {
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        console.log(value)
    };

    const navigate = useNavigate()

    const goToDetail = (id) => {
        navigate(`/product/${id}`)
    }
    return (
        <div>
            <Header></Header>
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
                        <h3>Laptop <span>(120 sản phẩm)</span></h3>
                    </div>
                    <div className="filter-by">
                        <strong>Sắp xếp theo</strong>
                        <button>Giá tăng dần</button>
                        <button>Giá giảm dần dần</button>
                        <button>Sản phẩm mới nhất</button>
                        <button>Sản phẩm bán chạy nhất</button>
                    </div>
                    <div className="products">
                        <div onClick={() => goToDetail(1)}>
                            <CardProduct
                                src='https://phucanhcdn.com/media/product/47266_laptop_dell_latitude_3420_l3420i5ssdf__h4.jpg'
                                brand='ASUS' name='ASUS GTR-120 8GB RAM' price='23000000' discount='26000000'></CardProduct>
                        </div>
                        <CardProduct
                            src='https://phucanhcdn.com/media/product/47266_laptop_dell_latitude_3420_l3420i5ssdf__h4.jpg'
                            brand='ASUS' name='ASUS GTR-120 8GB RAM' price='23000000' discount='26000000'></CardProduct>
                        <CardProduct
                            src='https://phucanhcdn.com/media/product/47266_laptop_dell_latitude_3420_l3420i5ssdf__h4.jpg'
                            brand='ASUS' name='ASUS GTR-120 8GB RAM' price='23000000' discount='26000000'></CardProduct>
                        <CardProduct
                            src='https://phucanhcdn.com/media/product/47266_laptop_dell_latitude_3420_l3420i5ssdf__h4.jpg'
                            brand='ASUS' name='ASUS GTR-120 8GB RAM' price='23000000' discount='26000000'></CardProduct>
                        <CardProduct
                            src='https://phucanhcdn.com/media/product/47266_laptop_dell_latitude_3420_l3420i5ssdf__h4.jpg'
                            brand='ASUS' name='ASUS GTR-120 8GB RAM' price='23000000' discount='26000000'></CardProduct>
                        <CardProduct
                            src='https://phucanhcdn.com/media/product/47266_laptop_dell_latitude_3420_l3420i5ssdf__h4.jpg'
                            brand='ASUS' name='ASUS GTR-120 8GB RAM' price='23000000' discount='26000000'></CardProduct>
                        <CardProduct
                            src='https://phucanhcdn.com/media/product/47266_laptop_dell_latitude_3420_l3420i5ssdf__h4.jpg'
                            brand='ASUS' name='ASUS GTR-120 8GB RAM' price='23000000' discount='26000000'></CardProduct>
                        <CardProduct
                            src='https://phucanhcdn.com/media/product/47266_laptop_dell_latitude_3420_l3420i5ssdf__h4.jpg'
                            brand='ASUS' name='ASUS GTR-120 8GB RAM' price='23000000' discount='26000000'></CardProduct>
                        <CardProduct
                            src='https://phucanhcdn.com/media/product/47266_laptop_dell_latitude_3420_l3420i5ssdf__h4.jpg'
                            brand='ASUS' name='ASUS GTR-120 8GB RAM' price='23000000' discount='26000000'></CardProduct>

                    </div>
                    <Pagination style={{ margin: '0 auto', marginTop: '20px' }} count={10} page={page} onChange={handleChange} />
                </div>

            </div>
            <Footer></Footer>
        </div>
    )
}

export default Product;