import { useEffect, useState } from "react";
import managementUserApi from "../../apis/management-user.api";
import Loading from "../../components/Loading/Loading";
import { Drawer } from "@mui/material";
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";

const CategoryManagement = () => {
    
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAllUser();
    }, [])

    const getAllUser = () => {
        setIsLoading(true)
        managementUserApi
            .getUserList()
            .then((res) => {
                if (res?.success === true) {
                    setIsLoading(false);
                    console.log(res)
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    return(
        <div style={{ minHeight: '100vh', paddingLeft: '260px' }}>
            {isLoading ? <Loading isLoading={isLoading} /> : undefined}
            <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', zIndex: '9999' }}>
                <Header />
            </div>
            <Drawer
                variant="permanent"
                open
                anchor="left">
                <Menu selected='category' />
            </Drawer>
            <div style={{ backgroundColor: '#f1f1f1', padding: '70px 10px 10px 10px' }}>
                Category
            </div>
            <div style={{ position: 'fixed', bottom: '0', left: '0', width: 'calc(100% - 260px)', marginLeft: '260px' }}>
                <Footer />
            </div>
        </div>
    )
}

export default CategoryManagement;