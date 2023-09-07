import CardProduct from "../../components/CardProduct/CardProduct";
import CarouselComponent from "../../components/Carousel/Carousel";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import '../Home/Home.css'

const Home = () => {
    return (
        <div>
            <Header></Header>
            <div>
                <CarouselComponent />
            </div>
            <div className="container-home" style={{marginTop: '30px'}}>
                <div className="product-row" style={{justifyContent: 'space-between'}}>
                    <h3 style={{color: 'white'}}>Giảm giá sốc</h3>
                    <a style={{color: 'white'}} href="/product">Xem tất cả</a>
                </div>
                <div style={{borderBottom: '3px dotted white', width: '80%', margin: '0 auto', overflow: 'hidden'}}></div>
                <div className="product-row">
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

                <div className="top-category">
                    <div className="card-top-category">
                        <img src="https://lh3.googleusercontent.com/wOhcPJSPsA2l653-KPjmfodiem9y3NS6Mji6SZhkNCKsuyHK9Z3x0X-2l8gikfPI5n1DX0Fg9bBCHsOI0ACZD7n20XHN4e72=rw" alt=''></img>
                        <h5>Laptop</h5>
                    </div>
                    <div className="card-top-category">
                        <img src="https://lh3.googleusercontent.com/AsrwiaAHgA9NcpFVm8hBkOkG3Chv2XzObdRlzJStQ5rTTI7YSzlGo2_fl6wwpWLJKkgv_aHOEiN8UXagLUHwq3nDYzEwFBw=rw" alt=''></img>
                        <h5>Laptop</h5>
                    </div>
                    <div className="card-top-category">
                        <img src="https://lh3.googleusercontent.com/2701fTP9z5BT0Jn40Jc6qiXij824-WxAM6wavqFHvf7tp5WLkpJwh7Kn6TsesgatH_avVdZMkVtu8qfpZ3jfkWDsIeXYKg-L=rw" alt=''></img>
                        <h5>Laptop</h5>
                    </div>
                    <div className="card-top-category">
                        <img src="https://lh3.googleusercontent.com/4Lt6ipknHdhytA3yBKGstu2R75Ip-RCpIng6rmnsOT6bHR_Nq0BiIEXI81-kV4otHS5epUEz8YSoIYg5DdeVCiVZ9UguiWsk=rw" alt=''></img>
                        <h5>Laptop</h5>
                    </div>
                    <div className="card-top-category">
                        <img src="https://lh3.googleusercontent.com/rg0MMQFfyjZzGjsmcJrpqQx7Zp8c7KDPPMX6yUtafXTn9qgSMaA9lavKd8q1vz1nfxYgnjbjfHLmFsw7IxLfkupM83NBzYY=rw" alt=''></img>
                        <h5>Laptop</h5>
                    </div>
                    <div className="card-top-category">
                        <img src="https://lh3.googleusercontent.com/eIAVPQdJ20jpuDYypRQSF5zcugh6q6V4_04jopbdc5gdvQUo11j6z_1K9NGV2DNSlzofo2ztZaKZuZ0ijKDUvUExrOZuZTQ=rw" alt=''></img>
                        <h5>Laptop</h5>
                    </div>
                    <div className="card-top-category">
                        <img src="https://lh3.googleusercontent.com/eIAVPQdJ20jpuDYypRQSF5zcugh6q6V4_04jopbdc5gdvQUo11j6z_1K9NGV2DNSlzofo2ztZaKZuZ0ijKDUvUExrOZuZTQ=rw" alt=''></img>
                        <h5>Laptop</h5>
                    </div>
                    <div className="card-top-category">
                        <img src="https://lh3.googleusercontent.com/eIAVPQdJ20jpuDYypRQSF5zcugh6q6V4_04jopbdc5gdvQUo11j6z_1K9NGV2DNSlzofo2ztZaKZuZ0ijKDUvUExrOZuZTQ=rw" alt=''></img>
                        <h5>Laptop</h5>
                    </div>
                    <div className="card-top-category">
                        <img src="https://lh3.googleusercontent.com/eIAVPQdJ20jpuDYypRQSF5zcugh6q6V4_04jopbdc5gdvQUo11j6z_1K9NGV2DNSlzofo2ztZaKZuZ0ijKDUvUExrOZuZTQ=rw" alt=''></img>
                        <h5>Laptop</h5>
                    </div>
                    <div className="card-top-category">
                        <img src="https://lh3.googleusercontent.com/eIAVPQdJ20jpuDYypRQSF5zcugh6q6V4_04jopbdc5gdvQUo11j6z_1K9NGV2DNSlzofo2ztZaKZuZ0ijKDUvUExrOZuZTQ=rw" alt=''></img>
                        <h5>Laptop</h5>
                    </div>
                    <div className="card-top-category">
                        <img src="https://lh3.googleusercontent.com/eIAVPQdJ20jpuDYypRQSF5zcugh6q6V4_04jopbdc5gdvQUo11j6z_1K9NGV2DNSlzofo2ztZaKZuZ0ijKDUvUExrOZuZTQ=rw" alt=''></img>
                        <h5>Laptop</h5>
                    </div>
                    <div className="card-top-category">
                        <img src="https://lh3.googleusercontent.com/eIAVPQdJ20jpuDYypRQSF5zcugh6q6V4_04jopbdc5gdvQUo11j6z_1K9NGV2DNSlzofo2ztZaKZuZ0ijKDUvUExrOZuZTQ=rw" alt=''></img>
                        <h5>Laptop</h5>
                    </div>
                </div>
                <div className="product-row" style={{justifyContent: 'space-between'}}>
                    <h3 style={{color: 'white'}}>Giảm giá sốc</h3>
                    <a style={{color: 'white'}} href="/product">Xem tất cả</a>
                </div>
                <div style={{borderBottom: '3px dotted white', width: '80%', margin: '0 auto', overflow: 'hidden'}}></div>
                <div className="product-row">
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
                <div className="product-row" style={{justifyContent: 'space-between'}}>
                    <h3 style={{color: 'white'}}>Giảm giá sốc</h3>
                    <a style={{color: 'white'}} href="/product">Xem tất cả</a>
                </div>
                <div style={{borderBottom: '3px dotted white', width: '80%', margin: '0 auto', overflow: 'hidden'}}></div>
                <div className="product-row">
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
                <div className="product-row" style={{justifyContent: 'space-between'}}>
                    <h3 style={{color: 'white'}}>Giảm giá sốc</h3>
                    <a style={{color: 'white'}} href="/product">Xem tất cả</a>
                </div>
                <div style={{borderBottom: '3px dotted white', width: '80%', margin: '0 auto', overflow: 'hidden'}}></div>
                <div className="product-row">
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
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Home;