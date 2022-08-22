import { Row, Col } from 'antd'
import UserInfo from './UserInfo';
import RoomList from './RoomList';
import styled from 'styled-components';

const SideBarStyled = styled.div`
    background: #3f0e40;
    color: #fff;
    height: 100vh;
`

function SideBar() {
    return (
        <SideBarStyled>
            <Row>
                <Col span={24}><UserInfo /></Col>
                <Col span={24}><RoomList /></Col>
            </Row>
        </SideBarStyled>
    );
}

export default SideBar;