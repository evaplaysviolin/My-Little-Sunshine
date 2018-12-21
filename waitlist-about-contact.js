// WAITLIST //

class Waitlist extends React.Component {
  render() {
    return (
      <div id="waitlist-container">
        <div 
          id="waitlist-content"
          className="center-content">
          <p id="waitlist-thankyou">Thank you for your interest in My Little Sunshine!</p>
            <p id="waitlist-text">
              We encourage you to contact us to schedule a facility tour 
              and complete our initial interview form as soon as possible 
              by using the links below to either fill out or download the form. 
              Please note that you will be taken to a new window 
              should you choose to complete the form online. 
              In the case that we do not have any open vacancies, 
              you will be placed on a waitlist. We will contact you within 1-2 business days.  
            </p>
            <Button 
              className="waitlist"
              buttonText="Click here to fill out the form now"
              link="https://goo.gl/forms/nK94aHuLD08gxs4O2"
            />
            <Button 
              className="waitlist download"
              buttonText="Download the form"
              link="/downloadables/form.doc"
            />
        </div>
      </div>
    )
  }
}


// ABOUT //

const aboutText = <p id="about-text" className="right-text">
  My name is Sandy. I am the Director of My Little Sunshine Child Care. <br />
  <br />
  I pursued a Bachelor Degree in Social Worker, focused on working with young children. 
  I obtained a Child Development Program Director Permit at City College of San Francisco. <br />
  <br />
  After I had her daughter, I decided to be a stayed at home mom, 
  taking care of my daughter and then my older niece.  
  As a new mom, I didn't know anything about being a new parent to my daughter and niece. 
  So I went to taking classes and found out about being a Family Child Care provider. 
  What a great career to be able to take care of own child and family 
  and able to see all the milestones of her growing up. <br />
  <br />
  Immediately, I fell in love with the career and it has been 14 years now and going...
</p>

class About extends React.Component {
  render() {
    return (
      <div id="about-container">
        <div
          id="about-left-content"
          className="left-content">
          <Image
            id="about-image"
            className="left-image"
            src="/images/about-image.jpg" 
            alt="ASDF"
          />
        </div>
        <div
          id="about-right-content"
          className="right-content">
          {aboutText}
        </div>
      </div>
    )
  }
}


// CONTACT //

class Contact extends React.Component {
  render() {
    return (
      <div id="contact-container">
        <div
          id="contact-content"
          className="center-content">
          <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3155.621971177029!2d-122.40924998420734!3d37.72855027976794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7efca9f9bb69%3A0x49aaae9cd0baf13b!2s261+Goettingen+St%2C+San+Francisco%2C+CA+94134!5e0!3m2!1sen!2sus!4v1541800089640" 
              frameborder="0" style={{border:0}} allowfullscreen>
            </iframe>
            <p>My Little Sunshine Child Care<br/>
              敏 敏 家 庭 托 兒 中 心
            </p>
            <p>261 Goettingen Street<br/>
              San Francisco, CA 94134
            </p>
            <p>(415) 467-4986</p>
            <a href="mailto:sandykids2004@yahoo.com">sandykids2004@yahoo.com</a>
        </div>
      </div>
    )
  }
}