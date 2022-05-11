import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export class Navbar extends Component {
    static propTypes = {
        categories: PropTypes.array,
    };

    render() {
        return (
            <div>
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                    <Link to="/" className="navbar-brand">
                        NewsChimp
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav mr-auto">
                            <li>
                                <Link to="/" className="nav-link">
                                    Home
                                </Link>
                            </li>
                            {this.props.categories.map((category) => {
                                return (
                                    <li key={category}>
                                        <Link
                                            to={"/" + category}
                                            className="nav-link"
                                        >
                                            {category.charAt(0).toUpperCase() +
                                                category.slice(1)}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;
