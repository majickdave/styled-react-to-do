

class SignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      touched: {
        email: false,
        password: false,
      },
    };
  }

  // ...

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  render()
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };

    // ...

    <input
      className={shouldMarkError('email') ? "error" : ""}
      onBlur={this.handleBlur('email')}

      type="text"
      placeholder="Enter email"
      value={this.state.email}
      onChange={this.handleEmailChange}
    />
  }
}
