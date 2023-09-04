import '../Footer/Footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <div className='container-footer'>
                <div className='intro-footer item'>
                    <h5 style={{ color: 'var(--main-color)' }}>Giới thiệu</h5>
                    <p>NDStore chuyên cấp cung các thiết bị văn phòng và các loại máy tính. Với kinh nghiệm kinh doanh trong 5 năm trên thị trường. Chúng tối rất hân hạnh được phục vụ.</p>
                </div>
                <div className='intro-footer item'>
                    <h5 style={{ color: 'var(--main-color)' }}>Sản phẩm</h5>
                    <ul className='footer-product'>
                        <li>
                            <a href='/'>Laptop</a>
                        </li>
                        <li>
                            <a href='/'>Máy tính để bàn</a>
                        </li>
                        <li>
                            <a href='/'>Linh kiện máy tính</a>
                        </li>
                        <li>
                            <a href='/'>Máy in</a>
                        </li>
                        <li>
                            <a href='/'>Dây, cáp</a>
                        </li>
                        <li>
                            <a href='/'>Khác</a>
                        </li>
                    </ul>
                </div>
                <div className='intro-footer item'>
                    <h5 style={{ color: 'var(--main-color)' }}>Cộng đồng của NDStore</h5>
                    <div className='footer-contact'>
                        <a href='/'>
                            <i className='fab fa-facebook'></i>
                        </a>
                        <a href='/'>
                            <i className='fab fa-youtube'></i>
                        </a>
                        <a href='/'>
                            <i className='fab fa-twitter'></i>
                        </a>
                        <a href='/'>
                            <i className='fab fa-tiktok'></i>
                        </a>
                    </div>
                </div>
                <div className='intro-footer item'>
                    <h5 style={{ color: 'var(--main-color)' }}>Liên hệ hỗ trợ</h5>
                    <label style={{margin: '0'}}>Email liên hệ:</label><br/>
                    <a style={{ color: 'var(--main-color)' }} href="mailto:ndstore@gmail.com">ndstore@gmail.com</a><br/>
                    <label style={{margin: '10px 0 0 0'}}>Tổng đài:</label><br/>
                    <a style={{ color: 'var(--main-color)' }} href="mailto:ndstore@gmail.com">1900 0234</a>
                </div>
            </div>
            <p style={{textAlign: 'center', marginTop: '30px'}}>Copyright (c) 2023 by NDStore</p>
        </div>
    )
}

export default Footer;