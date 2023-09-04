import { useEffect, useState } from 'react';
import '../Header/Header.css'
import { useNavigate } from 'react-router-dom';


const Header = () => {

    const [info, setInfo] = useState({})
    const [sticky, setSticky] = useState('');
    const [showMenu, setShowMenu] = useState(false)
    const [showCategory, setShowCategory] = useState(false)

    let navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("scroll", isSticky);
        return () => {
            window.removeEventListener("scroll", isSticky);
        };
    }, []);

    const isSticky = () => {
        /* Method that will fix header after a specific scrollable */
        const scrollTop = window.scrollY;
        const stickyClass = scrollTop >= 50 ? "is-sticky" : "";
        setSticky(stickyClass);
    };

    useEffect(() => {
        getUserInfor()
    }, [])

    const getUserInfor = () => {
        setInfo(JSON.parse(localStorage.getItem('user-infor')))
    }

    const showDropdown = () => {
        console.log(showMenu)
        showMenu === true ? setShowMenu(false) : setShowMenu(true);
    }

    const logOut = () => {
        localStorage.clear();
        window.location.reload();
    }

    const goToCart = () => {
        navigate('/cart')
    }

    const showDropdownCategory = () => {
        console.log(showMenu)
        showCategory === true ? setShowCategory(false) : setShowCategory(true);
    }

    // window.addEventListener('mouseup', function (event) {
    //     setShowMenu(false)
    // });

    return (
        <div className="header">
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
                    <div style={{ cursor: 'pointer' }} onClick={() => goToCart()} className='cart-header'>
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
                            <div onClick={showDropdown} className='user-infor'>
                                <i className='fas fa-user-circle icon-user'></i>
                                <span style={{ marginRight: '5px' }}>Xin chào,</span>
                                <span className='name-user'>{info?.name}</span>
                                {
                                    showMenu === true &&
                                    <ul id='drop-down-user-infor'>
                                        <li>
                                            <a style={{ textDecoration: 'none', color: 'black' }} href='/user-detail'>Thông tin cá nhân</a>
                                        </li>
                                        <li>Đổi mật khẩu</li>
                                        <li onClick={logOut}>
                                            <i style={{ marginRight: '10px', fontSize: '20px' }} className='fas fa-sign-out-alt'></i>
                                            Đăng xuất
                                        </li>
                                    </ul>
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;