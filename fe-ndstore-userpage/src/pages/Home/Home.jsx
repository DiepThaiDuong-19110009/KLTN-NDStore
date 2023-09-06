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
            <div className="container-home">
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