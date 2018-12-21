// Button component is located in main-component.js
// const healthText, holidaysText, notesText, and paymentText are located in information-text.js

class Expand extends React.Component {
  render() {
    return (
      <div className="expand hidden">
        {this.props.expandText}
      </div>
    );
  }
}

class Information extends React.Component {
  componentDidMount() {
    $(".button").click(function() {
      $(this).next(".expand").slideToggle(400);
    });
  }

  renderButton(id, className, link, buttonText, expandText=null) {
    return <div className="information-button">
      <Button 
        id={id}
        className={className}
        link={link}
        buttonText={buttonText}
      />
      {/* Render expanding sections if not a download button */}
      {className != "download" && <Expand expandText={expandText} />}
    </div>
  }

  render() {
    return (
      <div id="information-container">
        <p>Click to see more information or download files.</p>
        {this.renderButton(
          "health",
          null,
          null,
          "Health and Safety",
          healthText)}
        {this.renderButton(
          "holidays",
          null,
          null,
          "Vacation and Holidays",
          holidaysText)}
        {this.renderButton(
          "notes",
          null,
          null,
          "Special Notes",
          notesText)}
        {this.renderButton(
          "payment",
          null,
          null,
          "Payment",
          paymentText)}
        {this.renderButton(
          "download-day",
          "download",
          "downloadables/daily-schedule.doc",
          "Download Daily/Weekly Schedules")}
        {this.renderButton(
          "download-year",
          "download",
          "downloadables/holiday-schedule.doc",
          "Download 2018 Holiday & Vacation Schedules")}
        {this.renderButton(
          "download-full",
          "download",
          "downloadables/full-handout.doc",
          "Download Full Handout (All Information Above)")}
      </div>
    );
  }
}