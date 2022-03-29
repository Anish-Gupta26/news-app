import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const Title = props.category[0].toUpperCase() + props.category.slice(1);
    const [articles, setArticles] = useState([])
    const [page, setpage] = useState(1)
    const [loading, setloading] = useState(true)
    const [totalResults, settotalResults] = useState(0)
    const updateNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setloading(true)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setloading(false)
    }
    useEffect(() => {
        document.title = `${Title} | NewsApp`
        updateNews();
    }, [])

    const fetchMoreData = async () => {  //To fetch more news during infinite scroll
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
        setpage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        settotalResults(parsedData.totalResults);
        setloading(false)
    };
    return (
        <>
            <h2 className="text-center" style={{ marginTop: "80px" }}>NewsApp - Top {Title} headlines</h2>
            {loading && <Loading />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Loading />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {   //Loop to display all the news card
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

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}
export default News
