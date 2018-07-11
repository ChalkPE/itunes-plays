import parse from './parse'
import { watch } from 'chokidar'
import { h, render, Component, Color } from 'ink'

class Graph extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tracks: [],
      watcher: null
    }
  }

  render () { // TODO
    return (
      <Color red>
        { this.state.tracks.length } tracks found!
      </Color>
    )
  }

  componentDidMount () {
    this.track()
    this.setState({ watcher: watch(this.props.file).on('change', this.track) })
  }

  componentWillUnmount () {
    this.state.watcher.close()
    this.setState({ watcher: null })
  }

  track () {
    this.setState({ tracks: parse(this.props.file) })
  }
}

export default file => render(<Graph file={file} />)