import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

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
            localStorage.setItem('history-product', JSON.stringify([]))
            localStorage.setItem('access-token', searchParams.get("token"))
            localStorage.setItem('user-infor', JSON.stringify(jwt_decode(searchParams.get('token'))))
            return navigate("/")
        }
    }, [searchParams, navigate])

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
            </Dialog>
        </>
    )
}

export default AuthGoogle