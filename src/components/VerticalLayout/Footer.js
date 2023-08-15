import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer text-white">
        <Container fluid={true}>
          <Row>
            <Col>
              © {new Date().getFullYear()} Vidout Ad Tech
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
