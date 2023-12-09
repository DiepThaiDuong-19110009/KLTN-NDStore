import managementUserApi from "../../../apis/management-user.api";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import CloseIcon from '@material-ui/icons/Close';

const UserDetailManagement = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userDetail, setUserDetail] = useState({})

    useEffect(() => {
        getUserDetail(props?.id);
    }, [props])

    const getUserDetail = (id) => {
        managementUserApi
            .getDetailUser(id)
            .then((res) => {
                if (res?.success === true) {
                    setUserDetail(res?.data)
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
                <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>Chi tiết người dùng</h4>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px'}}>
                    <img style={{ width: '150px' }} src={userDetail?.avatar} alt="avatar"></img>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <span>Tên người dùng: <strong>{userDetail?.name}</strong></span>
                    <span>Email: <strong style={{ color: 'var(--main-color)' }}>{userDetail?.email}</strong></span>
                    <span>Số điện thoại: <strong>{userDetail?.phone}</strong></span>
                    {/* <span>Địa chỉ: <strong>{userDetail?.address}</strong></span> */}
                    <span>Vai trò: <strong>{userDetail?.role === 'Role_Admin' ?
                        <strong style={{ color: 'red' }}>Quản trị viên</strong> :
                        'Người dùng'}</strong></span>
                    <span>Trạng thái tài khoản: <strong>{userDetail?.state === 'activated' ?
                        <strong style={{ color: 'green' }}>Còn hoạt động</strong> :
                        <strong style={{ color: 'red' }}>Khóa</strong>}</strong></span>
                </div>
            </div>
        </div>
    )
}

export default UserDetailManagement;