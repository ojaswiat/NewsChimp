import React, { Component } from "react";
import PropTypes from "prop-types";

export class About extends Component {
    static propTypes = {
        appName: PropTypes.string,
    };

    constructor(props) {
        super();
        document.title = `${props.appName} | About`;
    }

    render() {
        return (
            <div className="container my-5 pt-5">
                <h1>About {this.props.appName}</h1>
                <hr />
                <h4 className="my-3">
                    NewsChimp is your daily go to platform for latest news and
                    stories from all around the world
                </h4>
                <p>
                    Get Best content daily on your palms or desk. We have over
                    100+ sources and 6+ categories to choose from. From Business
                    to Sports and Technology in between, we've got everything to
                    got you covered.
                </p>
            </div>
        );
    }
}

export default About;
