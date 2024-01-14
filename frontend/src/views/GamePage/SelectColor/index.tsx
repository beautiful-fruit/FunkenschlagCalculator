import {
    Dispatch,
    ReactElement,
    SetStateAction,
    useContext
} from "react";

import DataContext from "../../../context";
import PlayerData from "../../../context/player";

import "./index.scss";

type propsType = Readonly<{
    setSelf: Dispatch<SetStateAction<PlayerData>>,
}>;

const COLOR: Array<string> = ["Black", "Purple", "Yellow", "Red", "Blue", "Green"];

export default function SelectColor(props: propsType): ReactElement {
    const {
        setSelf,
    } = props;

    const data = useContext(DataContext);
    const ready = data.self.confirm;
    const selfColor = data.self.color;
    const selectedColor = data.players.map(player => player.color);

    return (
        <div id="selectColor">
            <h4>Select Color</h4>
            <div className="colors">
                {
                    COLOR.map((s, index) => (
                        <div
                            key={index}
                            className={s.toLowerCase()}
                            onClick={() => {
                                if (selectedColor.includes(index) || selfColor === index || ready) return;
                                setSelf(v => {
                                    const nv = Object.assign({}, v);
                                    nv.color = index;
                                    return nv;
                                })
                            }}
                            data-player={selfColor === index}
                            data-selected={(selectedColor.includes(index) || ready) && selfColor !== index}
                        >{s}</div>
                    ))
                }
            </div>
            <div>Ready: {data.players.filter(v => v.confirm).length}/{data.players.length}</div>
            <button
                className="ready"
                onClick={() => setSelf(v => {
                    const nv = Object.assign({}, v);
                    nv.confirm = !nv.confirm;
                    return nv;
                })}
                data-ready={ready}
                disabled={data.players.length < 2}
            >{ready ? "Cancel" : "Ready"}</button>
        </div>
    );
}
