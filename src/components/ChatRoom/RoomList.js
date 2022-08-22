import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Collapse, Typography } from 'antd'
import { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../Context/AppProvider';

const PanelStyled = styled(Collapse.Panel)`
    &&& {
        .ant-collapse-header, 
        p {
            color: #fff
        }

        .ant-collapse-content-box {
            padding: 0 40px;
        }

        .btn {
            border: none;
            color: #fff;
            padding: 0;
        }
    }
`

const TextStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 4px;

`

function RoomList() {
    const {rooms, setIsAddRoomVisible, setSelectedRoom} = useContext(AppContext)

    const handleClick = () => {
        setIsAddRoomVisible(true)
    }

    return (
        <Collapse ghost defaultActiveKey={[1]}>
            <PanelStyled key={1} header="Danh sách các phòng">
                {
                    rooms.map((room) =><TextStyled onClick={() => setSelectedRoom(room.id)}key={room.id}>{room.name}</TextStyled>)
                }
                <Button onClick={handleClick} type='text' icon={<PlusSquareOutlined />} className='btn'>Thêm phòng</Button>
            </PanelStyled>
        </Collapse>
    );
}

export default RoomList;