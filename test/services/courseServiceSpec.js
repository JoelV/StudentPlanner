describe('Services: Course Service', function() {
  beforeEach(module('SchoolApp'));

  it('should have $course service', inject(function($course) {
    expect($course).toBeDefined();
  }));
  it('should have a method setCourse in $course service', inject(function($course) {
    expect($course.setCourse).toBeDefined();
  }));
  it('should have a method getCourse in $course service', inject(function($course) {
    expect($course.getCourse).toBeDefined();
  }));
  it('should return test data', inject(function($course) {
    var course = {name: 'CPT', number: '102'};
    $course.setCourse(course);
    expect($course.getCourse()).toEqual({name: 'CPT', number: '102'});
  }));
});