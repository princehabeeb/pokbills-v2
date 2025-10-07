class ServiceClass {
  constructor(id, icon, name) {
    this.id = id;
    this.icon = icon;
    this.name = name;
  }
}

export default ServiceList = [
  new ServiceClass(1, 'call-outline', 'Airtime'), //
  new ServiceClass(2, 'wifi', 'Data'), //
  new ServiceClass(4, 'receipt-outline', 'Bills'), //
  new ServiceClass(3, 'tv-outline', 'Tv subscription'), //
  new ServiceClass(6, 'document-text-outline', 'Education'), //
  new ServiceClass(8, 'keypad-outline', 'Recharge-Pin'),
  new ServiceClass(7, 'cellular-outline', 'Data Pin'), //
  new ServiceClass(12, 'cash-outline', 'Airtime To Cash'),
  new ServiceClass(10, 'happy-outline', 'Smile'),
  new ServiceClass(9, 'call-outline', 'Alpha Caller'),
  new ServiceClass(14, 'remove-circle-outline', 'Withdraw'),
  new ServiceClass(13, 'add-circle-outline', 'Add Fund'),
];
