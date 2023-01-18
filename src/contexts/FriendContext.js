import React, { createContext, useState, useMemo } from 'react'

const FriendContext = createContext();

export const FriendProvider = ({children}) => {
    const [friends, setFriends] = useState([]);
    const provider = useMemo(() => ({friends, setFriends}), [friends, setFriends])
    return(
        <FriendContext.Provider value={provider}>
            {children}
        </FriendContext.Provider>

    )
}

export default FriendContext;