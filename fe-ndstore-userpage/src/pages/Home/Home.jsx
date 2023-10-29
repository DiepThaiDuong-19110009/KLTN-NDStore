import { useEffect, useState } from "react";
import CardProduct from "../../components/CardProduct/CardProduct";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import '../Home/Home.css'
import { useNavigate } from "react-router-dom";
import { getAllProductNoPage } from "../../apis/product.api";
import { Loader } from "../../components/Loader/Loader";
import Slider from "react-slick";
import { getAllBrandNoPage } from "../../apis/brand";
import { Grid } from "@mui/material";

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [listProduct, setListProduct] = useState([])
    const [listProductLaptop, setListProductLaptop] = useState([])
    const [listBrand, setListBrand] = useState([])

    const navigate = useNavigate();

    const settings = {
        centerMode: false,
        centerPadding: '10px',
        slidesToShow: 6,
        speed: 500,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 1240,
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                },
            },
        ],
    };

    useEffect(() => {
        getAllProduct();
        getAllBrand();
    }, [navigate])

    // Get All products
    const getAllProduct = () => {
        setIsLoading(true)
        getAllProductNoPage()
            .then((res) => {
                if (res?.data?.data) {
                    setIsLoading(false)
                    setListProduct(res?.data?.data?.list)
                    setListProductLaptop(res?.data?.data?.list?.filter((item) => item?.nameCategory === 'Laptop'))
                }
            })
            .catch((err) => {
                setIsLoading(false)
                console.log(err)
            })
    }

    // Get All Brand
    const getAllBrand = () => {
        setIsLoading(true)
        getAllBrandNoPage()
            .then((res) => {
                if (res?.data?.data) {
                    setIsLoading(false)
                    setListBrand(res?.data?.data)
                }
            })
            .catch((err) => {
                setIsLoading(false)
                console.log(err)
            })
    }

    return (
        <div>
            <Header></Header>
            {
                isLoading === true && <Loader></Loader>
            }
            <div className="container-home" style={{ marginTop: '30px' }}>
                {/* Banner */}
                <div className="banner-row">
                    <div className="banner-item" onClick={() => navigate(`/product/${listProductLaptop[0]?.id}`)}>
                        <div style={{ height: '40%' }}>
                            <h3 style={{ color: 'white' }}>Laptop giảm giá</h3>
                        </div>
                        <div className="btn-buy-now">
                            Mua ngay
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'end', height: '60%' }}>
                            <img src={listProductLaptop[0]?.images[0]?.url} alt="" />
                        </div>
                    </div>
                    <div className="banner-item" onClick={() => navigate(`/product/${listProductLaptop[3]?.id}`)}>
                        <div style={{ height: '40%' }}>
                            <h3 style={{ color: 'white' }}>Laptop giảm giá</h3>
                        </div>
                        <div className="btn-buy-now">
                            Mua ngay
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'end', height: '60%' }}>
                            <img src={listProductLaptop[3]?.images[0]?.url} alt="" />
                        </div>
                    </div>
                    <div className="banner-item" onClick={() => navigate(`/product/${listProductLaptop[4]?.id}`)}>
                        <div style={{ height: '40%' }}>
                            <h3 style={{ color: 'white' }}>Laptop giảm giá</h3>
                        </div>
                        <div className="btn-buy-now">
                            Mua ngay
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'end', height: '60%' }}>
                            <img src={listProductLaptop[4]?.images[0]?.url} alt="" />
                        </div>
                    </div>
                    <div className="banner-item" onClick={() => navigate(`/product/${listProductLaptop[1]?.id}`)}>
                        <div style={{ height: '40%' }}>
                            <h3 style={{ color: 'white' }}>Laptop giảm giá</h3>
                        </div>
                        <div className="btn-buy-now">
                            Mua ngay
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'end', height: '60%' }}>
                            <img src={listProductLaptop[1]?.images[0]?.url} alt="" />
                        </div>
                    </div>
                </div>
                {/* row product */}
                <div className="product-row" style={{ justifyContent: 'space-between', padding: '10px', alignItems: 'center' }}>
                    <h4 style={{ color: 'black', margin: '0' }}>Giảm giá sốc</h4>
                </div>
                <div style={{ borderBottom: '3px dotted white', width: '80%', margin: '0 auto', overflow: 'hidden' }}></div>
                <div className="product-row" style={{ marginBottom: '20px' }}>
                    <Slider {...settings}>
                        {
                            listProduct?.sort((a, b) => parseFloat(b.discount) - parseFloat(a.discount))?.map((item) => (
                                <CardProduct key={item?.id} id={item?.id}
                                    src={item?.images[0]?.url} checkDiscount={true}
                                    brand={item?.nameBrand} name={item?.name} discountPercent={item?.discount}
                                    price={item?.discountPrice} discount={item?.originPrice}>
                                </CardProduct>
                            ))
                        }
                    </Slider>
                </div>

                {/* row brand */}
                <div className="product-row" style={{
                    justifyContent: 'space-between', padding: '20px',
                    alignItems: 'center', flexWrap: 'wrap', marginBottom: '20px'
                }}>
                    {
                        listBrand?.map((item) => (
                            <div key={item?.key}>
                                <img style={{ width: '80px' }} src={item?.imageBrand} alt={item?.name} />
                            </div>
                        ))
                    }
                </div>

                {/* row product */}
                <div className="product-row" style={{ justifyContent: 'space-between' }}>
                    <h4 style={{ color: 'black' }}>Laptop</h4>
                    <a style={{ color: 'var(--main-color)', marginRight: '10px' }} href="/product">Xem tất cả</a>
                </div>
                <div style={{ borderBottom: '3px dotted white', width: '80%', margin: '0 auto', overflow: 'hidden' }}></div>
                <div className="product-row" style={{ marginBottom: '20px' }}>
                    <Slider {...settings}>
                        {
                            listProductLaptop?.map((item) => (
                                <CardProduct key={item?.id} id={item?.id}
                                    src={item?.images[0]?.url}
                                    brand={item?.nameBrand} name={item?.name} discountPercent={item?.discount}
                                    price={item?.discountPrice} discount={item?.originPrice}>
                                </CardProduct>
                            ))
                        }
                    </Slider>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Home;