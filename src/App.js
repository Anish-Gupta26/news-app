import React from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";

const App =()=> {
  const pageSize = 6
  // const apiKey = process.env.REACT_APP_NEWS_API
  const apiKey = "fd0fb60d6c854ae29ec47deb422fd007" //create process.env file for security. 
    return (
        <div>
          <Router>
          <Navbar/>
          <Switch>
              <Route exact key=""  path="/"><News pageSize={pageSize} apiKey={apiKey} country='in' category="general"/></Route>
              <Route exact key="science" path="/science"><News pageSize={pageSize} apiKey={apiKey} country='in' category="science"/></Route>
              <Route exact key="business" path="/business"><News pageSize={pageSize} apiKey={apiKey} country='in' category="business"/></Route>
              <Route exact key="entertainment" path="/entertainment"><News pageSize={pageSize} apiKey={apiKey} country='in' category="entertainment"/></Route>
              <Route exact key="technology" path="/technology"><News pageSize={pageSize} apiKey={apiKey} country='in' category="technology"/></Route>
              <Route exact key="health" path="/health"><News pageSize={pageSize} apiKey={apiKey} country='in' category="health"/></Route>
              <Route exact key="sports" path="/sports"><News pageSize={pageSize} apiKey={apiKey} country='in' category="sports"/></Route>
          </Switch>
          </Router>
        </div>
    )
}
export default App
