import { useEffect, useRef, useState } from "react";
import '../Header/Header.css'
import authApi from "../../apis/auth.api";
import { clearLocal } from "../../helpers/storage";
import Loading from "../Loading/Loading";
import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material";

const Header = () => {
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const handleLogout = () => {
        clearLocal();
        window.location.reload();
    }

    useEffect(() => {
        getProfileAdmin()
    }, [])

    const getProfileAdmin = () => {
        setIsLoading(true)
        authApi
            .getProfile()
            .then((res) => {
                if (res?.success === true) {
                    setIsLoading(false);
                    setName(res?.data?.name)
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    return (
        <div id="header">
            {isLoading ? <Loading isLoading={isLoading} /> : undefined}
            <div className="logo-header">
                <h3 style={{ color: "var(--main-color)" }}>NDStore</h3>
                <div style={{ borderLeft: '2px solid gray', height: '20px', margin: '0 15px' }}></div>
                <h3>Admin</h3>
            </div>
            <Button
                className="user-infor"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <span style={{ textTransform: 'none', color: 'black' }}>{name}</span>
                <img style={{ width: '30px', height: '30px' }} src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="admin" />
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )
}

export default Header;