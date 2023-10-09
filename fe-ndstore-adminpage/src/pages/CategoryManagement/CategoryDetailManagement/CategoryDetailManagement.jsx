import { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import CloseIcon from '@material-ui/icons/Close';
import managementCategoryApi from "../../../apis/management-category.api";

const CategoryDetailManagement = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [cateogryDetail, setCategoryDetail] = useState({})

    useEffect(() => {
        getCategoryDetail(props?.id);
    }, [props])

    const getCategoryDetail = (id) => {
        managementCategoryApi
            .getDetailCategory(id)
            .then((res) => {
                if (res?.success === true) {
                    setCategoryDetail(res?.data)
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
                <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>Chi tiết danh mục</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{textAlign: 'center'}}>
                        <img style={{width: '150px'}} alt={cateogryDetail?.titleCategory} src={cateogryDetail?.imageCategory}></img>
                    </div>
                    <span>Tên danh mục: <strong>{cateogryDetail?.titleCategory}</strong></span>
                    <span>Trạng thái: <strong>{cateogryDetail?.state === 'enable' ?
                        <strong style={{ color: 'green' }}>Hoạt động</strong> :
                        <strong style={{ color: 'red' }}>Khóa</strong>}</strong></span>
                </div>
            </div>
        </div>
    )
}

export default CategoryDetailManagement