import CardProduct from "../../components/CardProduct/CardProduct";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { FormControl, FormControlLabel, FormLabel, Grid, Pagination, Radio, RadioGroup } from "@mui/material";
import '../Product/Product.css'
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { filterProductByKeySearch, filterProductLaptop, getProductByBrandId, getProductByCategoryId, getProductByKeySearch, getProductByPage } from "../../apis/product.api";
import { Loader } from "../../components/Loader/Loader";
import { getAllBrandNoPage } from "../../apis/brand";
import { getCategoryById } from "../../apis/category.api";

const Product = () => {
    const [page, setPage] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const [listBrand, setListBrand] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [categoryDetail, setCategoryDetail] = useState({})

    const [arrangeListProduct, setArrangeListProduct] = useState('')

    const [filterBrand, setFilterBrand] = useState('')
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(40000000);
    // Config Laptop
    const [RAM, setRAM] = useState('')
    const [CPU, setCPU] = useState('')
    const [PIN, setPIN] = useState('')
    const [CHIP, setCHIP] = useState('')

    // Config desktop
    const [IPS, setIPS] = useState('')
    const [USB, setUSB] = useState('')

    const navigate = useNavigate();

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const [listProduct, setListProduct] = useState([])

    useEffect(() => {

    }, [arrangeListProduct])

    useEffect(() => {
        resetFilter()
        getAllBrand();
    }, [searchParams.get("categoryId")])

    useEffect(() => {
        if (searchParams.get("keySearch")) {
            findProductByKeySearch(page, searchParams.get("keySearch"))
        }
        if (searchParams.get("categoryId")) {
            getProductByCategory(page, searchParams.get("categoryId"));
            getCategoryDetail(searchParams.get("categoryId"))
        }
        if (searchParams.get("brandId")) {
            getProductByBrand(page, searchParams.get("brandId"))
        }
        if (searchParams.get("all")) {
            getProductAll(page);
        }
    }, [page, searchParams])

    // Sort by price
    const sortProductByPrice = (key) => {
        if (key === "ASC" && listProduct.length > 0) {
            setArrangeListProduct('ASC')
            return listProduct.sort((a, b) => parseFloat(a.discountPrice) - parseFloat(b.discountPrice));
        }
        if (key === "DESC" && listProduct.length > 0) {
            setArrangeListProduct('DESC')
            return listProduct.sort((a, b) => parseFloat(b.discountPrice) - parseFloat(a.discountPrice));
        }
    }

    // Get all products
    const getProductAll = (page) => {
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
                setTotalAmount(0);
                setIsLoading(false)
                return err;
            })
    }

    // Get product by category
    const getProductByCategory = (page, idCategory) => {
        setIsLoading(true)
        getProductByCategoryId(page - 1, idCategory)
            .then((res) => {
                if (res?.data?.success === true) {
                    setIsLoading(false);
                    setTotalAmount(res?.data?.data?.totalQuantity);
                    setListProduct(res?.data?.data?.list)
                }
            })
            .catch((err) => {
                setListProduct([])
                setTotalAmount(0);
                setIsLoading(false)
                return err;
            })
    }

    // Get category Detail
    const getCategoryDetail = (id) => {
        setIsLoading(true)
        getCategoryById(id)
            .then((res) => {
                if (res?.data?.success === true) {
                    setIsLoading(false);
                    setCategoryDetail(res?.data?.data);
                }
            })
            .catch((err) => {
                setCategoryDetail({})
                setIsLoading(false)
                return err;
            })
    }

    // Get product by brand
    const getProductByBrand = (page, idBrand) => {
        setIsLoading(true)
        getProductByBrandId(page - 1, idBrand)
            .then((res) => {
                if (res?.data?.success === true) {
                    setIsLoading(false);
                    setTotalAmount(res?.data?.data?.totalQuantity);
                    setListProduct(res?.data?.data?.list)
                }
            })
            .catch((err) => {
                setListProduct([])
                setTotalAmount(0);
                setIsLoading(false)
                return err;
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

    // redirect filter by brand
    const findProductByBrand = (idBrand) => {
        navigate(`/product?brandId=${idBrand}`)
    }

    // get product by key search
    const findProductByKeySearch = (page, content) => {
        setIsLoading(true)
        getProductByKeySearch(page - 1, content)
            .then((res) => {
                if (res?.data?.success === true) {
                    setIsLoading(false);
                    setTotalAmount(res?.data?.data?.totalQuantity);
                    setListProduct(res?.data?.data?.list)
                    resetFilter();
                }
            })
            .catch((err) => {
                setListProduct([]);
                setTotalAmount(0);
                setIsLoading(false)
                return err;
            })
    }

    // Filter product
    const filterProduct = () => {
        console.log(searchParams.get("categoryId"), filterBrand, RAM, CPU, PIN, IPS, USB)
        if (searchParams.get("categoryId")) {
            setIsLoading(true)
            filterProductLaptop(page - 1, searchParams.get("categoryId"), filterBrand, minPrice, maxPrice, RAM, CPU, PIN, CHIP, IPS, USB)
                .then((res) => {
                    if (res?.data?.success === true) {
                        setIsLoading(false);
                        setTotalAmount(res?.data?.data?.totalQuantity);
                        setListProduct(res?.data?.data?.list)
                    }
                })
                .catch((err) => {
                    setListProduct([]);
                    setTotalAmount(0);
                    setIsLoading(false)
                    return err;
                })
        } else if (searchParams.get("keySearch")) {
            setIsLoading(true)
            filterProductByKeySearch(page - 1, searchParams.get("keySearch"), filterBrand, minPrice, maxPrice)
                .then((res) => {
                    if (res?.data?.success === true) {
                        setIsLoading(false);
                        setTotalAmount(res?.data?.data?.totalQuantity);
                        setListProduct(res?.data?.data?.list)
                    }
                })
                .catch((err) => {
                    setListProduct([]);
                    setTotalAmount(0);
                    setIsLoading(false)
                    return err;
                })
        }
    }

    // Reset filter
    const resetFilter = () => {
        setArrangeListProduct('')
        setMinPrice(0);
        setMaxPrice(40000000);
        setFilterBrand('');
        setCPU('');
        setRAM('');
        setPIN('');
        setCHIP('');
    }

    return (
        <div>
            <Header></Header>
            {
                isLoading === true && <Loader></Loader>
            }
            <div className="container-product">
                {
                    (searchParams.get('categoryId') || searchParams.get("keySearch")) &&
                    <div className="filter-product">
                        <div className="filter-action">
                            <button onClick={() => filterProduct()}>Lọc <i className="fas fa-filter"></i></button>
                            <button onClick={() => window.location.reload()}>Tải lại <i className="fas fa-undo"></i></button>
                        </div>
                        <hr />
                        <div className="range">
                            <strong>Chọn khoảng giá</strong>
                            <div style={{ marginTop: '10px' }}>
                                <label style={{ margin: 0, padding: 0 }}>Từ:</label>
                                <input onChange={(e) => setMinPrice(e.target.value)} value={minPrice}
                                    style={{ margin: '0 0 10px 0' }} type="number"></input>
                                <label style={{ margin: 0, padding: 0 }}>Đến:</label>
                                <input onChange={(e) => setMaxPrice(e.target.value)} value={maxPrice}
                                    type="number"></input>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Thương hiệu</FormLabel>
                                <RadioGroup
                                    value={filterBrand}
                                    onChange={(e) => setFilterBrand(e.target.value)}
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="" control={<Radio checked={filterBrand === ''} />} label="Tất cả" />
                                    {
                                        listBrand?.map((brand) => (
                                            <FormControlLabel key={brand?.id} value={brand?.id} control={<Radio />} label={brand?.name} />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </div>
                        {
                            categoryDetail?.titleCategory === 'Laptop' && !searchParams.get("keySearch") &&
                            <>
                                <hr />
                                <div>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">RAM</FormLabel>
                                        <RadioGroup
                                            value={RAM}
                                            onChange={(e) => setRAM(e.target.value)}
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel value="" control={<Radio checked={RAM === ''} />} label="Tất cả" />
                                            <FormControlLabel value="8GB" control={<Radio />} label="8GB" />
                                            <FormControlLabel value="16GB" control={<Radio />} label="16GB" />
                                            <FormControlLabel value="32GB" control={<Radio />} label="32GB" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <hr />
                                <div>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">CPU</FormLabel>
                                        <RadioGroup
                                            value={CPU}
                                            onChange={(e) => setCPU(e.target.value)}
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel value="" control={<Radio checked={CPU === ''} />} label="Tất cả" />
                                            <FormControlLabel value="Core-i3" control={<Radio />} label="Core-i3" />
                                            <FormControlLabel value="Core-i5" control={<Radio />} label="Core-i5" />
                                            <FormControlLabel value="Core-i7" control={<Radio />} label="Core-i7" />
                                            <FormControlLabel value="Core-i9" control={<Radio />} label="Core-i9" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <hr />
                                <div>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">PIN</FormLabel>
                                        <RadioGroup
                                            value={PIN}
                                            onChange={(e) => setPIN(e.target.value)}
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel value="" control={<Radio checked={PIN === ''} />} label="Tất cả" />
                                            <FormControlLabel value="45WH" control={<Radio />} label="45WH" />
                                            <FormControlLabel value="90WH" control={<Radio />} label="90WH" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <hr />
                                <div>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">CHIP</FormLabel>
                                        <RadioGroup
                                            value={CHIP}
                                            onChange={(e) => setCHIP(e.target.value)}
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel value="" control={<Radio checked={CHIP === ''} />} label="Tất cả" />
                                            <FormControlLabel value="GTX" control={<Radio />} label="GTX" />
                                            <FormControlLabel value="AMD" control={<Radio />} label="AMD" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </>
                        }
                         {
                            categoryDetail?.titleCategory === 'Màn hình' && !searchParams.get("keySearch") &&
                            <>
                                <hr />
                                <div>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">IPS</FormLabel>
                                        <RadioGroup
                                            value={IPS}
                                            onChange={(e) => setIPS(e.target.value)}
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel value="" control={<Radio checked={IPS === ''} />} label="Tất cả" />
                                            <FormControlLabel value="178H" control={<Radio />} label="178H" />
                                            <FormControlLabel value="238H" control={<Radio />} label="238H" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <hr />
                                <div>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">USB</FormLabel>
                                        <RadioGroup
                                            value={USB}
                                            onChange={(e) => setUSB(e.target.value)}
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel value="" control={<Radio checked={USB === ''} />} label="Tất cả" />
                                            <FormControlLabel value="3.0" control={<Radio />} label="3.0" />
                                            <FormControlLabel value="5.0" control={<Radio />} label="5.0" />
                                            <FormControlLabel value="7.0" control={<Radio />} label="7.0" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </>
                        }
                    </div>
                }
                <div className="list-product" style={{ width: (!searchParams.get('categoryId') && !searchParams.get('keySearch')) ? '100%' : '80%' }}>
                    <div className="name-category">
                        <h5>Tìm thấy: {' '}
                            <span>
                                {totalAmount} sản phẩm <span>
                                    {
                                        searchParams.get('categoryId') && `(Thuộc danh mục ${categoryDetail?.titleCategory})`
                                    }
                                    {
                                        searchParams.get('keySearch') && `(Với từ khóa  "${searchParams.get('keySearch')}")`
                                    }
                                </span>
                            </span>
                        </h5>
                    </div>
                    {/* row brand */}
                    {
                        searchParams.get("brandId") &&
                        <div className="name-category" style={{
                            justifyContent: 'space-between', padding: '10px', display: 'flex', gap: '20px',
                            alignItems: 'center', marginBottom: '20px', overflow: 'auto'
                        }}>
                            {
                                listBrand?.map((item) => (
                                    <div key={item?.key}>
                                        <img
                                            onClick={() => findProductByBrand(item?.id)}
                                            style={{
                                                width: '80px', padding: '10px', borderRadius: '5px',
                                                boxShadow: '1px 2px 8px rgb(231, 231, 231)', cursor: 'pointer'
                                            }}
                                            src={item?.imageBrand} alt={item?.name} />
                                    </div>
                                ))
                            }
                        </div>
                    }
                    {
                        listProduct?.length !== 0 &&
                        <div className="filter-by">
                            <strong>Sắp xếp theo</strong>
                            <button style={{
                                color: arrangeListProduct === 'ASC' ? 'var(--main-color)' : 'black',
                                border: arrangeListProduct === 'ASC' ? '1px solid var(--main-color)' : 'none'
                            }}
                                onClick={() => sortProductByPrice('ASC')}>Giá tăng dần</button>
                            <button style={{
                                color: arrangeListProduct === 'DESC' ? 'var(--main-color)' : 'black',
                                border: arrangeListProduct === 'DESC' ? '1px solid var(--main-color)' : 'none'
                            }}
                                onClick={() => sortProductByPrice('DESC')}>Giá giảm dần</button>
                        </div>
                    }
                    <Grid container spacing={0} className="products">
                        {
                            listProduct.length !== 0 ?
                                listProduct.map((product) => (
                                    <Grid key={product?.id} xs={6} md={4} xl={(!searchParams.get('categoryId') && !searchParams.get('keySearch')) ? 2 : 3}>
                                        <CardProduct
                                            id={product?.id}
                                            src={product?.images[0]?.url || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXp7vG6vsG3u77s8fTCxsnn7O/f5OfFyczP09bM0dO8wMPk6ezY3eDd4uXR1tnJzdBvAX/cAAACVElEQVR4nO3b23KDIBRA0ShGU0n0//+2KmO94gWZ8Zxmr7fmwWEHJsJUHw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwO1MHHdn+L3rIoK6eshsNJ8kTaJI07fERPOO1Nc1vgQm2oiBTWJ+d8+CqV1heplLzMRNonED+4mg7L6p591FC+133/xCRNCtd3nL9BlxWP++MOaXFdEXFjZ7r8D9l45C8y6aG0cWtP/SUGhs2d8dA/ZfGgrzYX+TVqcTNRRO9l+fS5eSYzQs85psUcuzk6igcLoHPz2J8gvzWaH/JLS+95RfOD8o1p5CU5R7l5LkfKEp0mQ1UX7hsVXqDpRrifILD/3S9CfmlUQFhQfuFu0STTyJ8gsP3PH7GVxN1FC4t2sbBy4TNRTu7LyHJbqaqKFw+/Q0ncFloo7CjRPwMnCWqKXQZ75El4nKC9dmcJaou9AXOE5UXbi+RGeJygrz8Uf+GewSn9uXuplnWDZJ7d8f24F/s6iq0LYf9olbS3Q8i5oKrRu4S9ybwaQ/aCkqtP3I28QDgeoK7TBya/aXqL5COx67PTCD2grtdOwH+pQV2r0a7YVBgZoKwwIVFQYG6ikMDVRTGByopjD8ATcKb0UhhRTe77sKs2DV7FKSjId18TUEBYVyLhUThWfILHTDqmI85/2RWWjcE/bhP6OD7maT3h20MHsA47JC3PsW0wcwLhv9t0OOPOIkCn21y2bXXwlyylxiYMPk1SuCSmpfK8bNQvIrpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwNX4BCbAju9/X67UAAAAASUVORK5CYII='}
                                            brand={product?.nameBrand}
                                            name={product?.name}
                                            price={product?.discountPrice}
                                            discount={product?.originPrice}
                                            discountPercent={product?.discount}>
                                        </CardProduct>
                                    </Grid >
                                )) :
                                <div style={{ margin: '10px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img style={{ width: '80px', marginBottom: '20px' }} alt="Not Found" src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png"></img>
                                    <p>Không tìm thấy sản phẩm</p>
                                </div>
                        }
                    </Grid>
                    <Pagination style={{ margin: '0 auto', marginTop: '20px' }} count={Math.floor(totalAmount / 20) + 1} page={page} onChange={handleChangePage} />
                </div>

            </div>
            <Footer></Footer>
        </div>
    )
}

export default Product;