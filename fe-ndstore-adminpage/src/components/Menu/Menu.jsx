import '../Menu/Menu.css';
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import BarChartIcon from '@material-ui/icons/BarChart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CategoryIcon from '@material-ui/icons/Category';
import InboxIcon from '@material-ui/icons/Inbox';
import GradeIcon from '@material-ui/icons/Grade';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { useNavigate } from 'react-router-dom';

const Menu = (props) => {

    const navigate = useNavigate()

    const selectItemMenu = (key) => {
        navigate(key)
    }

    return (
        <div id="menu">
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Danh sách quản lý
                    </ListSubheader>
                }
            >
                <ListItem button onClick={() => selectItemMenu('statistic')} className={props.selected === 'statistic' ? 'active' : ''} >
                    <ListItemIcon>
                        <BarChartIcon className={props.selected === 'statistic' ? 'active-icon' : ''} />
                    </ListItemIcon>
                    <ListItemText primary="Thống kê" />
                </ListItem>
                <ListItem button onClick={() => selectItemMenu('/user-management')} className={props.selected === 'user' ? 'active' : ''}>
                    <ListItemIcon>
                        <AccountCircleIcon className={props.selected === 'user' ? 'active-icon' : ''} />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý người dùng" />
                </ListItem>
                <ListItem button onClick={() => selectItemMenu('/brand-management')} className={props.selected === 'brand' ? 'active' : ''}>
                    <ListItemIcon>
                        <GradeIcon className={props.selected === 'brand' ? 'active-icon' : ''} />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý thương hiệu" />
                </ListItem>
                <ListItem button onClick={() => selectItemMenu('/category-management')} className={props.selected === 'category' ? 'active' : ''}>
                    <ListItemIcon>
                        <CategoryIcon className={props.selected === 'category' ? 'active-icon' : ''} />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý danh mục" />
                </ListItem>
                <ListItem button onClick={() => selectItemMenu('/product-management')} className={props.selected === 'product' ? 'active' : ''}>
                    <ListItemIcon>
                        <InboxIcon className={props.selected === 'product' ? 'active-icon' : ''} />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý sản phẩm" />
                </ListItem>
                <ListItem button onClick={() => selectItemMenu('/order-management')} className={props.selected === 'order' ? 'active' : ''}>
                    <ListItemIcon>
                        <LocalMallIcon className={props.selected === 'order' ? 'active-icon' : ''} />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý đơn hàng" />
                </ListItem>
            </List>
        </div>
    )
}

export default Menu;