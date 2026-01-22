import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext ({
    token: {token: null},
    
    authenticateUser: (token) => {},
    logout: () => {},
});

export function AuthContextProvider ({ children }){
    const [authData, setAuthData] = useState ({ token: null })

    useEffect(() =>{
        const storedToken = localStorage.getItem('token');

        if (storedToken){
            setAuthData({ token: storedToken});
        }
    },[]);

    function login(token){
        setAuthData({ token: token});
        localStorage.setItem('token', token);
    }
    
    function logout(){
        setAuthData({ token: null });
        localStorage.removeItem('token');
    }

    const authValue = {
        token: authData,
        authenticateUser: login,
        logout: logout
    };

    return (
        <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
    )
}