import { Label } from "reactstrap"
import { CardElement, Elements } from "@stripe/react-stripe-js"

const CardSection = (props) => {
  return (
    <di>
      <div>
        <Label htmlFor="card-element">クレジットカード</Label>
        <div>
          <fieldset>
            <div className="form-row">
              <div id="card-element" style={{ width: "100%" }}>
                <CardElement/>
                <br/>
                <div className="order-button-wrapper">
                  <button onClick={props.submitOrder}>注文を確認する</button>
                </div>
                {props.errorMsg ? <div>{props.errorMsg}</div> : null}
                {props.successMsg ? <div>{props.successMsg}</div> : null}
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
    </di>
  )
}

export default CardSection
