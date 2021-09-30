import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            loading: true,
            country: 'in',
            category: 'general',
            totalResults: 0
        }
        var Title = this.props.category[0].toUpperCase() + this.props.category.slice(1);
        document.title = `${Title} | NewsMonkey`
    }
    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }
    async componentDidMount() {  //For the first news fetch
        this.updateNews();
    }
    fetchMoreData = async() => {  //To fetch more news during infinite scroll
        this.setState({page: this.state.page+1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        });
      };
    head = this.props.category[0].toUpperCase() + this.props.category.slice(1)
    render() {
        return (
            <>
                <h2 className="text-center" style={{marginTop: "80px"}}>NewsMonkey - Top {this.head} headlines</h2>
                {this.state.loading && <Loading/>}  
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.state.totalResults}
                    loader={<Loading/>}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {   //Loop to display all the news card
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0.50) : ""} description={element.description ? element.description.slice(0, 82) : ""} imgurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News
