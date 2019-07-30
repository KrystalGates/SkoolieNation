import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import SkoolieNation from './components/SkoolieNation'
import "semantic-ui-css/semantic.min.css"
import * as firebase from 'firebase/app';
import { firebaseConfig } from './config/firebase';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <Router>
        <SkoolieNation />
    </Router>
    , document.getElementById('root'))
