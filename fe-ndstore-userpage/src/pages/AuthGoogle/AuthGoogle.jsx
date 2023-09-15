import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthGoogle = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [open, setOpen] = useState(false);

    let navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };

    const handleRedirect = () => {
        navigate('/login')
    }

    useEffect(() => {
        if (!searchParams.get("token")) {
            setOpen(true)
        }
        if (searchParams.get("token")) {
            localStorage.setItem('access-token', searchParams.get("token"))
            localStorage.setItem('user-infor', JSON.stringify(parseJwt(searchParams.get('token'))))
            return navigate("/")
        }
    }, [searchParams, navigate])

    function parseJwt(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Thông báo"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tài khoản Email đã xảy ra lỗi. Vui lòng thử lại hoặc sử dụng Email khác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRedirect} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog></>
    )
}

export default AuthGoogle