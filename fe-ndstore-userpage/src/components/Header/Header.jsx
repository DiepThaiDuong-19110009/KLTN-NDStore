import { useEffect, useState } from 'react';
import '../Header/Header.css'
import { useNavigate } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import { getProfileUser } from '../../apis/user.api';


const Header = () => {

    const [info, setInfo] = useState({})
    const [showCategory, setShowCategory] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let navigate = useNavigate();

    // Scroll page
    const [sticky, setSticky] = useState("");

    useEffect(() => {
        window.addEventListener("scroll", isSticky);
        return () => {
            window.removeEventListener("scroll", isSticky);
        };
    }, []);

    const isSticky = () => {
        const scrollTop = window.scrollY;
        const stickyClass = scrollTop >= 50 ? "is-sticky" : "";
        setSticky(stickyClass);
    };

    const classes = `header-section ${sticky}`;

    useEffect(() => {
        getUserInfor()
    }, [])

    const getUserInfor = () => {
        if (localStorage.getItem('user-infor')) {
            if (JSON.parse(localStorage.getItem('user-infor'))?.sub) {
                const userInfoGoogle = JSON.parse(localStorage.getItem('user-infor'))?.sub.split(",");
                getProfileUser(userInfoGoogle[0])
                    .then((res) => {
                        console.log(res)
                        if (res.status === 200) {
                            let userInfo = {
                                name: res?.data?.data?.name,
                                email: res?.data?.data?.email,
                                avatar: res?.data?.data?.avatar ? res?.data?.data?.avatar : 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Faenza-avatar-default-symbolic.svg/800px-Faenza-avatar-default-symbolic.svg.png',
                                id: userInfoGoogle[0],
                                type: 'email-google'
                            }
                            localStorage.setItem(('user-infor'), JSON.stringify(userInfo))
                            setInfo(userInfo)
                        }
                    })
                    .catch((err) => {
                        return err;
                    })
            } else if (!JSON.parse(localStorage.getItem('user-infor'))?.sub) {
                setInfo(JSON.parse(localStorage.getItem('user-infor')))
            }
        }
    }

    const logOut = () => {
        localStorage.clear();
        window.location.reload();
    }

    const navigatePage = (link) => {
        navigate(link)
    }

    const showDropdownCategory = () => {
        showCategory === true ? setShowCategory(false) : setShowCategory(true);
    }

    return (
        <div className={classes} id='header'>
            <div className='container-header'>
                <a className='logo-header' href='/'>NDStore</a>
                <div className='category-header'>
                    <div className='btn-catergory'>
                        <div onClick={showDropdownCategory}>
                            <i style={{ marginRight: '10px' }} className='fas fa-list'></i>
                            <span>Danh mục sản phẩm</span>
                        </div>
                        {
                            showCategory === true &&
                            <div className='list-category-header'>
                                <ul>
                                    <a href='/product/category/1'>
                                        <li>Laptop</li>
                                    </a>
                                    <a href='/product/category/1'>
                                        <li>Laptop</li>
                                    </a>
                                    <a href='/product/category/1'>
                                        <li>Laptop</li>
                                    </a>
                                    <a href='/product/category/1'>
                                        <li>Laptop</li>
                                    </a>
                                    <a href='/product/category/1'>
                                        <li>Laptop</li>
                                    </a>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
                <div className='search-header'>
                    <input className='input-search-header' placeholder='Tìm kiếm sản phẩm...'></input>
                    <button className='btn-search'>
                        <i className='fas fa-search icon-search'></i>
                    </button>
                </div>
                <div className='login-register-cart-user'>
                    <div style={{ cursor: 'pointer' }} onClick={() => navigatePage('/cart')} className='cart-header'>
                        <i className='fas fa-shopping-cart icon-cart'></i>
                        <span className='cart-quantity'>10</span>
                    </div>
                    {
                        !info?.name
                            ?
                            <div className='link-login'>
                                <a href='/login'>Đăng nhập</a>
                                <span style={{ margin: '0 5px' }}>/</span>
                                <a href='/register'>Đăng ký</a>
                            </div>
                            :
                            <div>
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    style={{ textTransform: 'none', fontSize: '13px' }}
                                >
                                    <img style={{ width: '25px', height: '25px', marginRight: '10px', borderRadius: '50%' }} alt='' src={info.avatar}></img>
                                    <span style={{ marginRight: '5px', color: 'black' }}>Xin chào,</span>
                                    <span className='name-user' style={{ fontSize: '16px' }}>{info?.name}</span>
                                </Button>
                                <Menu
                                    style={{ display: 'flex', flexDirection: 'column' }}
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={() => navigatePage('/user-detail')}>Thông tin cá nhân</MenuItem>
                                    <MenuItem onClick={() => navigatePage('/order-history')}>Lịch sử đơn hàng</MenuItem>
                                    <MenuItem onClick={logOut}>
                                        <i style={{ marginRight: '10px', fontSize: '20px', color: 'var(--main-color)' }} className='fas fa-sign-out-alt'></i>
                                        <span style={{ color: 'var(--main-color)' }}>Đăng xuất</span>
                                    </MenuItem>
                                </Menu>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;