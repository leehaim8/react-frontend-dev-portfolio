import React from "react";
import axios from "axios";
import QRCode from "react-qr-code";

class Contact extends React.Component {
  state = {
    name: "",
    email: "",
    message: "",
    submitted: false,
    loading: false,
    error: null,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: null });

    try {
      await axios.post("https://xyynfry0wd.execute-api.eu-north-1.amazonaws.com/Portfolio/ContactMe", {
        name: this.state.name,
        email: this.state.email,
        message: this.state.message,
      });

      this.setState({
        name: "",
        email: "",
        message: "",
        submitted: true,
        loading: false,
      });
    } catch (err) {
      this.setState({ error: "Something went wrong. Try again later.", loading: false });
    }
  };

  render() {
    const { name, email, message, submitted, loading, error } = this.state;
    return (
      <section id="contact" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-title" style={{ fontWeight: "bold", color: "#333" }}>
              Contact Me
            </h2>
          </div>
          <div className="row justify-content-center align-items-start">
            <div className="col-md-7 mb-4">
              <div className="card shadow border-0 rounded-3 p-4">
                {!submitted ? (
                  <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input type="text" className="form-control" name="name" required value={name} onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" name="email" required value={email} onChange={this.handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea className="form-control" name="message" rows="5" required value={message} onChange={this.handleChange}></textarea>
                    </div>
                    <button type="submit" className="btn btn-dark" disabled={loading}>
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                    {error && <p className="text-danger mt-2">{error}</p>}
                  </form>
                ) : (
                  <div className="text-center">
                    <h5>Thank you! Your message has been sent.</h5>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="card shadow border-0 rounded-3 p-4">
                <h5 className="mb-3">Scan to Email Me</h5>
                <div style={{ background: "white", padding: "16px", display: "inline-block" }}>
                  <QRCode value="https://drive.google.com/file/d/1Y7M2MiF9fPwYUAzgkTzuO0lAQ0gQSvFa/view?usp=sharing" size={160} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact;
