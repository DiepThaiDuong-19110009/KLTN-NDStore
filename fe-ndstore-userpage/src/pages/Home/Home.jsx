import CarouselComponent from "../../components/Carousel/Carousel";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const Home = () => {
    return (
        <div>
            <Header></Header>
            <div className="">
                <CarouselComponent />
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Home;