function Person(name, email, phone) {
  this.name = name;
  this.email = email;
  this.phone = phone;
}

Person.prototype.greet = function(other) {
  console.log('Hello ' + other.name + ', I am ' + this.name + '!');
};

Person.prototype.print = function() {
  console.log('Name: ' + this.name + ' Email: ' + this.email + ' Phone: ' + this.phone);
};

sonny = new Person('Sonny','sonny@hotmail.com', '483-485-4948');
jordan = new Person('Jordan','jordan@aol.com', '495-586-3456');
sonny.greet(jordan);
jordan.greet(sonny);
sonny.print();
jordan.print();
