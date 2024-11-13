import axios from "axios"
import { UserCredential } from "../domain/UserCredential"
import { LoginResponse } from "../domain/LoginResponse"

export const useLogin = () => {

    const fetchToken = async(userCredential: UserCredential) => {

        await axios.post<LoginResponse>('login', userCredential)

    }
    
    return({
        fetchToken
    })

}