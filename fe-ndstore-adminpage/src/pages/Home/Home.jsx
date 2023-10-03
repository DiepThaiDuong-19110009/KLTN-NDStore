import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";
import '../Home/Home.css'
import { Drawer } from "@mui/material";

const Home = () => {

    return (
        <div style={{ minHeight: '100vh', paddingLeft: '260px' }}>
            <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', zIndex: '9999' }}>
                <Header />
            </div>
            <Drawer
                variant="permanent"
                open
                anchor="left">
                <Menu selected='home' />
            </Drawer>
            <div style={{ backgroundColor: '#f3f3f3', padding: '70px 15px 15px 15px', height: '100vh' }}>
                Home
            </div>
            <div style={{ position: 'fixed', bottom: '0', left: '0', width: 'calc(100% - 260px)', marginLeft: '260px' }}>
                <Footer />
            </div>
        </div>
    )
}

export default Home;