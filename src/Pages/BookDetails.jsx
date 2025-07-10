import React, { useEffect, useState } from 'react'
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
    const { user, getBookDetails, getGroqChatCompletion, retreiveSingleBook, paymentFunction, uploadOrderData , emailFunction } = useFirebase();
    const [qty, setQty] = useState(1);
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

        fetchbookAndDetails();
    }, [bookID]);

    const handlePayment = async () => {
        console.log(user.uid, " iS Buyer !");
        console.log(bookInfo.userId, " is Seller");
        if (user.uid === bookInfo.userId) {
            alert("You can't buy your own books !Buy some others ");
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
                sellerId: user.uid,
                buyerId: bookInfo.userId,
                buyerName: bookInfo.username,
                buyerEmail: bookInfo.email,
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
                    const res = await axios.post("http://localhost:3000/api/verify", {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    });
                    if (res.data.status === "success") {
                        isPaymentCompleted = true;
                        alert("Payment Successful !");
                        // Data Store in FireStore ! 
                        console.log(isPaymentCompleted,"Payment Success");
                        const isUpload=await uploadOrderData(orderData); // true or false
                        //Email send to sender !
                        console.log(isUpload,"status firestore !");
                        
                        if(isUpload){
                            const isEmail=await emailFunction(orderData); // true or false
                            if(isEmail){
                                alert(`Order Email sent to ${orderData.buyerEmail}`);
                            }else{
                                alert(`Order Email failed to sent !`);
                                return ;
                            }
                        }

                    } else {
                        alert("Payment Failed !");
                    }
                },
            };
            var rzp = new window.Razorpay(options);
            rzp.open();
        }
    }

    return (
        <div className="container py-4">
            <div className="row g-4 align-items-start">
                {/* LEFT: Book Info */}
                <div className="col-12 col-lg-6">
                    <div className=" bg-light h-100 book-info">
                        <h3 className="fw-bold mb-3 text-success text-center">Book Information AI </h3>
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
                            <label htmlFor="">Qty :</label>
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
    );

}

export default BookDetails;
