// Image URLs stored here
const imagesBase = [
  "images/photo-gallery/MLS5",
  "images/photo-gallery/MLS10",
  "images/photo-gallery/MLS15",
  "images/photo-gallery/MLS20",
  "images/photo-gallery/MLS25",
  "images/photo-gallery/MLS30",
  "images/photo-gallery/MLS35",
  "images/photo-gallery/MLS40",
  "images/photo-gallery/MLS45",
  "images/photo-gallery/MLS50",
  "images/photo-gallery/MLS55",
  "images/photo-gallery/MLS60",
  "images/photo-gallery/MLS65",
  "images/photo-gallery/MLS70",
  "images/photo-gallery/MLS75",
  "images/photo-gallery/MLS80"
];

// Matching descriptions for each photo
// Update here if changes are made to imagesBase!
const imagesDescription = [
  "Ribbon time!",
  "A pumpkin for everyone.",
  "Birthday celebrations!",
  "Friends :)",
  "What are you smiling about?",
  "Fresh air in the backyard.",
  "Group photo!",
  "Hello, operator!",
  "Puppets awaiting play.",
  "Listening intently.",
  "Garden time with Sandy!",
  "Growing children growing plants.",
  "Learning time!",
  "Gardening master class.",
  "What's this?",
  "An afternoon snack."
];


class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Store index of thumbnail clicked for displaying appropriate photo in slideshow
      photoIndex: null,
      // Toggle slideshow
      renderSlideshow: false,
      // Fade in or out
      slideshowAnimation: null,
    }
    this.handleImageClick = this.handleImageClick.bind(this);
    // Arrays that will hold Image components based on URLs in imagesBase
    this.imagesThumb = [];
    this.imagesFull = [];
    // Create Image arrays from imagesBase above
    for (let i = 0; i < imagesBase.length; i++) {
      this.imagesThumb.push(
        <Image 
          src={imagesBase[i] + "-300x200.jpg"} 
          className="photo-thumbnail"
          onClick={this.handleImageClick}
        />
      );
      this.imagesFull.push(
        <Image
          src={imagesBase[i] + "-900x600.jpg"}
          className="photo-full"
        />
      );
    }
  }

  getIndex(e) {
    // Get target of click
    let target = e.target;
    // Create array (copy) from nodelist (this.imagesThumb)
    let array = Array.from(e.target.parentNode.childNodes);
    // Get index of clicked item in the array
    let index = array.indexOf(target);
    this.setState((state, props) => {
      return {photoIndex: index}
    });
  }
  toggleRender(boolean) {
    // Separated toggling slideshow for fade-out - see emptySlideshow()
    this.setState((state, props) => {
      if (boolean) {
        return {renderSlideshow: boolean, slideshowAnimation: "fade-in"}
      } else {
        return {slideshowAnimation: "fade-out"}
      }
    });
  }
  emptySlideshow() {
    // Runs after fade-out animation has completed
    this.setState((state, props) => {
      return {renderSlideshow: false}
    });
  }
  handleImageClick(e) {
    this.getIndex(e);
    this.toggleRender(true);
  }

  componentDidMount() {
    this.toggleRender = this.toggleRender.bind(this);
    this.emptySlideshow = this.emptySlideshow.bind(this);
  }

  render() {
    // Check to prevent action after fade-in animation
    let handleSlideshowClose;
    if (this.state.slideshowAnimation == "fade-in") {
      handleSlideshowClose = null;
    } else if (this.state.slideshowAnimation == "fade-out") {
      handleSlideshowClose = this.emptySlideshow;
    }
    return (
      <React.Fragment>
        <div id="photos-grid-wrapper">
          <div id="photos-container">
            {this.imagesThumb}
          </div>
        </div>
        {this.state.renderSlideshow && 
          <React.Fragment>
            <div 
              id="slideshow-container" 
              className={this.state.slideshowAnimation} 
              onAnimationEnd={handleSlideshowClose}>
              <PhotoSlideshow 
                initialImage={this.state.photoIndex}
                // Give PhotoSlideshow access to function to update Photos' state
                toggleRender={this.toggleRender}
                imagesFull={this.imagesFull}
              />
            </div>
          </React.Fragment>}
      </React.Fragment>
    )
  }
}


class PhotoSlideshow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Gets index of thumbnail from Photos
      currentImage: props.initialImage,
      // Which animation to use, fade-in/out
      slideAnimation: null,
      // Stores whether right/next or left/previous clicked in slideshow
      sideClicked: null,
      imagesFull: this.props.imagesFull,
    };
  }

  componentDidMount() {
    // Prevent scrolling of main page (slideshow renders on top)
    $("body").css("overflow", "hidden");
  }

  render() {
    let handleCloseButton = () => {
      $("body").css("overflow", "visible");
      // Use function from Photos to update Photos' state
      this.props.toggleRender(false);
    }
    // Clicking slideshow actions applies fade-out to current slide
    let slideshowClick = (sideClicked) => {
      this.setState((state) => {
        return {slideAnimation: "fade-out", sideClicked: sideClicked}
      });
    }
    // Function given to Slide to use after fade-out from click completes
    // Determines which slide to show and adds fade-in animation
    let fadeIn = () => {
      this.setState((state) => {
        if (this.state.sideClicked == "right") {
          if (state.currentImage + 1 == this.state.imagesFull.length) {
            return {currentImage: 0, slideAnimation: "fade-in"};
          } else {
            return {currentImage: state.currentImage + 1, slideAnimation: "fade-in"};
          }
        } else if (this.state.sideClicked == "left") {
          if (state.currentImage == 0) {
            return {currentImage: this.state.imagesFull.length - 1, slideAnimation: "fade-in"}
          } else {
            return {currentImage: state.currentImage - 1, slideAnimation: "fade-in"}
          }
        }
      });
    }
    return (
      <React.Fragment>
        <div id="close-button" onClick={handleCloseButton}>X</div>
        <div 
          id="slideshow-left" 
          class="slideshow-action"
          onClick={()=>{slideshowClick("left")}}
        >&lt;</div>
        <div 
          id="slideshow-right" 
          className="slideshow-action" 
          onClick={()=>{slideshowClick("right")}}
        >&gt;</div>
        <div id="slides-container">
          <Slide 
            currentImage={this.state.currentImage} 
            className={this.state.slideAnimation}
            function={fadeIn}
            imagesFull={this.state.imagesFull}
          />
        </div>
      </React.Fragment>
    )
  }
}

class Slide extends React.Component {
  render() {
    // Check to prevent action after fade-in animation
    let handleSlideAnimation;
    if (this.props.className == "fade-in") {
      handleSlideAnimation = null;
    } else {
      // Set to function passed down from PhotoSlideshow
      handleSlideAnimation = this.props.function;
    }
    return (
      <React.Fragment>
        <div 
          // Class from props determines fade-in/out animation
          // Applied/updated in PhotoSlideshow
          className={`slide ${this.props.className}`}
          // On fade-out from arrow click, handles image change to next/previous
          onAnimationEnd={handleSlideAnimation}>
          {this.props.imagesFull[this.props.currentImage]}
        </div>
        <div className={`slide-description ${this.props.className}`}>
          {imagesDescription[this.props.currentImage]}
        </div>
      </React.Fragment>
    )
  }
}