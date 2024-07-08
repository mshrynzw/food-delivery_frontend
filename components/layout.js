import Head from "next/head"
import { Container, Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap"
import { useContext } from "react"
import AppContext from "../context/AppContext"

const Layout = (props) => {
  const { user, setUser } = useContext(AppContext)

  return (
    <>
      <Head>
        <title>Food Delivery</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"/>
      </Head>
      <Navbar className="my2">
        <NavbarBrand href="/">
          Food Delivery
        </NavbarBrand>
        <Nav className="ml-auto">
          <NavItem>
            {user ? (
              <NavLink href="/" onClick={() => setUser(null)}>Logout</NavLink>
            ) : (
              <NavLink href="/login">Login</NavLink>
            )}
          </NavItem>
          <NavItem>
            {user ? (
              <NavLink>{user.username}</NavLink>
            ) : (
              <NavLink href="/register">Signin</NavLink>
            )}
          </NavItem>
        </Nav>
      </Navbar>
      <Container>{props.children}</Container>
    </>
  )
}

export default Layout
