describe('Services: $from', function() {
  beforeEach(module('SchoolApp'));

  it('should have a service from', inject(function($from) {
    expect($from).toBeDefined();
  }));
  it('should have a method setFrom', inject(function($from) {
    expect($from.setFrom).toBeDefined();
  }));
  it('should have a method getFrom', inject(function($from) {
    expect($from.getFrom).toBeDefined();
  }));
  it('should get and set', inject(function($from) {
    $from.setFrom('assignments');
    expect($from.getFrom()).toEqual('assignments');    
  }));
});