// Refer to #root container div in HTML body
const container = document.getElementById("root");

// Renders "frame" of page, controls navigation
class Root extends React.Component {
  constructor(props) {
    super(props);
    // State information added as needed
    this.state = {};
    // Bind "this" for handleHistoryChange
    this.handleHistoryChange = this.handleHistoryChange.bind(this);
    // Store page information (component names and colors)
    this.pageInformation = new Map([
      [
        "home",
        {
          render: Home,
          navColor: "#cbe2ef",
          transition: null,
          pageName: null,
          color: null
        }
      ],
      [
        "photos",
        {
          render: Photos,
          navColor: "#b1d3d1",
          transition: null,
          pageName: null,
          color: null
        }
      ],
      [
        "information",
        {
          render: Information,
          navColor: "#ffdbb7",
          transition: null,
          pageName: null,
          color: null
        }
      ],
      [
        "waitlist",
        {
          render: Waitlist,
          navColor: "#ffe0e4",
          transition: null,
          pageName: null,
          color: null
        }
      ],
      [
        "about",
        {
          render: About,
          navColor: "#eae0f1",
          transition: null,
          pageName: null,
          color: null
        }
      ],
      [
        "contact",
        {
          render: Contact,
          navColor: "#d8f3d4",
          transition: null,
          pageName: null,
          color: null
        }
      ]
    ]);
    function getInitialState() {
      const path = window.location.pathname.slice(1);
      const pages = ["home", "photos", "information", "waitlist", "about", "contact"];
      if (pages.indexOf(path) != -1) {
        const data = this.pageInformation.get(path);
        history.pushState(path, "", path);
        return data;
      } else {
        const data = this.pageInformation.get("home");
        history.pushState("home", "", "home");
        return data;
      }
    }
    // Initialize Animation items
    Animation.initialize.call(this, getInitialState.call(this));
  }

  pushState(page) {
    history.pushState(page, "", page);
  }
  handleNavigationClick(pageString) {
    this.pushState(pageString);
    const data = this.pageInformation.get(pageString);
    Animation.handleFadeOut.call(this, data.render, data.navColor);
  }

  handleHistoryChange(event) {
    history.replaceState(event.state, event.state);
    const data = this.pageInformation.get(event.state);
    Animation.handleFadeOut.call(this, data.render, data.navColor);
  }

  componentDidMount() {
    window.addEventListener("popstate", this.handleHistoryChange);
  }

  render() {
    return (
      <React.Fragment>

        <div className="constant-content">

          <div 
            id="header"
            // Pass information for page to render through Animation for Root to render
            onClick={()=>this.handleNavigationClick("home")}>
            <div id="header-image">
              <img id="logo" src="/images/logo.png" />
            </div>
            <div id="header-text">My Little Sunshine</div>
          </div>

          <div 
            id="navigation-bar"
            // Navigation background color is updated along with each page
            style={{backgroundColor: this.state[Animation.namespace].navColor}}>
            <ul id="navigation-items">              
              <li 
                id="photos"
                className="navigation-item"
                onClick={()=>this.handleNavigationClick("photos")}>
                Photos
              </li>
              <li
                id="information"
                className="navigation-item"
                onClick={()=>this.handleNavigationClick("information")}>
                Information
              </li>
              <li
                id="waitlist"
                className="navigation-item"
                onClick={()=>this.handleNavigationClick("waitlist")}>
                Sign Up/Waitlist
              </li>
              <li 
                id="about"
                className="navigation-item"
                onClick={()=>this.handleNavigationClick("about")}>
                About Us
              </li>
              <li 
                id="contact"
                className="navigation-item"
                onClick={()=>this.handleNavigationClick("contact")}>
                Contact
              </li>
            </ul>
          </div>

        </div>

        <div id="inconstant-content">
          {Animation.component.call(this)}
        </div>

        <div class="constant-content">
          <div id="footer">Kids grow, learn and thrive at My Little Sunshine Child Care.</div>
        </div>

      </React.Fragment>
    )
  }
}

// Handles animations for each "page", rendered in Root with component()
class Animation extends React.Component {
  static get namespace() {
    return "123456";
  }
  // Called inside of Root's render
  static component() {
    return (
      <Animation 
        currentStates={this.state[Animation.namespace]} 
        updatePage={this[Animation.namespace].updatePage}
      />
    )
  }
  // Called inside of Root's constructor
  static initialize(data) {
    this[Animation.namespace] = {};
    Animation.states.call(this, data);
    Animation.binder.call(this);
  }
  // Store state information for Root in Animation namespace
  static states(data) {
    this.state[Animation.namespace] = data;
  }
  // Bind "this" for function(s) to Root
  static binder() {
    this[Animation.namespace].updatePage = Animation.updatePage.bind(this);
  }
  // Called when navigation item is clicked
  // Applies "fade-out" animation
  // Stores information for which page to render next
  static handleFadeOut(page, color) {
    this.setState((state, props) => {
      const animationState = state[Animation.namespace];
      const animationStateCopy = {
        ...animationState,
        transition: "fade-out",
        pageName: page,
        color: color
      }
      return {[Animation.namespace]: animationStateCopy};
    });
  }
  // Called after "fade-out" ends (see above)
  // Update state with stored information to render next page
  static updatePage() {
    this.setState((state, props) => {
      const animationState = state[Animation.namespace];
      const animationStateCopy = {
        ...animationState,
        render: animationState.pageName,
        navColor: animationState.color,
      }
      // Prevent update on fade-in's animation end
      if (animationState.transition == "fade-out") {
        animationStateCopy.transition = "fade-in";
        return {[Animation.namespace]: animationStateCopy};
      }
    });
  }

  render() {
    return (
      // Wrapper div to assign animation and hold event listener
      <div 
        className={this.props.currentStates.transition} 
        onAnimationEnd={this.props.updatePage}>
        <this.props.currentStates.render />
      </div>
    )
  }
}

// Main text for home page
const homeText = <p id="home-text" className="right-text">
  At My Little Sunshine, we offer high quality care 
  for children zero to five years old. 
  Our safe, caring, nurturing, clean and fun 
  environment provide opportunities for 
  children to play, learn, and grow. <br />
  <br />
  We believe that each child is an unique individual 
  and that children learn through play. We provide a play-base 
  environment for children to develop his/her 
  own learning in cognitive, creative, emotional, 
  social, physical and problem solving skills. <br />
  <br />
  Through our excellent equipment, materials and toys 
  that are age appropriate for infants, toddlers and 
  preschool ages, children can enhance their 
  individual growth to their fullest potential. <br />
  <br />
  In our English/Cantonese bilingual program, 
  we use dual language to teach, communicate and 
  interact with the children in our program. Our preschool program 
  helps prepare children ready to enter Kindergarten with ease. <br />
  <br />
  Furthermore, we offer enrichment programs for 
  all children including Gardening, Music and Movements 
  and Tandam Partner in Early Learning book program 
  that are part of our weekly curriculum. <br />
  <br />
  We hope you and your family find My Little Sunshine 
  a good match for your child care needs.
</p>

// Home page
class Home extends React.Component {
  render() {
    return (
      <div id="home-container">
        <div
          id="home-left-content"
          className="left-content">
          <Image
            id="home-image"
            className="left-image"
            src="/images/main-image.jpg" 
            alt="ASDF"
          />
        </div>
        <div
          id="home-right-content"
          className="right-content">
          {homeText}
        </div>
      </div>
    )
  }
}

// First render for home page
ReactDOM.render(<Root />, container);