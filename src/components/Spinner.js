import React, { Component } from "react";
import Loading from "./loading.svg";

export class Spinner extends Component {
    static propTypes = {};

    render() {
        return (
            <div className="text-center">
                <img src={Loading} alt="Loading..." />
            </div>
        );
    }
}

export default Spinner;
