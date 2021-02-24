import React from 'react'
import axios from 'axios'
import { Player } from 'video-react';
import ControlBar from 'video-react/lib/components/control-bar/ControlBar';

class Main extends React.Component {
  constructor() {
    super();
    // this.getLink = this.getLink.bind(this)
    this.getRandom = this.getRandom.bind(this);
    this.state = {
      data: [],
      currentLink: "",
    };
    this.handleMute = this.handleMute.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
    this.button =this.button.bind(this)
  }

  async componentDidMount() {
    console.log("in componentDidMount");
    const {player} = this.player.getState()
    console.log('on line 22', player)
    const { data } = await axios.get("/api/collection/");
    const length = data.collection.metadata.total_hits;
    console.log("in comopnent , data", data);
    this.setState({ data: data.collection.items });
    const randomAsset = this.state.data[this.getRandom(length)];
    console.log("random asset", randomAsset);
    const link = await axios.get(`/api/asset/${randomAsset.data[0].nasa_id}`);
    console.log("link", link);
    this.setState({ currentLink: link.data.href });
  }

  handleStateChange(state) {
    // copy player state to this component's state
    this.setState({
      player: state
    });
  }

  async getLink(id) {
    const data = await axios.get(`https://images-api.nasa.gov/assets/${id}`);
    this.setState({
      currentLink: data.collection.items[0],
    });
  }

  getRandom(length) {
    return Math.floor(Math.random() * (length - 1));
  }

  async handleRefresh(){
    const randomAsset = this.state.data[this.getRandom(this.state.data.length)];
    const link = await axios.get(`/api/asset/${randomAsset.data[0].nasa_id}`);
    console.log('in handleRefresh', link)
    this.setState({ currentLink: link.data.href });
  }

  handleMute(){
      console.log('in handlemute')
      this.player.muted=!this.player.muted
  }


  button() {
    console.log('button clicked ')
}

  render() {
    const data = this.state.data;
    console.log("in render", this.state);

    return (
        <div>
            {/* <nav>
                <button onClick={() => console.log('clicked')}>unmute</button>
                <span onClick={this.handleRefresh}>
                    new
                </span>
            </nav> */}
            <button onClick={this.button}>test</button>
      <div className="container">
        <img src={"tv.png"} />
        <div className="background">
          <Player
             ref={player => {
                this.player = player;
              }}
            src={this.state.currentLink}
            fluid={false}
            autoPlay
            height={430}
            width={480}
            muted={true}
            startTime={5}
            loop={true}
          >
            <ControlBar disableCompletely={true} />
          </Player>
        </div>
      </div>
      </div>
    );
  }
}

export default Main