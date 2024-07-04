import { Button, Label } from "reactstrap"
import { CardElement, Elements } from "@stripe/react-stripe-js"

const CardSection = (props) => {
  return (
    <div>
      <div>
        {!props.success
          ? <Label htmlFor="card-element">クレジットカード</Label>
          : null
        }
        <div>
          <fieldset>
            <div className="form-row">
              <div id="card-element" style={{ width: "100%" }}>
                {!props.success
                  ? <CardElement/>
                  : null
                }
                <br/>
                <div className="order-button-wrapper">
                  {!props.success
                    ? <Button onClick={props.submitOrder} color="primary">注文する</Button>
                    : <Button outline disabled>注文完了</Button>
                  }
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <style jsx>
        {
          `
            .order-button-wrapper {
              display: flex;
              width: 100%;
              align-items: flex-end;
              justify-content: flex-end;
            }
          `
        }
      </style>
    </div>
  )
}

export default CardSection
