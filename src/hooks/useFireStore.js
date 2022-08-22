import { db, onSnapshot, collection, where, query } from "../firebase/config";
import { useEffect, useState } from "react";

function useFireStore(collectionName, condition) {
    const [documents, setDocuments] = useState([])
    
    // Render rooms
    useEffect(() => {
        if(condition) {
            if(condition.compareValue) {
                var ref = query(collection(db, collectionName), where(condition.fieldName, condition.operator, condition.compareValue))
            }else {
                return
            }
        }

        const unsubcribe = onSnapshot(ref, (snapshot) => {
            const data = []
            snapshot.docs.forEach(item => {
                data.push({ ...item.data(), id: item.id})
            })
            setDocuments(data)
        })


        return unsubcribe;
        }, [collectionName, condition])

    return documents;
}

export default useFireStore;