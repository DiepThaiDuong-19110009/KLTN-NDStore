import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import '../UserDetail/UserDetail.css'
import { useEffect, useState } from "react";
import { getDistrict, getProvince, getWard } from "../../apis/user.api";

const UserDetail = () => {
    const [province, setProvince] = useState([])
    const [district, setDistrict] = useState([])
    const [ward, setWard] = useState([])
    const [provinceId, setProvinceId] = useState('')
    const [districtId, setDistrictId] = useState('')
    const [wardId, setWardId] = useState('')
    const [message, setMessage] = useState('')

    const [disableEdit, setDisableEdit] = useState(true)

    const getProvinceList = () => {
        getProvince()
            .then((res) => {
                setProvince(res?.data?.data)
            })
            .catch((err) => {
                return err;
            })
    }
    const getDistrictList = (provinceId) => {
        getDistrict(provinceId)
            .then((res) => {
                setDistrict(res?.data?.data)
            })
            .catch((err) => {
                return err;
            })
    }
    const getWardList = (districtId) => {
        getWard(districtId)
            .then((res) => {
                setWard(res?.data?.data)
            })
            .catch((err) => {
                return err;
            })
    }

    const getProvinceId = (e) => {
        setMessage("");
        setProvinceId(e);
        setDistrict([]);
        setDistrictId('');
        getDistrictList(e);
    }

    const getDistrictId = (e) => {
        setMessage("");
        setDistrictId(e);
        setWard([]);
        setWardId('');
        getWardList(e);
    }

    const getWardId = (e) => {
        console.log('wardId', e)
        setMessage("")
        setWardId(e)
    }

    useEffect(() => {
        getProvinceList();
    }, [])

    const acceptEdit = () => {
        disableEdit === true ? setDisableEdit(false) : setDisableEdit(true);
    }

    const saveEdit = () => {}

    return (
        <div>
            <Header></Header>
            <div className="container-user-detail">
                <div className="user-detail">
                    <div className="user-detail-left">
                        <div className="avatar">
                            <img alt="avatar" src="https://media.techz.vn/media2019/source/2A-Tung/%E1%BB%A8ng%20d%E1%BB%A5ng/trend-vit-vang-07-1629170793.jpg"></img>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                            <p htmlFor='file-avatar' style={{ marginTop: '10px', color: 'var(--main-color)', cursor: 'pointer' }}>
                                Đổi ảnh đại diện <i style={{ marginLeft: '5px' }} className="fas fa-edit"></i>
                            </p>
                            <input style={{ position: 'absolute', overflow: 'hidden', width: '120px', height: '20px', top: '10px', opacity: '0', cursor: 'pointer' }} id="file-avatar" type="file"></input>
                        </div>
                        <h5 style={{ margin: '20px 0' }}>Duong Diep</h5>
                        <p>Email: <span style={{ color: 'var(--main-color)', fontWeight: '500' }}>19110009@student.hcmute.edu.vn</span></p>
                    </div>
                    <div className="user-detail-right">
                        <h4>Thông tin giao hàng</h4>
                        <div className="delivery-info">
                            <div className="row-info">
                                <label htmlFor="">Số điện thoại</label>
                                <input className={disableEdit ? 'disable-edit' : ''} disabled={disableEdit} placeholder="Số điện thoại nhận hàng" type="number"></input>
                                <label htmlFor="">Tỉnh, Thành phố</label>
                                <select className={disableEdit ? 'disable-edit' : ''} disabled={disableEdit} onChange={(e) => getProvinceId(e.target.value)}>
                                    <option value=''>Tỉnh / Thành Phố</option>
                                    {
                                        province.map((item, index) =>
                                            <option value={item.ProvinceID} key={index}>{item?.ProvinceName}</option>
                                        )
                                    }
                                </select>
                                <label htmlFor="">Xã, phường</label>
                                <select className={disableEdit ? 'disable-edit' : ''} disabled={disableEdit} onChange={(e) => getWardId(e.target.value)}>
                                    <option value=''>Xã / Phường</option>
                                    {
                                        ward.map((item, index) =>
                                            <option value={item.WardCode} key={index}>{item?.WardName}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="row-info">
                                <label htmlFor="">Địa chỉ</label>
                                <input className={disableEdit ? 'disable-edit' : ''} disabled={disableEdit} placeholder="Số nhà, tên đường" type="text"></input>
                                <label htmlFor="">Quận, huyện</label>
                                <select className={disableEdit ? 'disable-edit' : ''} disabled={disableEdit} onChange={(e) => getDistrictId(e.target.value)}>
                                    <option value=''>Quận / Huyện</option>
                                    {
                                        district.map((item, index) =>
                                            <option value={item.DistrictID} key={index}>{item?.DistrictName}</option>
                                        )
                                    }
                                </select>
                                <span style={{ height: '26px' }}></span>
                                <div>
                                    {
                                        disableEdit &&
                                        <button onClick={() => acceptEdit()} className="btn-edit-info" style={{ height: '32px', width: '100px', marginRight: '10px' }}>Chỉnh sửa</button>
                                    }
                                    {
                                        !disableEdit &&
                                        <div>
                                            <button onClick={() => saveEdit()} className="btn-edit-info" style={{ height: '32px', width: '100px', marginRight: '10px' }}>Lưu</button>
                                            <button onClick={() => acceptEdit()} className="btn-edit-info" style={{ height: '32px', width: '100px', marginRight: '10px', backgroundColor: 'var(--danger)' }}>Hủy</button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default UserDetail;