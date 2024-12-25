import React from "react";
import amazonpayLego from "../../assets/imgs/amazon-pay.png";
import AmericanExpressLego from "../../assets/imgs/American-Express-Color.png";
import mastercardLego from "../../assets/imgs/mastercard.webp";
import paypalLego from "../../assets/imgs/paypal.png";
import appleStoreLego from "../../assets/imgs/get-apple-store.png";
import googlePlayLego from "../../assets/imgs/get-google-play.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-100 shadow-md py-3">
        <div className="container space-y-4">
          <header>
            <h1 className="text-xl font-semibold text-slate-800">
              Get the FreshCart App
            </h1>
            <p className="text-slate-400">
              we will send you a link,open it on your phone to download the app
            </p>
          </header>
          <div className="flex gap-2 ">
            <input
              className="form-control grow"
              type="email"
              placeholder="Email Address"
            />
            <button className="btn uppercase text-sm bg-primary-800 hover:bg-primary-900 text-white font-semibold">
              Share App link
            </button>
          </div>

          <div className="flex justify-between items-center  py-4 border-y-2  border-opacity-50 border-slate-300">
            <div className="payment-partners flex gap-3  items-center">
              <h3>payment Partners</h3>
              <img className="w-24" src={amazonpayLego} alt="amazonpayLego" />
              <img
                className="w-24"
                src={AmericanExpressLego}
                alt="AmericanExpressLego"
              />
              <img className="w-20" src={mastercardLego} alt="mastercardLego" />
              <img className="w-24" src={paypalLego} alt="paypalLego" />
            </div>
            <div className="download  flex gap-3  items-center">
              <h3>Get deliveries with freshCart</h3>
              <img className="w-24" src={appleStoreLego} alt="appleStoreLego" />
              <img
                className="w-[110px]"
                src={googlePlayLego}
                alt="googlePlayLego"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
