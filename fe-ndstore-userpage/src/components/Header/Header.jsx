import { useEffect, useState } from 'react';
import '../Header/Header.css'
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem } from '@mui/material';
import { getProfileUser } from '../../apis/user.api';
import { getCategoryAll } from '../../apis/category.api';
import { useDispatch, useSelector } from 'react-redux'
import { actionCartRequest } from '../../redux/actions/ActionsCart';


const Header = () => {

    const [info, setInfo] = useState({})
    const [listCategory, setListCategory] = useState([])
    const [openMenuUserInfo, setOpenMenuUserInfo] = useState(null);
    const [openMenuCategory, setOpenMenuCategory] = useState(null);
    const [open, setOpen] = useState(false);
    const openUserInfo = Boolean(openMenuUserInfo);
    const openCategory = Boolean(openMenuCategory);

    const dispatch = useDispatch()

    let navigate = useNavigate();

    const cart = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(actionCartRequest())
    }, [dispatch])

    // Open menu User infor
    const handleClickUserInfo = (event) => {
        setOpenMenuUserInfo(event.currentTarget);
    };
    const handleCloseUserInfo = () => {
        setOpenMenuUserInfo(null);
    };

    // Open menu Category
    const handleClickCategory = (event) => {
        setOpenMenuCategory(event.currentTarget);
    };
    const handleCloseCategory = () => {
        setOpenMenuCategory(null);
    };

    // redirect to login
    const handleRedirect = () => {
        navigate('/login')
    }

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
        getUserInfor();
        getCategory();
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

    const getCategory = () => {
        getCategoryAll()
            .then((res) => {
                if (res?.data?.success === true) {
                    setListCategory(res?.data?.data)
                }
            })
            .catch((err) => {
                return err;
            })
    }

    return (
        <div className={classes} id='header'>
            <div className='container-header'>
                <a className='logo-header' href='/'>NDStore</a>
                <div className='category-header'>
                    <div className='btn-catergory'>
                        <div>
                            <Button
                                className='btn-show-category'
                                aria-controls={openCategory ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openCategory ? 'true' : undefined}
                                onClick={handleClickCategory}
                            >
                                <i className='fas fa-list'></i>
                                <span className='title-category'>Danh mục sản phẩm</span>
                            </Button>
                            <Menu
                                style={{ display: 'flex', flexDirection: 'column' }}
                                id="basic-menu"
                                anchorEl={openMenuCategory}
                                open={openCategory}
                                onClose={handleCloseCategory}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                {
                                    listCategory.map((category) => (
                                        <MenuItem style={{ width: '200px' }} key={category.id}>
                                            <img style={{ width: '30px', height: '30px', marginRight: '20px' }} src={category?.imageCategory} alt=''></img>
                                            <span>{category?.titleCategory}</span>
                                        </MenuItem>
                                    ))
                                }
                            </Menu>
                        </div>
                    </div>
                </div>
                <div className='search-header'>
                    <input className='input-search-header' placeholder='Tìm kiếm sản phẩm...'></input>
                    <button className='btn-search'>
                        <i className='fas fa-search icon-search'></i>
                    </button>
                </div>
                <div className='login-register-cart-user'>
                    {
                        info?.name ?
                            <div style={{ cursor: 'pointer' }} onClick={() => navigatePage('/cart')} className='cart-header'>
                                <i className='fas fa-shopping-cart icon-cart'></i>
                                <span className='cart-quantity'>{cart?.numberCart || 0}</span>
                            </div> :
                            <div style={{ cursor: 'pointer' }} onClick={() => setOpen(true)} className='cart-header'>
                                <i className='fas fa-shopping-cart icon-cart'></i>
                            </div>
                    }
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
                                    aria-controls={openUserInfo ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openUserInfo ? 'true' : undefined}
                                    onClick={handleClickUserInfo}
                                    style={{ textTransform: 'none', fontSize: '13px' }}
                                >
                                    <img style={{ width: '25px', height: '25px', marginRight: '10px', borderRadius: '50%' }} alt='' src={info.avatar}></img>
                                    <div className='link-user-info'>
                                        <span style={{ marginRight: '5px', color: 'black' }}>Xin chào,</span>
                                        <span className='name-user' style={{ fontSize: '16px' }}>{info?.name}</span>
                                    </div>
                                </Button>
                                <Menu
                                    style={{ display: 'flex', flexDirection: 'column' }}
                                    id="basic-menu"
                                    anchorEl={openMenuUserInfo}
                                    open={openUserInfo}
                                    onClose={handleCloseUserInfo}
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
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Thông báo"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Vui lòng đăng nhập để tiến hành mua hàng
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleRedirect}>
                            Đăng nhập
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default Header;