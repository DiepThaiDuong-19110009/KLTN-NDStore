import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

const CheckOut = () => {
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
        if (!searchParams.get("complete")) {
            setOpen(true)
        }
        if (searchParams.get("complete")) {
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

export default CheckOut