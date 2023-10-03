import { Outlet } from "react-router-dom";
import { LOCAL_STORAGE } from "../../contants/LocalStorage";
import { getLocalItem } from "../../helpers/storage";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import { Drawer } from "@mui/material";

const CommonLayout = () => {
    const isAuthenticated = getLocalItem(LOCAL_STORAGE.ACCESS_TOKEN);
    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '100vh' }}>
                <Outlet />
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', paddingLeft: '260px' }}>
            <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', zIndex: '9999' }}>
                <Header />
            </div>
            <div style={{ backgroundColor: '#f1f1f1' }}>
                <div style={{ marginLeft: 20, paddingTop: 68, marginRight: 20 }}>
                    <Outlet />
                </div>
            </div>
            <div style={{ position: 'fixed', bottom: '0', left: '0', width: 'calc(100% - 260px)', marginLeft: '260px' }}>
                <Footer />
            </div>
        </div>
    );
}

export default CommonLayout;