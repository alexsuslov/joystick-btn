// ## Directive joystick
// @author Alex Suslov <suslov@me.com>
'use strict';

angular.module('widgets',[])
.directive('joystickBtn',function( $ionicScrollDelegate ){

  function controller($scope, $element){
    var direction = 0;
    var force = false;

    function pub(){
      if (direction)
        // console.log('current', direction.toString(2) );
        scope.ngModel.pub(direction);
    }

    var t = setInterval(function(){
      if(!force) pub();
      else force = false;
    }, 200);

    $scope.onRelease = function(name){
      $ionicScrollDelegate.freezeScroll( false );
      if (name ==='left') direction = 0b1000 ^ direction;
      if (name ==='right') direction = 0b0100 ^ direction;
      if (name ==='up') direction = 0b0010 ^ direction;
      if (name ==='down') direction = 0b0001 ^ direction;
    }

    $scope.onTouch = function(name){
      $ionicScrollDelegate.freezeScroll( true );
      if (name ==='left') direction = 0b1000 | direction;
      if (name ==='right') direction = 0b0100 | direction;
      if (name ==='up') direction = 0b0010 | direction;
      if (name ==='down') direction = 0b0001 | direction;
      pub();
      force = true;
    }
  }
  return {
    scope:{ngModel:"="},
    controller: controller,
    templateUrl:'/lib/joystick-btn/joystick-btn.svg'
  }
})
