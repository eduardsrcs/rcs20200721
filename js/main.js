let myNews = [
  {  
    id: 1,
    author: 'Alex Gyver',
    text: 'Today is monday...',
    bigText: 'At the 4 pm four blach dummies gone to everyelse an so, there they gave some things to...'
  },
  {
    id: 2,
    author: 'Simple User',
    text: 'I think, that $ should be 35!',
    bigText: 'But euro must take amount of 42...'
  },
  {
    id: 3,
    author: 'Max Frontend',
    text: '2 years gone, but $ still is above 35',
    bigText: 'And euro is still about 70'
  },
  {
    id: 4,
    author: 'Guest',
    text: 'For free. Without SMS, visit https://maxpfrontend.ru',
    bigText: 'Also is the group on VK, instagram and some else! As such as on youtube. Take a look at our homepage!'
  }
]

const Hello= props => <React.Fragment><h1>Hello, {props.name}</h1></React.Fragment>

class News extends React.Component {
  state = {
    counter: 0 // set initial state
  }

  incrCounter = () => {
    this.setState({
      counter: ++this.state.counter
    })
  } 

  renderNews = () => {
    const { data } = this.props
    let newsTemplate = null

    if (data.length) {
      newsTemplate = data.map(function(item) {
        return <Article key={item.id} data={item}/>
      })
    } else {
      newsTemplate = <p>No news...</p>
    }

    return newsTemplate
  }
  
  render() {
    const { data } = this.props
    const counter = this.state.counter
    return (
      <div className="news">
        {this.renderNews()}
        {
          data.length ? <strong onClick={this.incrCounter} className={'news__count'}>News: {data.length}</strong> : null
        }
        <p>Counter: {counter}</p>
      </div>
    );
  }
}

News.propTypes = {
  data: PropTypes.array.isRequired // 
}

class Article extends React.Component {
  state = {
    visible: false, // set initial state
  }

  handleReadMoreClck = (e) => { // add method
    e.preventDefault()
    this.setState({ visible: true })
  }
  handleReadLessClck = (e) => { // add method
    e.preventDefault()
    this.setState({ visible: false })
  }
  
  render() {
    const {author, text, bigText} = this.props.data
    return (
      <div className="article">
        <h4>{author}</h4>
        <p>{text}
        {
          !this.state.visible && <a href="#" onClick={this.handleReadMoreClck} className='news__readmore'>...More</a>
        }</p>
        {
          this.state.visible && <p className='news__big-text'>{bigText} <a href="#" onClick={this.handleReadLessClck} className='news__readmore'>...Less</a></p>
        }
      </div>
    )
  }
}

Article.propTypes = {
  data: PropTypes.shape({
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    bigText: PropTypes.string.isRequired
  })
}

const Comments = () => {
  return <span>No comments yet...</span>
}

class Add extends React.Component {

  state = {
    name: '',
    text: '',
    bigText: '',
    agree: false
  }
  
  handleChange = (e) => {
    const { id, value } = e.currentTarget
    this.setState({ [id]: e.currentTarget.value })
  }

  btnPressed = (e) => {
    e.preventDefault()
    const { name, text, bigText } = this.state
    this.props.onAddNews({
      id: +new Date(), // id gets miliseconds 
      author: name,    // save in field  author
      text,
      bigText,
    })
  }

  handleCheckboxChange = (e) => {
    this.setState({ agree: e.currentTarget.checked })
  }

  validate = () => {
    const { name, text, agree } = this.state
    if (name.trim() && text.trim() && agree) {
      return true
    }
    return false
  }

  render() {
    const { name, text, bigText, agree } = this.state
    return (
      <form className="add">
        <input
          id='name'
          type='text'
          onChange={this.handleChange}
          className='add__author'
          placeholder='Your name'
          value={name}
        />
        <textarea
          id='text'
          onChange={this.handleChange}
          className='add__text'
          placeholder='News text'
          value={text}
        ></textarea>
        <textarea
          id='bigText'
          onChange={this.handleChange}
          className='add__text'
          placeholder='Текст новости подробно'
          value={bigText}
        ></textarea>
        <label className='add__checkrule'>
          <input
            type='checkbox'
            onChange={this.handleCheckboxChange} 
            /> Agree to terms
        </label>
        <button
          onClick={this.btnPressed}
          disabled={!this.validate()}
        >Submit</button>
        <br /><br />
      </form>
    )
  }
}

class App extends React.Component {
  state = {
    news: myNews // initial state
  }

  handleAddNews = (data) => {
    console.log('I am called from Add, but can change this.state on App!', this.state)
    const nextNews = [data, ...this.state.news]
    this.setState({ news: nextNews })
  }

  render() {
    return (
      <React.Fragment>
        <h2>News</h2>
        <Add onAddNews={this.handleAddNews} />
        <News data={this.state.news} />
        <Comments />
      </React.Fragment>
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
    };
  }

  tick() {
    let d = new Date()
    this.setState(state => ({
      hours: this.nn(d.getHours()),
      minutes: this.nn(d.getMinutes()),
      seconds: this.nn(d.getSeconds())
    }));
  }
  
  nn(a){
    return a < 10 ? `0${a}` : a
  }

  componentDidMount() {
    this.tick()
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <span>
        Time: {this.state.hours}:{this.state.minutes}:{this.state.seconds}
      </span>
    );
  }
}

ReactDOM.render(<Hello name='Eduards' initial="3"/>, document.getElementById('mydiv'))
ReactDOM.render(<App name="Name"/>,  document.getElementById('root'));
ReactDOM.render(<Clock/>, document.getElementById('mydiv2'))

let test = 'hello'
