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

    const findProductByBrand = (idBrand) => {
        navigate(`/product?brandId=${idBrand}`)
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

                {/* row brand */}
                <div className="product-row" style={{
                    justifyContent: 'space-between', padding: '20px',
                    alignItems: 'center', flexWrap: 'wrap', marginBottom: '20px'
                }}>
                    {
                        listBrand?.map((item) => (
                            <div key={item?.key}>
                                <img onClick={() => findProductByBrand(item?.id)} style={{
                                    width: '80px', padding: '10px', borderRadius: '5px',
                                    boxShadow: '1px 2px 8px rgb(231, 231, 231)', cursor: 'pointer'
                                }} src={item?.imageBrand} alt={item?.name} />
                            </div>
                        ))
                    }
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
                                <CardProduct
                                    key={item?.id}
                                    id={item?.id}
                                    src={item?.images[0]?.url || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXp7vG6vsG3u77s8fTCxsnn7O/f5OfFyczP09bM0dO8wMPk6ezY3eDd4uXR1tnJzdBvAX/cAAACVElEQVR4nO3b23KDIBRA0ShGU0n0//+2KmO94gWZ8Zxmr7fmwWEHJsJUHw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwO1MHHdn+L3rIoK6eshsNJ8kTaJI07fERPOO1Nc1vgQm2oiBTWJ+d8+CqV1heplLzMRNonED+4mg7L6p591FC+133/xCRNCtd3nL9BlxWP++MOaXFdEXFjZ7r8D9l45C8y6aG0cWtP/SUGhs2d8dA/ZfGgrzYX+TVqcTNRRO9l+fS5eSYzQs85psUcuzk6igcLoHPz2J8gvzWaH/JLS+95RfOD8o1p5CU5R7l5LkfKEp0mQ1UX7hsVXqDpRrifILD/3S9CfmlUQFhQfuFu0STTyJ8gsP3PH7GVxN1FC4t2sbBy4TNRTu7LyHJbqaqKFw+/Q0ncFloo7CjRPwMnCWqKXQZ75El4nKC9dmcJaou9AXOE5UXbi+RGeJygrz8Uf+GewSn9uXuplnWDZJ7d8f24F/s6iq0LYf9olbS3Q8i5oKrRu4S9ybwaQ/aCkqtP3I28QDgeoK7TBya/aXqL5COx67PTCD2grtdOwH+pQV2r0a7YVBgZoKwwIVFQYG6ikMDVRTGByopjD8ATcKb0UhhRTe77sKs2DV7FKSjId18TUEBYVyLhUThWfILHTDqmI85/2RWWjcE/bhP6OD7maT3h20MHsA47JC3PsW0wcwLhv9t0OOPOIkCn21y2bXXwlyylxiYMPk1SuCSmpfK8bNQvIrpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwNX4BCbAju9/X67UAAAAASUVORK5CYII='}
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