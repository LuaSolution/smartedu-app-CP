import React, {useEffect} from 'react'
import { Row, Card, CardTitle, Label, FormGroup, Button, Form } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { Colxx } from 'components/common/CustomBootstrap'
import IntlMessages from 'helpers/IntlMessages'
import { useHistory } from 'react-router-dom'

const ResetPassword = () => {
  const history = useHistory()

  useEffect(() => {
    if (localStorage.getItem('@token')) {
      history.push("/")
    }
  }, []);
  
  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use your e-mail to reset your password. <br />
              If you are not a member, please
              <NavLink to="/register" className="white">
                register
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.reset-password" />
            </CardTitle>
            <Form className="av-tooltip tooltip-label-bottom">
              <FormGroup className="form-group has-float-label">
                <Label>
                  <IntlMessages id="user.new-password" />
                </Label>
              </FormGroup>
              <FormGroup className="form-group has-float-label">
                <Label>
                  <IntlMessages id="user.new-password-again" />
                </Label>
              </FormGroup>

              <div className="d-flex justify-content-between align-items-center">
                <NavLink to="/user/login">
                  <IntlMessages id="user.login-title" />
                </NavLink>
                <Button
                  color="primary"
                  size="lg"
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="user.reset-password-button" />
                  </span>
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </Colxx>
    </Row>
  )
}

export default ResetPassword
