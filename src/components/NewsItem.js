import React from 'react'
const NewsItem = (props)=> {
        let {title,description,imgurl,newsUrl,author,date,source} = props;
        return (
                <div className="card my-3" style={{width: "18rem"}}>
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%"}}>
                       {source}
                    </span>
                    <img src={imgurl?props.imgurl:"https://media.istockphoto.com/vectors/-vector-id1183338498"} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}..</h5>
                        <p className="card-text">{description}...</p>
                        <a rel="noreferrer" href={newsUrl}  target="_blank"  className="btn btn-sm btn-primary">Read More</a>
                        <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                    </div>
                </div>
        )
}
export default NewsItem
