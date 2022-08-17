import { Row, Col, Typography, Button } from "antd";
// import React from "react";

import { auth } from '../../firebase/config';
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";


const fbProvider = new FacebookAuthProvider()
console.log(auth)

function Login () {
    const handleFbLogin = () => {
        signInWithPopup(auth, fbProvider)
    }

    return (
    <Row style={{ height: 800}} justify="center">
        <Col span={8}>
            <Typography.Title style={{ textAlign: 'center', marginBottom: 20}} level={3  }>Bạn vui lòng đăng nhập bằng những cách dưới đây</Typography.Title>
            <Button size="large" style={{ marginBottom: 20, width: '100%'}}>Đăng nhập bằng tài khoản google</Button>
            <Button onClick={handleFbLogin} size="large" style={{width: '100%'}}>Đăng nhập bằng tài khoản facebook</Button>
        </Col>
    </Row>);
}

export default Login