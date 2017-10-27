import React from 'react';
import { Form, FormGroup, Label, Input, Button, Card, CardBody, FormFeedback } from 'reactstrap';
import Validator from 'validator';
import PropTypes from 'prop-types'
 
class LoginForm extends React.Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {},
    submitted: false
  }

  handleChange = event => {
    const data = { ...this.state.data, [event.target.name]: event.target.value };
    this.setState({ 
      data: data 
    });
    if (this.state.submitted) {
      this.setState({ errors: this.validate(data) })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.submitted) this.setState({ submitted: true });
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data);
    }
  }

  validate = (data) => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Please enter a valid email address."
    if (!data.password) errors.password = "This field is required.";
    return errors;
  }

  render() {
    const { data, errors, submitted } = this.state;

    return (
      <Card>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input 
                type="text" 
                name="email" 
                id="email" 
                placeholder="Enter your email address" 
                value={data.email} 
                onChange={this.handleChange}
                { ...( submitted && { valid: !errors.email } ) }
              />
              {errors.email && <FormFeedback children={errors.email}/>}
            </FormGroup>
            <FormGroup>
              <Label for="password">Password:</Label>
              <Input 
                type="password" 
                name="password" 
                id="password" 
                placeholder="Enter your password" 
                value={data.password} 
                onChange={this.handleChange}
                { ...( submitted && { valid: !errors.password } ) }
              />
              {errors.password && <FormFeedback children={errors.password}/>}
            </FormGroup>
            <Button color="success">Login</Button>
          </Form>
        </CardBody>
      </Card>
    )
  }
};

LoginForm.PropTypes = {
  submit: PropTypes.func.isRequired
}

export default LoginForm;