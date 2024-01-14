export default interface Factory {
    basePrice: number,
    cost: {
        coal: number,
        oil: number,
        uranium: number,
        trash: number,
    },
    green: boolean,
    power: number,
};

export function genFactory(
    basePrice: number,
    coal: number,
    oil: number,
    uranium: number,
    trash: number,
    power: number,
): Factory {
    return {
        basePrice: basePrice,
        cost: {
            coal: coal,
            oil: oil,
            uranium: uranium,
            trash: trash,
        },
        green: coal + oil + uranium + trash === 0,
        power: power,
    };
}
