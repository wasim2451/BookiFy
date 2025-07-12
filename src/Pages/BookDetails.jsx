import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/FirebaseContext';
import { Razorpay } from 'razorpay';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BookDetails() {
    const { bookID } = useParams();
    const [bookInfo, setBookInfo] = useState({});
    const [bookDetails, setBookDetails] = useState(null);
    const [reviews, setReviews] = useState([]);
    const { user,
        getBookDetails,
        getGroqChatCompletion,
        retreiveSingleBook,
        paymentFunction,
        uploadOrderData,
        emailFunction,
        uploadReviews,
        retreiveReviews
    } = useFirebase();
    const [qty, setQty] = useState(1);
    const [review, setReview] = useState("");
    const [finalreview, setFinalReview] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchbookAndDetails = async () => {
            try {
                // Step 1: Fetch bookInfo using bookID
                const data = await retreiveSingleBook(bookID);
                console.log("Book Info fetched!", data);
                setBookInfo(data);

                // Step 2: Then fetch bookDetails using title
                if (data?.title) {
                    console.log("Fetching book details using title...");
                    const res = await getBookDetails(data.title);
                    console.log("Groq Response:", res);
                    setBookDetails(res);
                } else {
                    console.warn("No title found in book info");
                }
            } catch (err) {
                console.error("Error fetching book or details:", err);
            }
        };
        const reviewsGet = async () => {
            const data = await retreiveReviews(bookID);
            setReviews(data);
            console.log(reviews);

        }
        fetchbookAndDetails();
        reviewsGet();
    }, [bookID, finalreview]);

    const handlePayment = async () => {
        console.log(user.uid, " iS Buyer !");
        console.log(bookInfo.userId, " is Seller");
        if (user.uid === bookInfo.userId) {
            await Swal.fire({
                icon: "warning",
                title: "Oops!",
                text: "You can't buy your own books. Please explore other books instead.",
                confirmButtonText: "Go to Home"
            });
            return navigate('/');
        }

        let isPaymentCompleted = false;
        const amt = parseInt(bookInfo.price) * qty * 100; //paisa-format
        const obj = {
            amount: amt,
            currency: "INR",
            receipt: `${Date.now()}`,
            bookId: bookID,
            sellerId: bookInfo.userId,
            buyerId: user.uid
        };
        const orderID = await paymentFunction(obj);
        console.log(orderID);

        if (orderID) {

            // Payload object for Firestore
            const orderData = {
                amount: amt,
                bookname: bookInfo.title,
                sellerId: bookInfo.userId,
                buyerId: user.uid,
                buyerName: user.displayName,
                buyerEmail: user.email,
                orderId: orderID,
                qty: qty
            }
            var options = {
                key: import.meta.env.VITE_RAZORPAY_TEST_KEY_ID,
                amount: amt,
                currency: "INR",
                name: bookInfo.title,
                order_id: orderID,
                handler: async function (response) {
                    console.log(response);
                    const res = await axios.post("https://bookify-1z0e.onrender.com/api/verify", {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    });
                    if (res.data.status === "success") {
                        isPaymentCompleted = true;

                        await Swal.fire({
                            title: "Payment Successful!",
                            text: "Your payment has been processed successfully.",
                            icon: "success",
                            confirmButtonText: "OK"
                        });

                        console.log(isPaymentCompleted, "Payment Success");

                        const isUpload = await uploadOrderData(orderData);

                        console.log(isUpload, "status firestore !");

                        if (isUpload) {
                            const isEmail = await emailFunction(orderData);
                            if (isEmail) {
                                await Swal.fire({
                                    title: "Order Confirmation Email Sent!",
                                    text: `An order email has been sent to ${orderData.buyerEmail}.`,
                                    icon: "success",
                                    confirmButtonText: "OK"
                                });
                            } else {
                                await Swal.fire({
                                    title: "Email Sending Failed",
                                    text: "Order email could not be sent. Please try again later.",
                                    icon: "error",
                                    confirmButtonText: "OK"
                                });
                                return;
                            }
                        }
                    } else {
                        await Swal.fire({
                            title: "Payment Failed!",
                            text: "Something went wrong with the payment.",
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    }

                },
            };
            var rzp = new window.Razorpay(options);
            rzp.open();
        }
    }

    const handleReviewSubmit = async () => {
        setFinalReview(review);
        if (user?.displayName || user?.email) {
            const message = {
                username: user.displayName || user.email,
                review: review,
                bookID: bookID
            };
            const status = await uploadReviews(message);
            if (status) {
                console.log("Review Submitted Successfully ");
                setReview("");
            } else {
                console.log("Review Submission Error ");
            }
        } else {
            console.log("User does not exist !");
        }
    }
    return (
        <div className="container py-4">
            <div>
                <div className="row g-4 align-items-start px-4">
                    {/* LEFT: Book Info */}
                    <div className="col-12 col-lg-6">
                        <div className=" bg-light h-100 book-info">
                            <h3 className="fw-bold mb-3 text-success text-center">Book Information AI ✨ </h3>
                            {bookDetails ? (
                                <p className="text-muted" style={{ whiteSpace: "pre-line" }}>
                                    {bookDetails}
                                </p>
                            ) : (
                                <div className="d-flex align-items-center gap-2">
                                    <Spinner
                                        animation="border"
                                        variant="primary"
                                        style={{ opacity: 0.6 }}
                                    />
                                    <span className="text-muted">Fetching Book details using Llama 3.1...</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Book About */}
                    <div className="col-12 col-lg-6">
                        <div className="p-4 bg-white h-100 book-about">
                            <h3 className="fw-bold mb-3 text-dark text-center">About This Listing</h3>

                            {/* Book Cover Image */}
                            <div className="mb-3 text-center">
                                <img
                                    src={bookInfo.coverURL}
                                    alt={bookInfo.title}
                                    style={{
                                        width: "200px",
                                        height: "200px",
                                        objectFit: "contain",
                                    }}
                                />
                            </div>

                            {/* Book Details */}
                            <h4 className="fw-bold text-dark">{bookInfo.title}</h4>
                            <p className="mb-2">
                                <span className="fw-bold">ISBN:</span> {bookInfo.isbn}
                            </p>
                            <p className="mb-2">
                                <span className="fw-bold">Price:</span> ₹{bookInfo.price}
                            </p>

                            {/* Seller Info */}
                            <div className="d-flex align-items-center mb-3">
                                <img
                                    src={bookInfo.userURL ? bookInfo.userURL : "https://i.fbcd.co/products/original/s211206-kids-avat001-mainpreview-68e535dc97667c8fffa14c6da9e6f5787447ab7513f0fee9a9a39b9856312c9c.jpg"}
                                    alt={bookInfo.username}
                                    className="rounded-circle me-2"
                                    style={{ width: "30px", height: "30px", objectFit: "cover" }}
                                />
                                <span className="text-muted small">{bookInfo.username}</span>
                            </div>
                            <p className="mb-2">
                                <span className="fw-bold">Seller Email:</span><span className='text-secondary'> &#160;{bookInfo.email}</span>
                            </p>

                            {/* Quantity & Buy Button */}
                            <div className="d-flex flex-column flex-sm-row gap-3">
                                <label htmlFor="" className='fw-bold'>Qty :</label>
                                <input
                                    type="number"
                                    min="1"
                                    className="form-control"
                                    style={{ maxWidth: "120px" }}
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                />
                                <button className="btn btn-success flex-grow-1"
                                    onClick={handlePayment} >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-4 px-4">
                <div className="row justify-content-start">
                    <div className="col-md-8">
                        <div
                            className="p-4 rounded"
                            style={{
                                background: "hsla(62, 100%, 90%, 0.5)",
                                border: "1px solid #e0e0e0",
                            }}
                        >
                            <h4 className="text-primary fw-bold mb-3">Write a Review 📝</h4>

                            <div className="d-flex">
                                <input
                                    type="text"
                                    placeholder="Enter your review..."
                                    className="form-control me-2"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                />
                                <Button
                                    variant="secondary"
                                    onClick={handleReviewSubmit}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {reviews.length != 0 ? <div className="review-section px-4">
                <h3 className="fw-bold text-dark mb-3">Reviews</h3>
                {reviews.map((item, index) => (
                    <div
                        key={index}
                        className="mb-3 p-3 rounded"
                        style={{
                            background: "#f8f9fa",
                            border: "1px solid #e0e0e0",
                        }}
                    >
                        <h5 className="mb-1 text-success" style={{ fontWeight: "600" }}>
                            {item.username}
                        </h5>
                        <p style={{ margin: 0, color: "#555" }}>{item.review}</p>
                    </div>
                ))}
            </div> : <div className="review-section px-4">
                <h3 className="fw-bold text-dark mb-3">Reviews</h3>
                <p>No reviews yet . Be the first one to write .</p>
            </div>}
        </div>
    );

}

export default BookDetails;
