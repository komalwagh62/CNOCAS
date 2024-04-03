import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent {
  constructor(private router: Router) {}
  
  // Define your subscription packages here
  packages = [
    { name: 'Premium', description: 'Unlimited Free Download', price: '₹ 10000', access: '/month for 12 months*' },
    { name: 'Standard', description: 'One time payment', price: '₹ 5000', access: '/month for 12 months*' },
    { name: 'Essentials', description: 'One time payment', price: '₹ 1000', access: '/month for 12 months*' },
    { name: 'Free', description: 'For 3 months access', price: '₹ 0', access: '/month*' }
    // Add more packages as needed
  ];
  

  upgradePackage(packageName: string) {
    // Navigate to the payment gateway component
    this.router.navigate(['payment-gateway']);
  }
}
