import './App.css';
import Navigation from './components/Navigation/Navigation'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import History from './components/History/History'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Stats from './components/Stats/Stats'
import Profile from './components/Profile/Profile'
import Footer from './components/Footer/Footer'
import { React, Component } from 'react';
import Clarifai from 'clarifai';
import { api } from './api/api'

import postgresimg from './assets/postgres.png'
import reactimg from './assets/react.png'
import nodeimg from './assets/node.png'
import githubimg from './assets/github.png'
import brain from './assets/brain.png'

const app = new Clarifai.App({
  apiKey: api
});

const initialState= {
  input: '',
  imageURL: brain,
  box: [{}],
  celebrities: [],
  historyList: [],
  route: 'signin',
  isSignedIn: false,
  profile: false,
  tester: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  })

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height), 

      height: height + 10
    }
  }

  displayFaceBox = (box) => {
    if(box){
      this.setState({box: [box, ...this.state.box]})
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  getCelebrities = (celebFace, i) => {
    const clarifaiCeleb = celebFace.data.concepts[0];
    const celeb = clarifaiCeleb.name;
    const accuracy = clarifaiCeleb.value * 100;
    const roundAccuracy = Math.round(accuracy);

    if(roundAccuracy > 80){
      return celeb;
    }
  }

  setCelebrities = (data) => {
    if(data){
      this.setState({celebrities: [data, ...this.state.celebrities]})
    }
  }

  detectCelebrities = () => {
    app.models.predict(
      Clarifai.CELEBRITY_MODEL, 
      this.state.input)
    .then(response => {
      if(response){
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log)
      }
      this.setState({celebrities: []})
      this.setState({box: [{}]})
      for (let i = 0; i < response.outputs[0].data.regions.length; i++){
        this.setCelebrities(this.getCelebrities(response.outputs[0].data.regions[i], i))
        this.displayFaceBox(this.calculateFaceLocation(response.outputs[0].data.regions[i]))
      }
    })
    .catch(err => console.log(err));
  }

  onPictureSubmit = () => {

    if(this.state.input !== ''){
      this.setState({
        imageURL: this.state.input,
        historyList: [this.state.input, ...this.state.historyList],
        })
      this.detectCelebrities();
    }
  }

  profileOpened = () => {
    if(this.state.profile) {
      this.setState({profile: false})

    } else {
      this.setState({profile: true})
    }
  }

  setTester = () => {
    if(this.state.tester){
      this.setState({tester: false})
    } else {
      this.setState({tester: true})
    }
    console.log(this.state.tester)
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  deleteHistory = () => {
    const Arr = [];
    this.setState({historyList: Arr});
  }

  render(){
    const { isSignedIn, imageURL, route, box, historyList, celebrities, profile, tester } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} profileOpened={this.profileOpened} />
        <Footer postgres={postgresimg} reactimg={reactimg} nodeimg={nodeimg} githubimg={githubimg}/>
        { route === 'home'
          ? <div>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              { profile
              ? <div>
                <Profile user={this.state.user} profileOpened={this.profileOpened} onRouteChange={this.onRouteChange} tester={tester}/> </div>
              : <div className="grid-cols-2 grid-rows-6 grid">
                  <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit}/>
                  <Stats  box={box} celebrities={celebrities}/>
                  <History historyList={historyList} deleteHistory={this.deleteHistory} />
                  <FaceRecognition  box={box} imageURL={imageURL}/>
                </div>
              }
            </div>
          : ( route === 'signin' || route === 'signout'
            ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} setTester={this.setTester} logo={brain}/>
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} logo={brain}/>
          )
        }
      </div>
    );
  }
}

export default App;