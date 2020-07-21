const myNews = [
  {
    id: 1,
    author: 'Simple User',
    text: 'short description of this topic',
    bigText: 'Much longer description of this topic that shows '
  },
  {
    id: 2,
    author: 'Another User',
    text: 'short description of another topic',
    bigText: 'Much longer description of this topic that shows '
  },
  {
    id: 3,
    author: 'One more User',
    text: 'short description of some else',
    bigText: 'Much longer description of this topic that shows '
  },
]

class News extends React.Component {
  state = {
    counter: 0
  }

  renderNews = () => {
    const { data } = this.props
    // const data = this.props.data
    let newsTemplate = null

    if (data.length) {
      newsTemplate = data.map(function(item) {
        return <Article key={item.id} data={item}/>
      })
    } else {
      newsTemplate = <p>No news</p>
    }
    return newsTemplate
  }

  render() {
    const newsTemplate = this.props.data.map(function(item, index){
      return (
        <div key={item.id}>
          <h4 className="news__author">{item.author}:</h4>
          <p className="news__text">{item.text}:</p>
        </div>
      )
    })

    return (
      <div className="news">
        {newsTemplate}

      </div>
    )
  }
}

class Article extends React.Component {
  state = {
    visible: false
  }
}

const Comments = () => {
  return <p>No comments at this moment</p>
}

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Hello, world from class!</h1>
        <News data={myNews}/>
        <Comments />
        <Par />
      </React.Fragment>
    )
  }
}

class Par extends React.Component {
  render() {
    return (
      <p>This is a paragraph class</p>
    )
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: '00',
      minutes: '00',
      seconds: '00'
    }
  }
  
  tick() {
    let d = new Date()
    this.setState(state => ({
      hours: this.nn(d.getHours()),
      minutes: this.nn(d.getMinutes()),
      seconds: this.nn(d.getSeconds())
    }))
  }

  nn(a) {
    return a < 10 ? `0${a}` : a
  }

  componentDidMount() {
    this.tick()
    this.interval = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <span>
        Time: {this.state.hours}:{this.state.minutes}:{this.state.seconds}
      </span>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'))
ReactDOM.render(<Clock />, document.getElementById('clock'))