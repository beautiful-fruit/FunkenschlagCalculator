import {
    ReactElement,
    useContext,
} from "react";
import {
    useNavigate
} from "react-router-dom";

import DataContext from "../../context";

import "./index.scss";

export default function PlayerInfoPage(): ReactElement {
    const data = useContext(DataContext);
    const setNavigate = useNavigate();

    if (data.ws === undefined) {
        setNavigate("/");
    }

    return (
        <div id="playerInfoPage">
            <h4>Resource</h4>
            <div className="block">
                <h5>Property</h5>
                <div className="column">
                    <div className="money">
                        <span className="ms">paid</span>
                        <span className="text">{data.self?.money}</span>
                    </div>
                    <div className="factory">
                        <span className="ms">factory</span>
                        <span className="text">{data.self?.factory.length}</span>
                    </div>
                </div>
            </div>
            <div className="block">
                <h5>Fuel</h5>
                <div className="column">
                    <div className="coal">
                        <span className="ms">landslide</span>
                        <span className="text">{data.self?.resource.coal}</span>
                    </div>
                    <div className="oil">
                        <span className="ms">water_drop</span>
                        <span className="text">{data.self?.resource.oil}</span>
                    </div>
                </div>
                <div className="column">
                    <div className="uranium">
                        <span className="ms">online_prediction</span>
                        <span className="text">{data.self?.resource.uranium}</span>
                    </div>
                    <div className="trash">
                        <span className="ms">delete</span>
                        <span className="text">{data.self?.resource.trash}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
