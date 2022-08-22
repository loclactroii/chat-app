import { Modal, Form, Select, Spin, Avatar } from "antd";
import { debounce } from "lodash";
import { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { collection, doc, db, getDocs, query, where } from "../../firebase/config";
import { AppContext } from "../Context/AppProvider";
import { updateDoc } from "firebase/firestore";
import { AuthContext } from "../Context/AuthProvider";

const SelectOptionsStyled = styled(Select.Option)`
    height: 36px !important;
`

function DebounceSelect({ fetchOptions, debounceTimeOut = 300, ...props}) {

    const [feaching, setFetching] = useState(false)
    const [options, setOptions] = useState([])

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([])
            setFetching(true)

            fetchOptions(value, props.members)
                .then(newOptions => {
                    console.log(newOptions)
                    setOptions(newOptions)
                    setFetching(false)
                })
        }

        return debounce(loadOptions, debounceTimeOut)
    }, [debounceTimeOut, fetchOptions])

    return (
        <Select 
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={ feaching? <Spin />: null}
            {...props}
            size="large"
        >
            {
                options.map(option => {
                    if(option) {
                        return (
                            <SelectOptionsStyled style={{height: 36}} key={option.value} value={option.value} title={option.label}>
                                <Avatar size="small" src={option.photoURL}>{option.photoURL? '': option.label?.charAt(0).toUpperCase()}</Avatar>
                                {` ${option.label}`}
                            </SelectOptionsStyled>
                        )
                    }else {

                    }
                })
            }
        </Select>


    )
}

function AddMember() {
    const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoom, roomSelectedId } = useContext(AppContext)
    const [value, setValue] = useState([])
    const [form] = Form.useForm()
    console.log(roomSelectedId)
    const handleOk = async () => {
        const docRef = doc(db, 'rooms', selectedRoom)
        await updateDoc(docRef, {
            members: [...roomSelectedId.members, ...value.map(val => val.value)]
        })
        
        form.resetFields()
        setIsInviteMemberVisible(false)
    }

    const handleCancel = () => {
        form.resetFields()
        setIsInviteMemberVisible(false)
    }

    const fetchUserList = async (search, members) => {
        var ref = query(collection(db, 'users'), where('keyWords', 'array-contains', search))
        
        const querySnapshot = await getDocs(ref);
            return querySnapshot.docs.map(item => ({
                label: item.data().displayName,
                value: item.data().uid,
                photoURL: item.data().photoURL,
            })).filter(opt => !members.includes(opt.value))
    }

    return (
    <Modal
        title="Tạo phòng"
        visible={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
    >
        <Form form={form} layout="vertical">
            <DebounceSelect 
                mode="multiple"
                label="Tên các thành viên"
                value={value}
                placeholder="Nhập tên thành viên"
                fetchOptions={fetchUserList}
                onChange={newValue => setValue(newValue)}
                style={{width: '100%'}}
                members={roomSelectedId.members}
            />
        </Form>
    </Modal>);
}

export default AddMember;