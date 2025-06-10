import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import { FaMoneyBillWave, FaUserGraduate, FaCreditCard, FaSpinner, FaLock, FaMobileAlt } from 'react-icons/fa';

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'natcash', or 'moncash'
    const [mobileNumber, setMobileNumber] = useState('');

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [cart, refetch] = useCart();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + (item.price || 0), 0);
    const tutorEmails = cart.map(item => item.tutorEmail).filter(email => !!email);

    useEffect(() => {
        if (totalPrice > 0 && paymentMethod === 'card') {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    const secret = res.data?.clientSecret;
                    if (secret) {
                        setClientSecret(secret);
                    } else {
                        console.error("Missing clientSecret in response", res.data);
                    }
                })
                .catch(err => {
                    console.error("Failed to create payment intent", err);
                });
        }
    }, [axiosSecure, totalPrice, paymentMethod]);

    const handleMobilePayment = async (e) => {
        e.preventDefault();
        if (!mobileNumber) {
            setError('Please enter your mobile number');
            return;
        }

        setProcessing(true);
        try {
            // Here you would integrate with the actual mobile payment API
            const mobilePaymentData = {
                email: user.email,
                price: totalPrice,
                mobileNumber: mobileNumber,
                paymentMethod: paymentMethod,
                tutorEmails: tutorEmails,
                cartIds: cart.map(item => item._id),
                status: 'pending',
                date: new Date()
            };

            const res = await axiosSecure.post('/mobile-payments', mobilePaymentData);
            
            if (res.data?.success) {
                setTransactionId(res.data.transactionId);
                refetch();
                
                Swal.fire({
                    icon: "success",
                    title: "Payment Initiated!",
                    text: `Please confirm the payment on your ${paymentMethod} mobile app.`,
                    showConfirmButton: true,
                });
                
                navigate('/dashboard/paymentHistory');
            }
        } catch (error) {
            console.error('Mobile payment error:', error);
            setError('Failed to process mobile payment. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    const handleCardPayment = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        setProcessing(true);
        setError('');

        try {
            const { error: paymentMethodError } = await stripe.createPaymentMethod({
                type: 'card',
                card,
            });

            if (paymentMethodError) {
                throw new Error(paymentMethodError.message);
            }

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    }
                }
            });

            if (confirmError) {
                throw new Error(confirmError.message);
            }

            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    tutorEmails: tutorEmails,
                    totalTutorEmails: tutorEmails.length,
                    status: 'pending'
                };

                const res = await axiosSecure.post('/payments', payment);
                refetch();

                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Payment Successful!",
                        text: "Your booking has been confirmed.",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    navigate('/dashboard/paymentHistory');
                }
            }
        } catch (err) {
            console.error("Payment error:", err);
            setError(err.message || "An unexpected error occurred. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="flex flex-col space-y-6">
            {/* Security Notice */}
            <div className="flex items-center gap-2 text-[#70C5D7] text-sm">
                <FaLock className="text-[#DA3A60]" />
                <span>Payments are secure and encrypted</span>
            </div>

            {/* Order Summary */}
            <div className="bg-[#F8FBFF] rounded-xl p-6">
                <h3 className="text-xl font-semibold text-[#005482] mb-4">Order Summary</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FaUserGraduate className="text-[#FCBB45]" />
                            <span className="text-[#005482]">Total Tutors</span>
                        </div>
                        <span className="font-medium text-[#005482]">{tutorEmails.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FaMoneyBillWave className="text-[#DA3A60]" />
                            <span className="text-[#005482]">Total Amount</span>
                        </div>
                        <span className="font-medium text-[#005482]">${totalPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-xl p-6 border border-[#70C5D7]/20">
                <h3 className="text-xl font-semibold text-[#005482] mb-4">Select Payment Method</h3>
                <div className="grid grid-cols-3 gap-4">
                    <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                            paymentMethod === 'card'
                                ? 'border-[#DA3A60] bg-[#DA3A60]/5'
                                : 'border-[#70C5D7]/20 hover:border-[#70C5D7]'
                        }`}
                    >
                        <FaCreditCard className={`text-2xl ${paymentMethod === 'card' ? 'text-[#DA3A60]' : 'text-[#70C5D7]'}`} />
                        <span className="text-sm font-medium text-[#005482]">Card</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setPaymentMethod('natcash')}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                            paymentMethod === 'natcash'
                                ? 'border-[#DA3A60] bg-[#DA3A60]/5'
                                : 'border-[#70C5D7]/20 hover:border-[#70C5D7]'
                        }`}
                    >
                        <FaMobileAlt className={`text-2xl ${paymentMethod === 'natcash' ? 'text-[#DA3A60]' : 'text-[#70C5D7]'}`} />
                        <span className="text-sm font-medium text-[#005482]">Natcash</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setPaymentMethod('moncash')}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                            paymentMethod === 'moncash'
                                ? 'border-[#DA3A60] bg-[#DA3A60]/5'
                                : 'border-[#70C5D7]/20 hover:border-[#70C5D7]'
                        }`}
                    >
                        <FaMobileAlt className={`text-2xl ${paymentMethod === 'moncash' ? 'text-[#DA3A60]' : 'text-[#70C5D7]'}`} />
                        <span className="text-sm font-medium text-[#005482]">Moncash</span>
                    </button>
                </div>
            </div>

            {/* Payment Form */}
            {paymentMethod === 'card' ? (
                <form onSubmit={handleCardPayment}>
                    <div className="bg-white border border-[#70C5D7]/20 p-4 rounded-xl mb-6">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#005482',
                                        '::placeholder': {
                                            color: '#70C5D7',
                                        },
                                        backgroundColor: 'white',
                                    },
                                    invalid: {
                                        color: '#DA3A60',
                                    },
                                },
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!stripe || !clientSecret || processing}
                        className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-lg font-medium transition-colors
                            ${!stripe || !clientSecret || processing
                                ? 'bg-[#DA3A60]/50 text-white cursor-not-allowed'
                                : 'bg-[#DA3A60] text-white hover:bg-opacity-90'
                            }`}
                    >
                        {processing ? (
                            <>
                                <FaSpinner className="animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>Pay ${totalPrice.toFixed(2)}</>
                        )}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleMobilePayment}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[#005482] mb-2">
                                Mobile Number
                            </label>
                            <input
                                type="tel"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                placeholder="Enter your mobile number"
                                className="w-full px-4 py-3 rounded-xl border border-[#70C5D7]/20 focus:outline-none focus:ring-2 focus:ring-[#DA3A60] text-[#005482]"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing || !mobileNumber}
                            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-lg font-medium transition-colors
                                ${processing || !mobileNumber
                                    ? 'bg-[#DA3A60]/50 text-white cursor-not-allowed'
                                    : 'bg-[#DA3A60] text-white hover:bg-opacity-90'
                                }`}
                        >
                            {processing ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>Pay with {paymentMethod === 'natcash' ? 'Natcash' : 'Moncash'}</>
                            )}
                        </button>
                    </div>
                </form>
            )}

            {error && (
                <div className="bg-red-50 text-red-800 p-4 rounded-xl text-sm">
                    {error}
                </div>
            )}

            {transactionId && (
                <div className="bg-green-50 text-green-800 p-4 rounded-xl">
                    <p className="font-medium">Payment Successful!</p>
                    <p className="text-sm mt-1">Transaction ID: {transactionId}</p>
                </div>
            )}
        </div>
    );
};

export default CheckoutForm;