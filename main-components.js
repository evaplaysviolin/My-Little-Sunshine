class Button extends React.Component {
  render() {
    return (
      <div 
        id={this.props.id}
        className={`button ${this.props.className}`}>
        <a href={this.props.link} download target="_blank">
          {this.props.buttonText}
        </a>
      </div>
    )
  }
}

class Image extends React.Component {
  render() {
    return (
      <img
        id={this.props.id}
        className={this.props.className}
        src={this.props.src}
        alt={this.props.alt}
        onClick={this.props.onClick}
      />
    )
  }
}
