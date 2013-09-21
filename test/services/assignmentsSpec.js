describe('Service: assignments', function() {
  beforeEach(module('SchoolApp'));

  it('should have a service called $assignment', inject(function($assignment) {
    expect($assignment).toBeDefined();
  }));
  it('should have a method called getAssignment', inject(function($assignment) {
    expect($assignment.getAssignment).toBeDefined();
  }));
  it('should have a method called setAssignment', inject(function($assignment) {
    expect($assignment.setAssignment).toBeDefined();
  }));
  it('should get and set asignment', inject(function($assignment) {
    var foo = 'blah'
    $assignment.setAssignment(foo);
    expect($assignment.getAssignment()).toEqual('blah');
  }));
});