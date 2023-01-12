import React, { Component } from "react"
import Navigation from "./components/navigation/navigation.component"
import ImageLinkForm from "./components/imageLinkForm/imageLinkForm.component"
import Logo from "./components/logo/logo.component"
import FaceRecognition from "./components/faceRecognition/faceRecognition.component"
import Rank from "./components/rank/rank.component"
import Signin from "./components/signin/signin.component"
import Register from "./components/register/register.component"
import ParticlesBg from "particles-bg"

import "./App.css"

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
}
class App extends Component {
  constructor() {
    super()
    this.state = initialState
  }
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    })
  }
  calculateFaceLocation = (data) => {
    const image = document.getElementById("inputimage")
    const width = Number(image.width)
    const height = Number(image.height)
    const foundRegions = data.outputs[0].data.regions

    const bounding_box_list = foundRegions.map((region) => {
      const clarifaiFace = region.region_info.bounding_box

      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      }
    })

    return bounding_box_list
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch("https://smartbrain-api-f1v5.onrender.com/imageurl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://smartbrain-api-f1v5.onrender.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, count))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch((err) => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === "signin") {
      this.setState(initialState)
    } else if (route === "home") {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state
    return (
      <div className='App'>
        <ParticlesBg className='particles' color='#ffffff' num={300} type='cobweb' bg={true} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {route === "home" ? (
          <div className='center'>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        )}
      </div>
    )
  }
}

export default App
