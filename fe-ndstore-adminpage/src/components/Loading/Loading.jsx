import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const Loading = (props) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(props.isLoading);
    }, [props.isLoading]);

    return (
        <>
            <div className="lib-spin-wrapper">
                <div className="lib-spin-content">
                    <CircularProgress disableShrink />;
                </div>
            </div>
        </>
    );
}

export default Loading;