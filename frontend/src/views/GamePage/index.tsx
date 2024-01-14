import {
    Dispatch,
    ReactElement,
    SetStateAction,
    useContext,
    useEffect,
} from "react";
import {
    Route,
    Routes,
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import DataContext from "../../context";

import SelectColor from "./SelectColor";
import PlayerData from "../../context/player";

type propsType = Readonly<{
    setSelf: Dispatch<SetStateAction<PlayerData>>,
    setWs: Dispatch<SetStateAction<WebSocket | undefined>>,
}>;

export default function GamePage(props: propsType): ReactElement {
    const {
        setSelf,
        setWs
    } = props;

    const [searchParams,] = useSearchParams();
    const setNavigate = useNavigate();

    const data = useContext(DataContext);
    const ws = data.ws

    useEffect(() => {
        if (ws !== undefined) return;
        const code = searchParams.get("code");
        if (code === null || data.status !== 0) {
            setNavigate("/");
            return;
        }
        let api_endpoint = process.env.REACT_APP_API_END_POINT;
        if (!api_endpoint?.startsWith("http")) {
            api_endpoint = `${window.location.origin}${api_endpoint}`
        }
        api_endpoint = api_endpoint.replace("http", "ws");
        let newWs = new WebSocket(`${api_endpoint}/game/${code}`);
        setWs(newWs);
    }, [ws, setWs, searchParams, data, setNavigate]);

    useEffect(() => {
        if (ws === undefined) return;
        switch (data.status) {
            case 0:
                setNavigate("selectColor");
                break;
        }
    }, [ws, data, setNavigate]);

    return (
        <div>
            <Routes>
                <Route path="selectColor" element={<SelectColor setSelf={setSelf} />} />
            </Routes>
        </div>
    );
}
