import React,{useEffect}from 'react'
import Swal from "sweetalert2";
import { useFirebase } from '../context/FirebaseContext';
function Modal() {
    const{isLoggedIn}=useFirebase();
    useEffect(() => {
    if (!isLoggedIn) {
      const popupShown = sessionStorage.getItem("popup_shown");

      if (!popupShown) {
        Swal.fire({
          title: "Welcome to BookiFy!",
          html: `
            <ul style="text-align:left;">
              <li>🔐 Google Sign-in Authentication</li>
              <li>📚 List and Browse Second-hand Books</li>
              <li>💰 Secure Payments via Razorpay</li>
              <li>📧 Instant Email Order Confirmation</li>
              <li>⭐ Review and Rate Books</li>
              <li>📊 Dashboard for Sales & Orders</li>
              <li>🔎 Search Books Instantly</li>
            </ul>
          `,
          confirmButtonText: "Let's Explore!",
          width: 600,
        });

        sessionStorage.setItem("popup_shown", "true");
      }
    }
  }, [isLoggedIn]);
    return (
        <></>
    )
}

export default Modal
