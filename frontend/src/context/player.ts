import Factory from "./factory";

export default interface PlayerData {
    name: string,
    color: number,
    resource: {
        coal: number,
        oil: number,
        uranium: number,
        trash: number,
    },
    money: number,
    factory: Array<Factory>,
    confirm: boolean,
}
