import Head from "next/head"
import { Container, Nav, NavItem } from "reactstrap"
import Link from "next/link"
import { useContext } from "react"
import AppContext from "../context/AppContext"

const Layout = (props) => {
  const { user, setUser } = useContext(AppContext)

  return (
    <div>
      <Head>
        <title>フードデリバリーサービス</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"/>
      </Head>
      <style jsx>
        {`
          a {
            color: white;
          }
        `}
      </style>
      <Nav className="navbar navbar-dark bg-dark">
        <NavItem>
          <Link href="/">
            <a className="navbar-brand">ホーム</a>
          </Link>
        </NavItem>
        <NavItem className="ml-auto">
          {user ? (
            <Link href="/">
              <a className="navb-link" onClick={() => setUser(null)}>ログアウト</a>
            </Link>
          ) : (
            <Link href="/login">
              <a className="navb-link">ログイン</a>
            </Link>
          )}
        </NavItem>
        <NavItem>
          {user ? (
            <div className="nav-link" style={{color: "white"}}>{user.username}</div>
          ) : (
            <Link href="/register">
              <a className="nav-link">新規登録</a>
            </Link>
          )}
        </NavItem>
      </Nav>
      <Container>{props.children}</Container>
    </div>
  )
}

export default Layout
