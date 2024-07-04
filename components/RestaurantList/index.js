import { Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap"
import Link from "next/link"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import restaurants from "../../pages/restaurants"

const GET_RESTAURANTS = gql`
{
  restaurants {
    data{
      id
      attributes{
        name
        description
        image{
          data{
            attributes{
              url
            }
          }
        }
      }
    }
  }
}
`

const RestaurantList = (props) => {
  const { loading, error, data } = useQuery(GET_RESTAURANTS)

  if (error) return <h1>レストランの読み込みに失敗しました。</h1>
  if (loading) return <h1>読込中・・・</h1>

  if (data) {
    const searchQuery = data.restaurants.data.filter((restaurant) =>
      restaurant.attributes.name.toLowerCase().includes(props.search)
    )

    return (
      <Row>
        {searchQuery.map((restaurant) => (
          <Col xs="6" sm="4" key={restaurant.id}>
            <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
              <CardImg
                src={`${process.env.NEXT_PUBLIC_API_URL}${restaurant.attributes.image.data.attributes.url}`}
                top={true}
                style={{ height: 250 }}
              />
              <CardBody>
                <CardTitle tag="h5">{restaurant.attributes.name}</CardTitle>
                <CardTitle>{restaurant.attributes.description}</CardTitle>
              </CardBody>
              <div className="card-footer">
                <Link
                  href={`/restaurants?id=${restaurant.id}`}
                  as={`/restaurants/${restaurant.id}`}
                >
                  <a className="btn btn-primary">もっと見る</a>
                </Link>
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
      </Row>
    )
  } else {
    return (
      <h1>レストランが見つかりませんでした。</h1>
    )
  }
}

export default RestaurantList
