import Marketing from "./observers/marketing.js";
import PaymentSubject from "./subjects/paymentSubject.js";
import Payment from "./events/payment.js";
import Shipment from "./observers/shipment.js";

const subject = new PaymentSubject();
const marketing = new Marketing();
subject.subscribe(marketing);

const shipment = new Shipment();
subject.subscribe(shipment);

const payment = new Payment(subject);
payment.creditCard({ userName: 'Joao', value: 1000 });

subject.unsubscribe(marketing);

payment.creditCard({ userName: 'Maria', value: 2000 });