import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import SkoolieNation from './components/SkoolieNation'

ReactDOM.render(
    <Router>
        <SkoolieNation />
    </Router>
    , document.getElementById('root'))

