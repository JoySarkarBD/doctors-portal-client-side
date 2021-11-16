import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CheckoutForm from '../CheckoutForm/CheckoutForm';


const stripePromise = loadStripe('pk_test_51Jw5fcCOAv10XLIYgIEHeK9fLk4Ndn0KvLOtdaU0174ChMgaG8GO24whn1ZZkMs3WE6BuaooepPGwRyBYTbndVur00NXHu2MbG');


const Payment = () => {
    const { appointmentId } = useParams()
    const [appointment, setAppointment] = useState({});

    useEffect(() => {
        fetch(`https://mysterious-wave-07675.herokuapp.com/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => setAppointment(data))
    }, [appointmentId])

    return (
        <div>
            <h2>please pay for {appointment.serviceName}</h2>
            <h4>{appointment.price}</h4>

            {appointment.price && <Elements stripe={stripePromise}>
                <CheckoutForm appointment={appointment} />
            </Elements>}
        </div>
    );
};

export default Payment;