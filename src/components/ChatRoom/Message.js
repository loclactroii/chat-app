import { Avatar, Typography } from "antd";
import styled from "styled-components";
import { formatRelative } from "date-fns/esm";

const MessageStyled = styled.div`
    margin-bottom: 8px;

    .name {
        font-weight: bold;
        font-size: 16px;
        margin-left: 8px;
    }

    .date {
        font-size: 12px;
        margin-left: 8px;
        color: #999;
    }

    .message {
        margin: 4px 0 0 12px;
        font-size: 14px;
        font-weight: 500;
        color: #666;
    }
`

function Message({ displayName, photoURL, createdAt, text }) {

    function formatDate(seconds) {
        let formattedDate = ''
        if(seconds) {
            formattedDate = formatRelative(new Date(seconds * 1000), new Date())

            formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
        }

        return formattedDate
    }

    return (
        <MessageStyled>
            <div>
                <Avatar src={photoURL}>{text}</Avatar>
                <Typography.Text className="name">{displayName}</Typography.Text>
                <Typography.Text className="date">{formatDate(createdAt)}</Typography.Text>
            </div>
            <div>
                <Typography.Text className="message">{text}</Typography.Text>
            </div>
        </MessageStyled>
    );
}

export default Message;