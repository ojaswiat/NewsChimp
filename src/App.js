import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

export default class App extends Component {
    render() {
        let apiKey = "897b2c1c667443cbada74162caf79475";
        let categories = [
            "business",
            "entertainment",
            "health",
            "science",
            "sports",
            "technology",
        ];

        // key parameter in the Route tag is given because jsx expects a unique while looping through ui
        // key parameter in the News component is used to force remount and re render the news component
        return (
            <div>
                <Router>
                    <Navbar categories={categories} />
                    <Routes>
                        <Route
                            exact
                            index
                            path="/"
                            element={<News key="/" apiKey={apiKey} />}
                        />
                        <Route
                            exact
                            path="/general"
                            element={
                                <News
                                    key="general"
                                    apiKey={apiKey}
                                    category={"general"}
                                />
                            }
                        />

                        {categories.map((category) => {
                            return (
                                <Route
                                    key={category}
                                    exact
                                    path={"/" + category}
                                    element={
                                        <News
                                            key={category}
                                            apiKey={apiKey}
                                            category={category}
                                        />
                                    }
                                />
                            );
                        })}
                    </Routes>
                </Router>
            </div>
        );
    }
}
