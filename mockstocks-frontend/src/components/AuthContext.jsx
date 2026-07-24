import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };


    {/* "내 밑에 있는 자손들이 AuthContext를 찾으면, 이 value 값을 줘라" */ }
    {/* 이게 value={{ isLoggedIn, login, logout }} 이 부분이 하는 일이에요. React가 이걸 트리 어딘가에 **"기록"**해둬요. */ }
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

{/* useAuth 훅을 만들어서, AuthContext를 쉽게 사용할 수 있도록 해줍니다. */ }
{/* "인자로 넘긴 Context의 현재 값을 리턴한다" */ }
export function useAuth() {
    return useContext(AuthContext);
}