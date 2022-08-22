import { Modal, Form, Input } from "antd";
import { useContext } from "react";
import addDocument from "../../firebase/service";
import { AppContext } from "../Context/AppProvider";
import { AuthContext } from "../Context/AuthProvider";

function AddRoomModal() {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext)
    const user = useContext(AuthContext) 
    const [form] = Form.useForm()

    const handleOk = () => {
        // Add room to collection
        console.log(form)
        addDocument('rooms', {...form.getFieldValue(), members: [user.uid]})
        setIsAddRoomVisible(false)
        form.resetFields()
    }

    const handleCancel = () => {

        setIsAddRoomVisible(false)
        form.resetFields()
    }

    return (
    <Modal
        title="Tạo phòng"
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
    >
        <Form form={form} layout="vertical">
            <Form.Item label="Tên phòng" name="name">
                <Input placeholder="Nhập tên phòng"/>
            </Form.Item>
            <Form.Item label="Mô tả" name="des">
                <Input.TextArea placeholder="Nhập mô tả"/>
            </Form.Item>
        </Form>
    </Modal>);
}

export default AddRoomModal;