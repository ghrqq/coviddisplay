import React from "react";

const Contact = () => {
  return (
    <div className="contact">
      <form name="covid-contact" netlify>
        <br />
        <input type="text" name="name" placeholder="Name" /> <br />
        <br /> <input type="text" name="mail" placeholder="Mail" /> <br />
        <textarea
          cols={80}
          rows={20}
          placeholder="Please type your message here."
        />
        <br />
        <button className="submit-button" type="submit">
          Send
        </button>
      </form>
      <br />
      <br />
      <div>
        <a target="_blank" href="http://linkedin.com">
          <button
            className="submit-button"
            style={{ backgroundColor: "#2867B2" }}
          >
            Linkedin
          </button>
        </a>
        <a target="_blank" href="http://linkedin.com">
          <button
            className="submit-button"
            style={{ backgroundColor: "#211F1F" }}
            type="submit"
          >
            Github
          </button>
        </a>
        <a target="_blank" href="http://linkedin.com">
          <button
            className="submit-button"
            style={{ backgroundColor: "#1DA1F2" }}
            type="submit"
          >
            Twitter
          </button>
        </a>
        <a href="#">
          <button
            className="submit-button"
            style={{ backgroundColor: "#ff3300" }}
            type="submit"
          >
            Portfolio(Soon)
          </button>
        </a>
      </div>
    </div>
  );
};

export default Contact;
