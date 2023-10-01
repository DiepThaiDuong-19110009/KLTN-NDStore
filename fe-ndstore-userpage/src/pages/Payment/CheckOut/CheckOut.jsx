import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

const CheckOut = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [message, setMessage] = useState('');

    let navigate = useNavigate();

    useEffect(() => {
        if (searchParams.get("complete") === 'true') {
            setMessage('success')
        }
        console.log(searchParams.get("complete"))
    }, [searchParams])

    const backToHome = () => {
        navigate('/')
    }

    return (
        <div>
            {
                message === 'success' ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '60vh', flexDirection: 'column' }}>
                        <i className="fas fa-check" style={{ background: 'green', fontSize: '30px', padding: '10px', color: 'white', borderRadius: '50%' }}></i>
                        <h3 style={{ margin: '20px 0' }}>Thanh toán thành công</h3>
                        <a style={{ margin: '20px 0', color: 'var(--main-color)' }} href="/order-history">Xem lịch sử đơn hàng</a>
                        <button onClick={() => backToHome()} style={{
                            background: 'var(--main-color)', color: 'white',
                            borderRadius: '5px', padding: '10px 15px', border: 'none'
                        }}>Quay về trang chủ</button>
                    </div> :
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '60vh', flexDirection: 'column' }}>
                        <i className="fas fa-times" style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            width: '50px', height: '50px', background: 'red', fontSize: '30px',
                            padding: '15px', color: 'white', borderRadius: '50%'
                        }}></i>
                        <h3 style={{ margin: '20px 0' }}>Thanh toán không thành công</h3>
                        <button onClick={() => backToHome()} style={{
                            background: 'var(--main-color)', color: 'white',
                            borderRadius: '5px', padding: '10px 15px', border: 'none'
                        }}>Quay về trang chủ</button>
                    </div>
            }
        </div>
    )
}

export default CheckOut