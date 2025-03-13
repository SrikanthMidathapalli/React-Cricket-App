import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout(props) {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("user");

        props.setLoginstatus("gen");

        navigate("/home");
    }, [props]);

    return <div></div>;
}

export default Logout;
