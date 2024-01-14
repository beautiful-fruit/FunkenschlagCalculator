import {
    ReactElement,
    useEffect,
    useState,
} from "react";
import {
    Navigate,
    Route,
    Routes,
    useSearchParams,
} from "react-router-dom";

import ResourceData from "./context/resource";
import PlayerData from "./context/player";
import DataContext, { defaultData } from "./context";

// import PlayerInfoPage from "./components/PlayerInfoPage";
import CreatePage from "./views/CreatePage";
import GamePage from "./views/GamePage";
import ResourcePage from "./views/ResourcePage";

import "./App.scss";

interface WSMessage {
    type: string,
    sender?: string,
    data?: any,
};

export default function App(): ReactElement {
    const [self, setSelf] = useState<PlayerData>(defaultData.self);
    const [ws, setWs] = useState<WebSocket | undefined>();
    const [wsMessage, setWsMessage] = useState<string>("");
    const [wsFirstUpdate, setWsFirstUpdate] = useState<boolean>(false);
    const [resource, setResource] = useState<ResourceData>(defaultData.resource);
    const [players, setPlayers] = useState<Array<PlayerData>>(defaultData.players);
    const [status, setStatus] = useState<number>(defaultData.status);
    const [map, setMap] = useState<string | undefined>();
    const [initCoin, setInitCoin] = useState<number>(defaultData.initCoin);
    // const [searchParams, setSearchParams] = useSearchParams();

    // useEffect(() => {
    //     console.log(searchParams.get("code"));
    //     searchParams.delete("code");
    //     setSearchParams(searchParams);
    // }, []);

    // 檢查是否所有玩家都完成準備
    useEffect(() => {
        // console.log(players)
        if (status !== 0) return;
        if (players.length < 2) return;
        if (players.map(v => v.confirm).includes(false)) return;
        setStatus(1);
    }, [players, status]);

    // 若自身資料改變，則進行廣播
    useEffect(() => {
        if (self.name === "" || ws === undefined || ws.readyState !== WebSocket.OPEN) return;
        ws.send(JSON.stringify({
            type: "PLAYER",
            sender: self.name,
            data: self
        }));
    }, [self, ws]);

    // WebSocket 控制中樞
    useEffect(() => {
        if (wsMessage === "" || ws === undefined) return;
        const data: WSMessage = JSON.parse(wsMessage);
        setWsMessage("");
        switch (data.type) {
            case "NAME":
                const name = data.data;
                setSelf(data => {
                    let newData = Object.assign({}, data);
                    newData.name = name ?? newData.name;
                    return newData;
                });
                break;
            case "UPDATE":
                setPlayers([]);
                ws.send(JSON.stringify({
                    type: "PLAYER",
                    sender: self.name,
                    data: self
                }));
                if (!wsFirstUpdate) {
                    setWsFirstUpdate(true);
                    return;
                }
                break;
            case "PLAYER":
                if (data.data === undefined) return;
                const player: PlayerData = data.data;
                setPlayers(origin => {
                    let newList = Array.from(origin);
                    if (newList.map(p => p.name).includes(player.name)) {
                        const index = newList.map(p => p.name).indexOf(player.name);
                        newList[index] = player;
                    }
                    else {
                        newList.push(player);
                    }
                    return newList;
                });
                break;
        }
    }, [self, ws, wsMessage, wsFirstUpdate]);

    useEffect(() => {
        if (ws === undefined) {
            setSelf(defaultData.self);
            setWsFirstUpdate(false);
            return;
        };
        ws.onopen = () => {
            ws.send(JSON.stringify({ type: "UPDATE" }));
        }
        ws.onmessage = (event: MessageEvent) => {
            setWsMessage(event.data);
        }
        ws.onclose = () => {
            setWs(undefined);
        };
    }, [ws]);

    return (
        <div id="app" data-theme="dark">
            <DataContext.Provider value={{
                self: self,
                ws: ws,
                resource: resource,
                players: players,
                status: status,
                map: map,
                initCoin: initCoin
            }}>
                {/* <CreatePage /> */}
                {/* <PlayerInfoPage /> */}
                <Routes>
                    <Route path="/create" element={
                        <CreatePage
                            setWs={setWs}
                            setResource={setResource}
                            setStatus={setStatus}
                            setMap={setMap}
                            setInitCoin={setInitCoin}
                        />
                    } />
                    <Route path="/game/*" element={
                        <GamePage
                            setSelf={setSelf}
                            setWs={setWs}
                        />
                    } />
                    <Route path="*" element={<Navigate to="/create" />} />
                </Routes>
            </DataContext.Provider>
        </div>
    );
}
