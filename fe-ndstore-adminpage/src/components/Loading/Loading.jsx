
import { useEffect, useState } from "react";
import '../Loading/Loading.css'
import { CircularProgress } from "@mui/material";

const Loading = (props) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(props.isLoading);
    }, [props.isLoading]);

    return (
        <>
            <div className="spin-wrapper">
                <div className="spin-content">
                    {
                        loading === true &&
                        <CircularProgress />
                    }
                </div>
            </div>
        </>
    );
}

export default Loading;