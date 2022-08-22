import { Avatar, Button, Typography } from "antd";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { AuthContext } from "../Context/AuthProvider";

import { auth, db, onSnapshot, collection, getDocs } from "../../firebase/config";

const UserInfoStyled = styled.div`
    display: flex;
    justify-content: space-between;
    aligh-item: center;
    padding: 12px 16px;
    border-bottom: 1px solid #666;

    .text {
        color: #fff;
        margin-left: 6px;
    }
`



function UserInfo() {
    const { displayName, photoURL} = useContext(AuthContext)

    return (
    <UserInfoStyled>
        <div>
            <Avatar src={photoURL}>{photoURL? '': displayName?.charAt(0).toUpperCase()}</Avatar>
            <Typography.Text className="text">{displayName}</Typography.Text>
        </div>
        <Button ghost onClick={() => auth.signOut()}>Đăng xuất</Button>
    </UserInfoStyled>);
}

export default UserInfo;