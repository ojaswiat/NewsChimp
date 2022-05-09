import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

export class News extends Component {
    static defaultProps = {
        pageSize: 15,
        country: "in",
        category: "general",
    };

    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string,
        apiKey: PropTypes.string,
    };

    constructor() {
        super();
        // setting initial default state in the constructor
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
            maxNumberOfPages: 0,
        };
    }

    async populateCurrentPage(page) {
        this.setState({ loading: true });
        let newsApiEndpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(newsApiEndpoint);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            maxNumberOfPages: Math.ceil(
                parsedData.totalResults / this.props.pageSize
            ),
            loading: false,
        });
    }

    componentDidMount() {
        // runs after render method
        this.populateCurrentPage(1);
    }

    nextPage = () => {
        if (this.state.page >= this.state.maxNumberOfPages) {
            return;
        } else {
            this.populateCurrentPage(this.state.page + 1);
            // modifying state after rendering the current page because of async await issue
            this.setState({
                page: this.state.page + 1,
            });
        }
    };

    previousPage = () => {
        if (this.state.page <= 1) {
            return;
        } else {
            this.populateCurrentPage(this.state.page - 1);
            // modifying state after rendering the current page because of async await issue
            this.setState({
                page: this.state.page - 1,
            });
        }
    };

    render() {
        let headlineCategory = "";
        if (this.props.category !== "general" && this.props.category !== "/") {
            headlineCategory =
                this.props.category.charAt(0).toUpperCase() +
                this.props.category.slice(1);
        }
        return (
            <div className="container my-5">
                <h1>NewsChimp - Top {headlineCategory} Headlines</h1>
                {this.state.loading && <Spinner />}
                <hr />
                <br />
                <div className="row">
                    {!this.state.loading &&
                        this.state.articles.map((article) => {
                            return (
                                // have to give unique key to each item
                                <div className="col-md-4" key={article.url}>
                                    <NewsItem article={article} />
                                </div>
                            );
                        })}
                </div>
                <div className="d-flex justify-content-between">
                    <button
                        disabled={this.state.page <= 1}
                        onClick={this.previousPage}
                        type="button"
                        className="btn btn-light"
                    >
                        ← Previous
                    </button>
                    <button
                        disabled={
                            this.state.page >= this.state.maxNumberOfPages
                        }
                        onClick={this.nextPage}
                        type="button"
                        className="btn btn-light"
                    >
                        More Stories →
                    </button>
                </div>
            </div>
        );
    }
}

export default News;
