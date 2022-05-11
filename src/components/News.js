import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

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

    constructor(props) {
        // if you want to use props inside the constructor then you have to receive and send it to the super function.
        // otherwise you can only use props using this.props.param in other parts of the code and not inside the constructor.
        super(props);
        // setting initial default state in the constructor
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
            maxNumberOfPages: 0,
        };
        if (!this.props.category || this.props.category === "general") {
            document.title = "NewsChimp | Daily Stories";
        } else {
            document.title =
                "NewsChimp | " +
                this.props.category.charAt(0).toUpperCase() +
                this.props.category.slice(1);
        }
    }

    async populateCurrentPage(page) {
        this.setState({ loading: true });
        let newsApiEndpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(newsApiEndpoint);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            maxNumberOfPages: Math.ceil(
                parsedData.totalResults / this.props.pageSize
            ),
            loading: false,
        });

        return parsedData;
    }

    fetchData = async (page) => {
        this.setState({ page: this.state.page + 1 });

        let newsApiEndpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(newsApiEndpoint);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
        });
    };

    componentDidMount() {
        // runs after render method
        this.populateCurrentPage(1);
    }

    render() {
        let headlineCategory = "";
        if (this.props.category !== "general" && this.props.category !== "/") {
            headlineCategory =
                this.props.category.charAt(0).toUpperCase() +
                this.props.category.slice(1);
        }
        return (
            <div className="container my-5 pt-5">
                <h1>NewsChimp - Top {headlineCategory} Headlines</h1>
                <hr />
                {/* {this.state.loading && <Spinner />} */}
                <br />
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={() => this.fetchData(this.state.page + 1)}
                    hasMore={
                        this.state.articles.length !== this.state.totalResults
                    }
                    loader={<Spinner />}
                    endMessage={
                        <div style={{ textAlign: "center" }}>
                            <br />
                            You've reached the end!
                        </div>
                    }
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((article) => {
                                return (
                                    // have to give unique key to each item
                                    <div className="col-md-4" key={article.url}>
                                        <NewsItem article={article} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        );
    }
}

export default News;
