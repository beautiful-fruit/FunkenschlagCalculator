import { Context, createContext } from "react";

import PlayerData from "./player";
import ResourceData from "./resource";

type Data = {
    self: PlayerData,
    ws?: WebSocket,
    resource: ResourceData,
    players: Array<PlayerData>,
    status: number,
    map?: string
    initCoin: number
};

const defaultData: Data = {
    self: {
        name: "",
        color: -1,
        resource: {
            coal: 0,
            oil: 0,
            uranium: 0,
            trash: 0,
        },
        money: 50,
        factory: [],
        confirm: false,
    },
    resource: {
        coal: {
            remain: 24,
            total: 24,
        },
        oil: {
            remain: 18,
            total: 24,
        },
        uranium: {
            remain: 2,
            total: 12,
        },
        trash: {
            remain: 9,
            total: 24,
        },
    },
    players: [],
    status: 0,
    initCoin: 50,
};
const DataContext: Context<Data> = createContext(defaultData);

export { defaultData };
export default DataContext;
