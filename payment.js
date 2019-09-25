(function() {
  "use strict";

  let googlePayClient;

  const baseCardPaymentMethod = {
    type: "CARD",
    parameters: {
      allowedCardNetworks: ["VISA", "MASTERCARD"],
      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"]
    }
  };

  const googlePayBaseConfiguration = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [baseCardPaymentMethod]
  };

  function onGooglePayLoaded() {
    googlePayClient = new google.payments.api.PaymentsClient({
      environment: "TEST"
    });
  }

  function checkUserDeviceSupportForGPay() {
    googlePayClient
      .isReadyToPay(googlePayBaseConfiguration)
      .then(function(response) {
        if (response.result) {
          addGPayButton();
        } else {
          // Unable to pay using Google Pay
          alert('Unable to pay via GPay');
        }
      })
      .catch(function(err) {
        console.error("Error determining readiness to use Google Pay: ", err);
      });
  }

  function addGPayButton() {
    const GPayButton = googlePayClient.createButton({
      buttonColor: 'default', // currently defaults to black if default or omitted
      buttonType: 'long', // defaults to long if omitted
      //TODO: needs to add onClick event to GPay button to initate the transaction
      onClick: GPaySubmitHandler
    });
    document.body.appendChild(GPayButton);
  }

  function GPaySubmitHandler() {
    //TODO: handling the payment request to GPay
  }

  /**
   * Initializing the google pay configurations
   * with environment and allowed payment methods
   */
  function init() {
    onGooglePayLoaded();
    checkUserDeviceSupportForGPay();
  }

  init();
})();
