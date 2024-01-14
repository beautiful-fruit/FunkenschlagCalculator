import {
    CSSProperties,
    Dispatch,
    ReactElement,
    SetStateAction,
    useState,
} from "react";
import {
    useNavigate,
} from "react-router-dom";

import ResourceData from "../../context/resource";

import "./index.scss"

type propsType = Readonly<{
    setWs: Dispatch<SetStateAction<WebSocket | undefined>>,
    setResource: Dispatch<SetStateAction<ResourceData>>,
    setStatus: Dispatch<SetStateAction<number>>,
    setMap: Dispatch<SetStateAction<string | undefined>>,
    setInitCoin: Dispatch<SetStateAction<number>>,
}>;

const MAP = [
    "Germany",
    "US",
];

export default function CreatePage(props: propsType): ReactElement {
    const {
        setWs,
        setResource,
        setStatus,
        setMap,
        setInitCoin,
    } = props;

    const [mapNum, setMapNum] = useState<number>(0);
    const [resourceNum, setResourceNum] = useState<Array<number>>([24, 18, 2, 9]);
    const [initCoinNum, setInitCoinNum] = useState<number>(50);
    const setNavigate = useNavigate();

    const changeMap = (m: number) => () => setMapNum(v => (v + m + MAP.length) % MAP.length);
    const changeResource = (i: number, m: number) => () => setResourceNum(va => {
        let new_va = Array.from(va);
        new_va[i] = Math.max(Math.min(va[i] + m, i === 2 ? 12 : 24), 0);
        return new_va;
    });
    const changeCoin = (m: number) => () => setInitCoinNum(v => Math.max(v + m, 0));

    const start = () => {
        let api_endpoint = process.env.REACT_APP_API_END_POINT;
        if (!api_endpoint?.startsWith("http")) {
            api_endpoint = `${window.location.origin}${api_endpoint}`
        }
        api_endpoint = api_endpoint.replace("http", "ws");
        const code = (Math.random() * Date.now()).toString(16);
        let ws = new WebSocket(`${api_endpoint}/game/${code}`);
        setWs(ws);
        setResource({
            coal: { remain: resourceNum[0], total: 24 },
            oil: { remain: resourceNum[1], total: 24 },
            uranium: { remain: resourceNum[2], total: 12 },
            trash: { remain: resourceNum[3], total: 24 },
        });
        setStatus(0);
        setMap(MAP[mapNum]);
        setInitCoin(initCoinNum);
        setNavigate(`/game?code=${code}`);
    };

    return (
        <div id="createPage">
            <h4>Create Game</h4>
            <h5>Map</h5>
            <div className="column selectMap" style={{ "--text-length": Math.max(...MAP.map(v => v.length)) } as CSSProperties}>
                <span className="ms" onClick={changeMap(-1)}>keyboard_arrow_left</span>
                <span className="text">{MAP[mapNum]}</span>
                <span className="ms" onClick={changeMap(1)}>keyboard_arrow_right</span>
            </div>
            <h5>Resource</h5>
            {
                Array.from(Array(4)).map((_, i) => (
                    <div key={i} className="column resource">
                        <span className="label">{["Coal", "Oil", "Uranium", "Trash"][i]}</span>
                        <span className="btn" onClick={changeResource(i, -1)}>-</span>
                        <span className="text">{resourceNum[i]}</span>
                        <span className="btn" onClick={changeResource(i, 1)}>+</span>
                    </div>
                ))
            }
            <h5>Other</h5>
            <div className="column initCoin">
                <span className="label">Initial Coin</span>
                <span className="btn" onClick={changeCoin(-1)}>-</span>
                <span className="text">{initCoinNum}</span>
                <span className="btn" onClick={changeCoin(1)}>+</span>
            </div>
            <button className="start" onClick={start}>Start</button>
        </div>
    );
}
