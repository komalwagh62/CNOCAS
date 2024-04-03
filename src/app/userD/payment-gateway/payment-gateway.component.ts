import { Component } from '@angular/core';
declare var Razorpay: any;
@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrl: './payment-gateway.component.scss'
})
export class PaymentGatewayComponent {




  showPaymentGateway: boolean = false;

  constructor() { }

  upgradePlan() {
    // Logic to trigger the payment gateway UI
    this.showPaymentGateway = true;
  }

  processPayment() {
    // Logic to process the payment using the payment gateway provider
    // This can involve making API calls to the payment gateway provider's servers
    // Upon successful payment, you can perform further actions such as updating the user's subscription status
    console.log('Payment processed successfully');
  }
}