import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AuthGoogle = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const decode = jwt_decode(searchParams.get("token"));

    let navigate = useNavigate();

    useEffect(() => {
        if (searchParams.get("token")) {
            localStorage.setItem('access-token', searchParams.get("token"))
            localStorage.setItem('user-infor', JSON.stringify({
                email: decode.sub.slice(decode.sub.indexOf(',') + 1),
                name: decode.sub.slice(decode.sub.indexOf(',') + 1),
                avatar: ''
            }))
            return navigate("/")
        }
    }, [searchParams, decode, navigate])

    return (
        <></>
    )
}

export default AuthGoogle