import './orderPage.css'

function OrderPage() {
    return (
        <div className="content__container">

            <section>
                <h2>Order</h2>
            </section>
            <section>

            </section>
            <section>
                <span>
                    <p className='order__p-text'>Totalt värde på order</p>
                    <h3>1310 sek</h3>
                </span>
                <button className="btn__styling">
                    Skicka order
                </button>
            </section>
        </div>
    )
}

export default OrderPage
