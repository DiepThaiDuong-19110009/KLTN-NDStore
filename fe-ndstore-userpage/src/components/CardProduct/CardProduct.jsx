import '../CardProduct/CardProduct.css'

const CardProduct = (drops) => {
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getPercent = (n1, n2) => {
        return (((parseInt(n2) - parseInt(n1)) / parseInt(n2)) * 100).toFixed(1)
    }

    return (
        <div className="card-product">
            <div style={{ width: '160px', height: '160px', margin: '0 auto' }}>
                <img alt={drops.name} src={drops.src}></img>
            </div>
            <div className='content-card'>
                <strong>{drops.brand}</strong><br />
                <p>{drops.name}</p>
                <h5 className='price' style={{ marginTop: '5px' }}>{numberWithCommas(drops.price)} VNĐ</h5>
                <div className='discount'>
                    <p style={{ textDecoration: 'line-through' }}>{numberWithCommas(drops.discount)} VNĐ</p>
                    <p style={{ color: 'var(--main-color)' }}>{drops.discountPercent}%</p>
                </div>
            </div>
        </div>
    )
}

export default CardProduct;