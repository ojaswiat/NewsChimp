import React, { Component } from "react";
import PropTypes from "prop-types";

export class NewsItem extends Component {
    static propTypes = {
        article: PropTypes.object,
    };

    render() {
        const { article } = this.props;
        const defaultUrlToImage =
            "https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=20&m=1182477852&s=612x612&w=0&h=I3wdSzT_5h1y9dHq_YpZ9AqdIKg8epthr8Guva8FkPA=";

        return (
            <div className="card my-2">
                <img
                    className="card-img-top"
                    src={
                        article.urlToImage !== null
                            ? article.urlToImage
                            : defaultUrlToImage
                    }
                    alt="Article thumbnail"
                    style={{ height: "11rem" }}
                />
                <div className="card-body">
                    <h5 className="card-title">
                        {article.title === null
                            ? ""
                            : article.title.length <= 90
                            ? article.title
                            : article.title.slice(0, 87) + "..."}
                    </h5>
                    <p className="card-text">
                        {article.description === null
                            ? ""
                            : article.description.length <= 80
                            ? article.description
                            : article.description.slice(0, 77) + "..."}
                    </p>
                    <div>
                        <button
                            className="btn btn-sm btn-primary"
                            style={{
                                display: "block",
                                marginLeft: "auto",
                                border: "1px solid black",
                                backgroundColor: "transparent",
                            }}
                        >
                            <a
                                style={{ color: "black" }}
                                href={article.url}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                Full Story →
                            </a>
                        </button>
                    </div>
                    <hr className="mb-3" />
                    <div>
                        <p>
                            <em>
                                By {article.author ? article.author : "Unknown"}{" "}
                                on {new Date(article.publishedAt).toGMTString()}
                            </em>
                            <br />
                            <strong>
                                {article.source.name
                                    ? article.source.name
                                    : "Unknown"}
                            </strong>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItem;
