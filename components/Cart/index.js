import { Badge, Button, Card, CardBody, CardTitle } from "reactstrap"
import Link from "next/link"
import { useContext } from "react"
import { useRouter } from "next/router"
import AppContext from "../../context/AppContext"

const Cart = (props) => {
  const appContext = useContext(AppContext)
  const { cart } = appContext
  const router = useRouter()

  return (
    <div>
      <Card style={{ padding: "10px 5px" }}>
        <CardTitle style={{ margin: 10, textAlign: "center", fontWeight: 600, fontSize: 25 }}>注文一覧</CardTitle>
        <hr/>
        <CardBody style={{ padding: 10 }}>
          <div style={{ marginBottom: 6 }}>
            <small>料理：</small>
          </div>
          <div>
            {cart.items
              ? cart.items.map((item) => {
                if (item.quantity > 0) {
                  return (
                    <div className="items-one" key={item.id} style={{ marginBottom: 15 }}>
                      <div>
                        <span id="item-price">&nbsp; {Number(item.attributes.price).toLocaleString()}円</span>
                        <span id="item-name">&nbsp; {item.attributes.name}</span>
                      </div>
                      <div>
                        <Button
                          style={{ height: 25, padding: 0, width: 15, marginRight: 5, marginLeft: 10 }}
                          color="link"
                          onClick={() => appContext.addItem(item)}
                        >
                          +
                        </Button>
                        <Button
                          style={{ height: 25, padding: 0, width: 15, marginRight: 5, marginLeft: 10 }}
                          color="link"
                          onClick={() => appContext.removeItem(item)}
                        >
                          -
                        </Button>
                        <span id="item-quantity" style={{ marginLeft: 5 }}>{item.quantity}つ</span>
                      </div>
                    </div>
                  )
                }
              })
              : null
            }
            <div>
              <Badge style={{ width: 200, padding: 10 }} color="light">
                <h5 style={{ fontWeight: 100, color: "gray" }}>合計：</h5>
                <h3>{Number(cart.total).toLocaleString()}円</h3>
              </Badge>
              {router.pathname === ("/checkout")
                ?
                <div>
                  <Link
                    href={`/restaurant?id=${router.query.id}`}
                  >
                    <a className="btn btn-primary" style={{ width: "100%" }}>
                      戻る
                    </a>
                  </Link>
                </div>
                : cart.total > 0 ?
                <div>
                  <Link href={`/checkout?id=${props.restaurant.data.id}`}>
                    <a className="btn btn-primary" style={{ width: "100%" }}>
                      注文確認する
                    </a>
                  </Link>
                </div>
                : null
              }
            </div>
          </div>
        </CardBody>
      </Card>
      <style jsx>{`
        #item-price {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }

        #item-quantity {
          font-size: 0.95em;
          padding-bottom: 4px;
          color: rgba(158, 158, 158, 1);
        }

        #item-name {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
      `}</style>
    </div>
  )
}

export default Cart
