import { useEffect, useState } from "react";
import managementUserApi from "../../apis/management-user.api";
import Loading from "../../components/Loading/Loading";
import {
    Breadcrumbs, Drawer, FormControlLabel, Modal, Paper, Switch,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TablePagination, TableRow, Typography
} from "@mui/material";
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import UserDetailManagement from "./UserDetailManagement/UserDetailManagement";

const UserManagement = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [userIdDetail, setUsetIdDetail] = useState('')
    // data for call api get all
    const [size, setSize] = useState(5)
    const [page, setPage] = useState(0)

    // set datar response
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [listUser, setListUser] = useState([]);

    const navigate = useNavigate()

    const handleChangePage = (e, newPage) => {
        setPage(newPage)
        getAllUser(newPage, size);
    };

    const handleChangeSize = (event) => {
        getAllUser(0, event.target.value);
        setSize(parseInt(+event.target.value));
        setPage(0);
    };

    const handleClickBreadcrumb = (link) => {
        navigate(link);
    }

    useEffect(() => {
        getAllUser(page, size);
    }, [])

    const getAllUser = (page, size) => {
        setIsLoading(true)
        managementUserApi
            .getUserList(page, size)
            .then((res) => {
                if (res?.success === true) {
                    setTotalAmount(res?.data?.allQuantity)
                    setTotalPage(res?.data?.allPage)
                    setListUser(res?.data?.listUser)
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    const updateStatusUser = (id, role) => {
        if (!id || role === 'Role_Admin') {
            return;
        }
        setIsLoading(true)
        managementUserApi
            .setStatusUser(id)
            .then((res) => {
                if (res?.success === true) {
                    getAllUser(page, size);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
    }

    const showDetailUser = (id) => {
        setUsetIdDetail(id)
        setOpenDetail(true)
    }

    const handleClose = () => {
        setOpenDetail(false)
    }

    return (
        <div style={{ paddingLeft: '260px' }}>
            {isLoading ? <Loading isLoading={isLoading} /> : undefined}
            <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', zIndex: '1300' }}>
                <Header />
            </div>
            <Drawer
                variant="permanent"
                open
                anchor="left">
                <Menu selected='user' />
            </Drawer>
            <div style={{ padding: '70px 15px 70px 15px', height: 'auto' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography onClick={() => handleClickBreadcrumb('/home')} color="gray" fontSize='14px'
                        style={{ cursor: 'pointer' }}>Trang chủ</Typography>
                    <Typography color="var(--main-color)" fontSize='14px'>Quản lý người dùng</Typography>
                </Breadcrumbs>
                <div>
                    <div style={{ margin: '15px 0' }}>
                        <h3 style={{ marginBottom: '15px' }}>Quản lý người dùng</h3>
                        <span>Tổng số người dùng: <strong>{totalAmount}</strong></span>
                    </div>
                    <Paper style={{ width: '100%' }}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table" style={{ width: '100%' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }} align="center">#</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Tên người dùng</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Email</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="right">Số điện thoại</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Vai trò</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Trạng thái</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listUser?.map((user, index) => (
                                        <TableRow key={user?.id} hover role="checkbox" tabIndex={-1}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="left">{user?.name}</TableCell>
                                            <TableCell align="left">{user?.email}</TableCell>
                                            <TableCell align="right">{user?.phone}</TableCell>
                                            <TableCell align="left">{user?.role === 'Role_Admin' ?
                                                <span style={{ color: 'red' }}>Quản trị viên</span> : 'Người dùng'}</TableCell>
                                            <TableCell align="left">
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            disabled={user?.role === 'Role_Admin'}
                                                            checked={user.state === 'activated'}
                                                            onChange={() => updateStatusUser(user?.id, user?.role)}
                                                            name="checkedB"
                                                            color="primary"
                                                        />
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <VisibilityIcon
                                                    onClick={() => showDetailUser(user?.id)}
                                                    style={{
                                                        fontSize: '28px', background: 'transparent', padding: '5px',
                                                        borderRadius: '50%', border: '1px solid var(--main-color)',
                                                        color: 'var(--main-color)', cursor: 'pointer'
                                                    }} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            component="div"
                            labelRowsPerPage='Hiển thị:'
                            count={totalAmount}
                            rowsPerPage={size}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeSize}
                        />
                    </Paper>
                </div>
            </div>
            <div style={{ position: 'fixed', bottom: '0', left: '0', width: 'calc(100% - 260px)', marginLeft: '260px' }}>
                <Footer />
            </div>

            {/* detail modal */}
            <Modal
                open={openDetail}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                <div>
                    <UserDetailManagement id={userIdDetail} handleClose={handleClose}></UserDetailManagement>
                </div>
            </Modal>
        </div>
    )
}

export default UserManagement;