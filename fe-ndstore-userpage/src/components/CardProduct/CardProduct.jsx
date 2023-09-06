import '../CardProduct/CardProduct.css'

const CardProduct = (drops) => {
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getPercent = (n1, n2) => {
        return (((parseInt(n2) - parseInt(n1))/parseInt(n2)) * 100).toFixed(1)
    }

    return (
        <div className="card-product">
            <img alt='' src={drops.src}></img>
            <div className='content-card'>
                <strong>{drops.brand}</strong><br />
                <small>{drops.name}</small>
                <h5 className='price' style={{ marginTop: '5px' }}>{numberWithCommas(drops.price)} VNĐ</h5>
                <div className='discount'>
                    <p style={{textDecoration: 'line-through'}}>{numberWithCommas(drops.discount)} VNĐ</p>
                    <p style={{color: 'var(--main-color)'}}>{getPercent(drops.price, drops.discount)}%</p>
                </div>
            </div>
        </div>
    )
}

export default CardProduct;