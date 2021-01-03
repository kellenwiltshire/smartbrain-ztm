import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import History from './components/History/History'
import Particles from 'react-particles-js';
import { React, Component } from 'react';
import Clarifai from 'clarifai';
import { api } from './api/api'

const app = new Clarifai.App({
  apiKey: api
});

const particlesOptions = {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
  }
class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      historyList: [],
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {

    if(this.state.input !== ''){
      this.setState({
        imageURL: this.state.input,
        historyList: [this.state.input, ...this.state.historyList],
        })
  
      app.models.predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
    }

  }

  render(){
    return (
      <div className="App">
         <Particles className="fixed inset-0 -z-1 bg-blue-900"
                params={particlesOptions}
              />
        <Navigation />
        <Logo />
        <Rank />
        <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <History historyList={this.state.historyList} />
      </div>
    );
  }
}

export default App;
