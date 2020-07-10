import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'
import './tailwind.generated.css'
import * as serviceWorker from './serviceWorker'

// Firebase
import firebase from 'firebase'
import 'firebase/analytics'

import environment from './environments'

firebase.initializeApp(environment.firebaseConfig)

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
