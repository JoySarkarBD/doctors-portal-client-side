import { CircularProgress } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ appointment }) => {

    const { price, patientName } = appointment;
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [proccess, setProccess] = useState(false)


    useEffect(() => {
        fetch('https://mysterious-wave-07675.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret))

    }, [price])



    const handleSubmit = async e => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }


        setProccess(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            setSuccess('');
        } else {
            setError('')
            console.log(paymentMethod);
            setProccess(false)
        }


        // payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                    },
                },
            },
        );

        if (intentError) {
            setError(intentError.message)
            setSuccess('');
        }
        else {
            setError('');
            setSuccess('your payment proccessed successfully');
            console.log(paymentIntent)
        }



    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {process ? <CircularProgress /> : <button type="submit" disabled={!stripe}>
                    Pay ${appointment.price}
                </button>}
            </form>


            {
                error && <p>{error}</p>
            }

            {
                success && <p>{success}</p>
            }
        </div>
    );
};

export default CheckoutForm;