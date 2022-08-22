import { UserAddOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, Form, Input, Tooltip } from "antd";
import { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import addDocument from "../../firebase/service";
import useFireStore from "../../hooks/useFireStore";
import { AppContext } from "../Context/AppProvider";
import { AuthContext } from "../Context/AuthProvider";
import Message from "./Message";

const WrapperStyled = styled.div`
    height: 100vh;
`

const HeaderStyled = styled.div`
    display: flex;
    align-item: center;
    justify-content: space-between;
    height: 57px;
    padding: 0 24px;
    border-bottom: 1px solid #999;

    .header {
        &__info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        &__title {
            margin: 0;
            font-size: 16px;
            font-weight: bold;
        }

        &__des {
            margin: 0;
            font-size: 14px;
        }
    }
`

const AvatarGroupStyled = styled.div`
    display: flex;
    align-items: center;
`

const ContentStyled = styled.div`
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 12px;
`

const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`

const FormStyled = styled(Form)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2px 2px 2px 0;

    .ant-form-item {
        margin-bottom: 0;
        flex: 1;
        border: 1px solid #ccc;
        margin-right: 2px;
    }
`

function ChatWindow() {
    const [value, setValue] = useState()
    const { roomSelectedId, members, setIsInviteMemberVisible, selectedRoom } = useContext(AppContext)
    const user = useContext(AuthContext)
    const [form] = Form.useForm()

    const handleInputChange = (e) => {
        setValue(e.target.value)
    }

    const handleInputSubmit = () => {
        addDocument('message', {
            displayName: user.displayName,
            photoURL: user.photoURL,
            roomId: selectedRoom,
            text: value,
            uid: user.uid
        })

        form.resetFields(['message'])
    }

    const conditon = useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom
    }), [selectedRoom])

    const msg = useFireStore('message', conditon)
    console.log(msg)

    return (
    <WrapperStyled>
        {
            roomSelectedId.id? 
    (<>
        <HeaderStyled>
            <div className="header__info">
                <p className="header__title">{roomSelectedId? roomSelectedId.name: ''}</p>
                <span className="header__des">{roomSelectedId? roomSelectedId.des: ''}</span>
            </div>
            <AvatarGroupStyled>
                <Button onClick={() => setIsInviteMemberVisible(true)} type="text" icon={<UserAddOutlined />}>Mời</Button>
                <Avatar.Group maxCount={2}>
                    {
                        members.map(member => 
                        <Tooltip title={member.displayName} key={member.id}>
                            <Avatar src={member.photoURL}>{!member.photoURL? member.displayName.charAt(0).toUpperCase(): ''}</Avatar>
                        </Tooltip>)
                    }
                </Avatar.Group>
            </AvatarGroupStyled>
        </HeaderStyled>

        <ContentStyled>
            <MessageListStyled>
                {
                    msg.map(item => (
                        <Message key={item.id} text={item.text} photoURL={item.photoURL} displayName={item.displayName} createdAt={item.createdAt.seconds}/>
                    ))
                }
                {/* <Message text="Hello 2" photoURL={null} displayName="ABC" createdAt={123456789}/>
                <Message text="Hello 3" photoURL={null} displayName="ABC" createdAt={123456789}/>
                <Message text="Hello 4" photoURL={null} displayName="ABC" createdAt={123456789}/> */}
            </MessageListStyled>
            <FormStyled form={form}>
                <Form.Item name='message'>
                    <Input
                    onChange={handleInputChange}
                    onPressEnter={handleInputSubmit}
                    autoComplete="off" bordered={false} placeholder="Mời bạn nhập tin nhắn!"/>
                </Form.Item>
                <Button
                onClick={handleInputSubmit}
                type="primary">Gửi</Button>
            </FormStyled>
        </ContentStyled>
    </>): 
    <Alert message="Hãy chọn phòng" type="info" showIcon style={{margin: 5}} closable/>
        }
    </WrapperStyled>
    );
}

export default ChatWindow;