import { createContext, useContext, useMemo, useState } from "react";
import useFireStore from "../../hooks/useFireStore";
import { AuthContext } from "./AuthProvider";
export const AppContext = createContext()

function AppProvider({ children }) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState('')

    // Get uid for match
    const { uid } = useContext(AuthContext)

    // useMemo for obj
    const getRoomHasMember = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    }, [uid])

    var rooms = useFireStore('rooms', getRoomHasMember)

    const roomSelectedId = rooms.find(room => room.id === selectedRoom) || {}

    // Get all user in room
    const getMembersHaveInRoom = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: roomSelectedId.members,
        }
    }, [roomSelectedId.members])

    var members = useFireStore('users', getMembersHaveInRoom)

    return (
        <AppContext.Provider value={{ isInviteMemberVisible, setIsInviteMemberVisible, members, rooms, roomSelectedId, isAddRoomVisible, setIsAddRoomVisible, selectedRoom, setSelectedRoom}}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;