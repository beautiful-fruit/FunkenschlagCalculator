import {
    ReactElement,
    useContext,
    useEffect
} from "react";
import { useNavigate } from "react-router-dom";

import DataContext from "../../context";

import "./index.scss";

export default function ResourcePage(): ReactElement {
    const data = useContext(DataContext);
    const setNavigate = useNavigate();

    useEffect(() => {
        return;
        // if (data.ws === undefined) setNavigate("/");
        // if (data.ws?.readyState !== WebSocket.OPEN) setNavigate("/");
    }, [data, setNavigate]);

    return (
        <div id="resourcePage">
            
        </div>
    );
}
