import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";
import '../Home/Home.css'
import { Drawer, Paper } from "@mui/material";
import dayjs from "dayjs";

const Home = () => {

    const currentDay = dayjs(new Date()).format('DD/MM/YYYY')

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
            <div style={{
                padding: '70px 15px 70px 15px', height: 'auto'
            }}>
                <Paper style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    flexDirection: 'column', padding: '5vh 0'
                }}>
                    <p style={{ color: "var(--main-color)", fontSize: '60px', fontWeight: 'bold' }}>NDStore</p>
                    <p style={{ fontSize: '30px', marginTop: '20px' }}>Admin</p>
                    <p style={{ fontSize: '20px', marginTop: '15px' }}>Hôm nay: {' '}
                        <span style={{ color: "var(--main-color)", fontWeight: 'bold' }}>{currentDay}</span>
                    </p>
                </Paper>
            </div>
            <div style={{ position: 'fixed', bottom: '0', left: '0', width: 'calc(100% - 260px)', marginLeft: '260px' }}>
                <Footer />
            </div>
        </div>
    )
}

export default Home;