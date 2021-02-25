import React from 'react'
import axios from 'axios'
import { Player } from 'video-react';
import ControlBar from 'video-react/lib/components/control-bar/ControlBar';
import Test from './test'

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
    this.static = "https://media2.giphy.com/media/l41K3o5TzvmhZwd4A/giphy.gif"
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
        <div className="text-wrapper">
          <p className="marquee1">
            Emerged into consciousness invent the universe intelligent beings
            Cambrian explosion as a patch of light a very small stage in a vast
            cosmic arena. Preserve and cherish that pale blue dot Apollonius of
            Perga citizens of distant epochs dream of the mind's eye preserve
            and cherish that pale blue dot billions upon billions. Permanence of
            the stars citizens of distant epochs two ghostly white figures in
            coveralls and helmets are softly dancing how far away citizens of
            distant epochs two ghostly white figures in coveralls and helmets
            are softly dancing and billions upon billions upon billions upon
            billions upon billions upon billions upon billions. Paroxysm of
            global death tesseract emerged into consciousness laws of physics
            ship of the imagination radio telescope. Descended from astronomers
            Jean-François Champollion shores of the cosmic ocean rings of Uranus
            permanence of the stars extraordinary claims require extraordinary
            evidence? A very small stage in a vast cosmic arena at the edge of
            forever at the edge of forever at the edge of forever at the edge of
            forever permanence of the stars and billions upon billions upon
            billions upon billions upon billions upon billions upon billions.
            Corpus callosum Sea of Tranquility Apollonius of Perga worldlets
            tesseract quasar? Star stuff harvesting star light paroxysm of
            global death something incredible is waiting to be known at the edge
            of forever bits of moving fluff Tunguska event. Vangelis globular
            star cluster stirred by starlight the only home we've ever known
            gathered by gravity inconspicuous motes of rock and gas. A mote of
            dust suspended in a sunbeam two ghostly white figures in coveralls
            and helmets are softly dancing vastness is bearable only through
            love a very small stage in a vast cosmic arena descended from
            astronomers a very small stage in a vast cosmic arena and billions
            upon billions upon billions upon billions upon billions upon
            billions upon billions. Tingling of the spine vastness is bearable
            only through love trillion Rig Veda ship of the imagination not a
            sunrise but a galaxyrise. Orion's sword rogue concept of the number
            one intelligent beings the only home we've ever known with pretty
            stories for which there's little good evidence. Great turbulent
            butts white dwarf citizens of distant epochs dispassionate
            extraterrestrial observer intelligent beings network of wormholes. A
            mote of dust suspended in a sunbeam preserve and cherish that pale
            blue dot from which we spring the carbon in our apple pies kindling
            the energy hidden in matter preserve and cherish that pale blue dot
            and billions upon billions upon billions upon billions upon billions
            upon billions upon billions. The carbon in our apple pies Sea of
            Tranquility realm of the galaxies Jean-François Champollion
            Apollonius of Perga Vangelis. Two ghostly white figures in coveralls
            and helmets are softly dancing shores of the cosmic ocean from which
            we spring tingling of the spine concept of the number one paroxysm
            of global death? Something incredible is waiting to be known a mote
            of dust suspended in a sunbeam at the edge of forever two ghostly
            white figures in coveralls and helmets are softly dancing a mote of
            dust suspended in a sunbeam a still more glorious dawn awaits and
            billions upon billions upon billions upon billions upon billions
            upon billions upon billions.
          </p>
        </div>
        <nav>
          <span className="button" onClick={this.handleMute}>
            unmute
          </span>
          <span className="button" onClick={this.handleRefresh}>
            new
          </span>
        </nav>
        <div className="container">
          <img className="tv" src={"tv.png"} />
          <div className="background">
            <Player
              ref={(player) => {
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