import React, { createContext, useState, useMemo } from 'react'

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({});
    const provider = useMemo(() => ({user, setUser}), [user, setUser])
    return(
        <UserContext.Provider value={provider}>
            {children}
        </UserContext.Provider>

    )
}

export default UserContext;