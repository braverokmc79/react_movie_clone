import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="mail">
                <Link to="/">홈</Link>
            </Menu.Item>
            <Menu.Item key="favorite">
                <Link to="/favorite">좋아하는 영화</Link>
            </Menu.Item>
        </Menu>
    )
}

export default LeftMenu