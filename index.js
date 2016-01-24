// ## Directive joystick
// @author Alex Suslov <suslov@me.com>
'use strict';
var lamda = function(ng){
  var Direction = {
    up    : 0b1000,
    down  : 0b0100,
    left  : 0b0010,
    right : 0b0001
  }

  function controller($scope){
    var direction = 0;
    var force = false;

    function pub(){ if (direction) $scope.ngModel.pub(direction.toString()); }

    var t = setInterval(function(){
      if(!force) pub();
      else force = false;
    }, 200);

    $scope.onRelease = function(name){
      direction = Direction[name] ? Direction[name] ^ direction : 0
    }

    $scope.onTouch = function(name){
      direction = (Direction[name] ? Direction[name] | direction : 0)
      pub();
      force = true;
    }
  }

  ng.module( 'widgets', [])
  .directive( 'joystickBtn4', function( ){
    return {
      scope:{ngModel:"="},
      controller: controller,
      templateUrl:'/lib/joystick-btn/joystick_btn4.svg'
    }
  })
  .directive( 'joystickBtn2', function(  ){
    return {
      scope:{ngModel:"="},
      controller: controller,
      templateUrl:'/lib/joystick-btn/joystick_btn2.svg'
    }
  })
  .directive( 'joystickBtn2_', function(  ){
    return {
      scope:{ngModel:"="},
      controller: controller,
      templateUrl:'/lib/joystick-btn/joystick_btn2_.svg'
    }
  })
}
lamda(angular);




