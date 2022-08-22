import { Row, Col, Typography, Button } from "antd";
// import React from "react";

import { auth } from '../../firebase/config';
import { FacebookAuthProvider, signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import addDocument, { generateKeywords } from "../../firebase/service";


const fbProvider = new FacebookAuthProvider()

function Login () {
    const handleFbLogin = async () => {
        const data = await signInWithPopup(auth, fbProvider)
        if(getAdditionalUserInfo(data).isNewUser) {

            addDocument('users', {
                displayName: data.user.displayName,
                email: data.user.email,
                photoURL: data.user.photoURL,
                uid: data.user.uid,
                providerId: data.providerId,
                keyWords: generateKeywords(data.user.displayName)
            })
        }
         
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