describe('Service: mode', function() {
  beforeEach(module('SchoolApp'));

  it('should have a $mode service', inject(function($mode) {
    expect($mode).toBeDefined();
  }));
  it('should have a method called setMode', inject(function($mode) {
    expect($mode.setMode).toBeDefined();
  }));
  it('should have a method called getMode', inject(function($mode){
    expect($mode.getMode).toBeDefined();
  }));
  it('should get and set mode', inject(function($mode) {
    $mode.setMode('edit');
    expect($mode.getMode()).toEqual('edit');
  }));
});