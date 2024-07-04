import { Button, Card, CardBody, CardDeck, CardImg, CardSubtitle, CardText, CardTitle, Col, Row } from "reactstrap"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import { useRouter } from "next/router"
import Cart from "../components/Cart"
import { useContext } from "react"
import AppContext from "../context/AppContext"

const GET_RESTAURANT_DISHES = gql`
  query ($id: ID!) {
    restaurant (id: $id){
      data {
        id
        attributes {
          name
          dishes {
            data {
              id
              attributes {
                name
                description
                price
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    } 
  }
`

const RestaurantLists = () => {
  const appContext = useContext(AppContext)
  const router = useRouter()
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, { variables: { id: router.query.id } })

  if (error) return <h1>料理の読み込みに失敗しました。</h1>
  if (loading) return <h1>読込中・・・</h1>

  if (data) {
    const { restaurant } = data

    return (
      <>
        <h1>{restaurant.data.attributes.name}</h1>
        <Row>
          {restaurant.data.attributes.dishes.data.map((dish) => (
            <Col xs="6" sm="4" key={dish.id} style={{ padding: 0 }}>
              <Card style={{ margin: "0 10px" }}>
                <CardImg
                  src={`${process.env.NEXT_PUBLIC_API_URL}${dish.attributes.image.data.attributes.url}`}
                  top={true}
                  style={{ height: 250 }}
                />
                <CardBody>
                  <CardTitle tag="h5">{dish.attributes.name}</CardTitle>
                  <CardSubtitle className="ml-2 mb-2 text-muted" tag="h6">{Number(dish.attributes.price).toLocaleString()}円</CardSubtitle>
                  <CardText>{dish.attributes.description}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Button outline color="primary" onClick={() => appContext.addItem(dish)}>
                    + カートに入れる
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
          <style jsx>
            {`
              a {
                color: white;
              }

              a:link {
                text-decoration: none;
                color: white;
              }

              a:hover {
                color: white;
              }

              .card-columns {
                column-count: 3;
              }
            `}
          </style>
          <Col xs="3" style={{ padding: 0 }}>
            <div>
              <Cart restaurant={restaurant}/>
            </div>
          </Col>
        </Row>
      </>
    )
  } else {
    return (
      <h1>レストランが見つかりませんでした。</h1>
    )
  }
}

export default RestaurantLists
