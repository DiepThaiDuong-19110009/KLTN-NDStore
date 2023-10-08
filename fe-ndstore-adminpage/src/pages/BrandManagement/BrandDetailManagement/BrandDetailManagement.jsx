import { useEffect, useState } from "react";
import managementBrandApi from "../../../apis/management-brand.api";
import Loading from "../../../components/Loading/Loading";
import CloseIcon from '@material-ui/icons/Close';

const BrandDetailManagement = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [brandDetail, setBrandDetail] = useState({})

    useEffect(() => {
        getBrandDetail(props?.id);
    }, [props])

    const getBrandDetail = (id) => {
        managementBrandApi
            .getDetailBrand(id)
            .then((res) => {
                if (res?.success === true) {
                    setBrandDetail(res?.data)
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    return (
        <div>
            {isLoading ? <Loading isLoading={isLoading} /> : undefined}
            <div style={{
                width: '600px', height: '90vh', margin: '30px auto',
                background: 'white', overflowY: 'auto', padding: '20px',
                borderRadius: '5px'
            }}>
                <div style={{ textAlign: 'right' }}>
                    <CloseIcon style={{ cursor: 'pointer' }} onClick={props?.handleClose} />
                </div>
                <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>Chi tiết thương hiệu</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{textAlign: 'center'}}>
                        <img style={{width: '150px'}} alt={brandDetail?.name} src={brandDetail?.imageBrand}></img>
                    </div>
                    <span>Tên thương hiệu: <strong>{brandDetail?.name}</strong></span>
                    <span>Trạng thái: <strong>{brandDetail?.state === 'enable' ?
                        <strong style={{ color: 'green' }}>Hoạt động</strong> :
                        <strong style={{ color: 'red' }}>Khóa</strong>}</strong></span>
                </div>
            </div>
        </div>
    )
}

export default BrandDetailManagement