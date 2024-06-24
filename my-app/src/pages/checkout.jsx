import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Checkout() {
  const cart = useSelector((state) => state.cart)

  const [total, setTotal] = useState(0)

  useEffect(() => {
    // get the total amount
    let total = 0
    for (const item of cart.items) {
      total += item.rent
    }
    setTotal(total)
  }, [])

  return (
    <div>
      <h2 className='page-title'>Checkout</h2>
      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <h4>Select booking dates</h4>
          <div className='row mb-5'>
            <div className='col'>
              <label htmlFor=''>From</label>
              <input type='date' className='form-control' />
            </div>
            <div className='col'>
              <label htmlFor=''>To</label>
              <input type='date' className='form-control' />
            </div>
          </div>

          {cart.items.map((item) => {
            return (
              <div className='row'>
                <div style={{ fontWeight: 'bold' }} className='col'>
                  {item.title}
                </div>
                <div className='col'>₹ {item.rent}</div>
              </div>
            )
          })}
          <hr />
          <div className='row'>
            <div className='col'>Total Rent</div>
            <div className='col'>₹ {total}</div>
          </div>
          <hr />
          <div className='row'>
            <div className='col'>My Airbnb Fee</div>
            <div className='col'>₹ 500</div>
          </div>
          <hr />
          <div className='row'>
            <div className='col'>Total Due</div>
            <div className='col'>₹ {total + 500}</div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default Checkout
