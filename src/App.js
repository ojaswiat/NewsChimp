import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import About from "./components/About";
export default class App extends Component {
    state = {
        progress: 0,
    };

    setProgress = (prog) => {
        this.setState({ progress: prog });
    };

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
                    <LoadingBar
                        color="#f11946"
                        progress={this.state.progress}
                        shadow={true}
                        height={3}
                    />
                    <Routes>
                        <Route
                            exact
                            index
                            path="/"
                            element={
                                <News
                                    setProgress={this.setProgress}
                                    key="/"
                                    apiKey={apiKey}
                                />
                            }
                        />
                        <Route
                            exact
                            path="/general"
                            element={
                                <News
                                    setProgress={this.setProgress}
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
                                            setProgress={this.setProgress}
                                            key={category}
                                            apiKey={apiKey}
                                            category={category}
                                        />
                                    }
                                />
                            );
                        })}
                        <Route
                            exact
                            path={"/about"}
                            element={<About appName="NewsChimp" />}
                        />
                    </Routes>
                </Router>
            </div>
        );
    }
}
