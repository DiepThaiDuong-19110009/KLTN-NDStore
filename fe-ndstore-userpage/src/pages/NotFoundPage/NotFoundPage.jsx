import imgNotFound from '../../images/notfoundpage.png'

const NotFoundPage = () => {
    return (
        <div style={{
            width: '100vw', height: '100vh', display: 'flex', gap: '5vh',
            justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
        }}>
            <img style={{ width: '30%' }} src={imgNotFound} alt='Not Found' />
            <h1>Không tìm thấy trang</h1>
        </div>
    )
}

export default NotFoundPage;