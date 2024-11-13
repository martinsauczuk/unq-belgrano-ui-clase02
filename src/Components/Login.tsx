import axios from "axios";
import { useState } from "react";
import { UserCredential } from "../domain/UserCredential";
import { useLogin } from "../hooks/useLogin";


export const Login: React.FC = () => {

    const [userCredential, setUserCredential] = useState<UserCredential>({username: '', password: ''});
    const { fetchToken } = useLogin();

    // const response = await axios.post('login', )
        //   JSON.stringify({username: user, password: pwd}),
    //       {
            // headers: {'Content-Type': 'application/json'},
    //         withCredentials: true
  
    //       }
    //       );
    //       console.log(JSON.stringify(response?.data));              {/* imprime el token y la lista de roles en la consola */}
    //       const accessToken = response?.data?.token;
    //       const roles = response?.data?.roles;
    //       setAuth({user, pwd, roles, accessToken});
    //     setUser('');
    //     setPwd('');
  
    //     setSuccess(true);
  
    //   }

    

    setUserCredential({username: 'hola', password: '3ds'})

    const handleSubmit = async (e:Event) => {
        e.preventDefault();
        
    }


    return (
        <>
            <h1>Usuario: {userCredential.username}</h1>
            <h1>Usuario: {userCredential.password}</h1>

        </>
    )

}