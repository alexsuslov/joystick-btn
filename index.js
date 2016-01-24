// ## Directive joystick
// @author Alex Suslov <suslov@me.com>
'use strict';
var lamda = function(ng){
  var btnCss = [
   'padding: 3px 7px;',
   'color: {{btn.right}};',
   'background:: {{fill.right}};'
  ].join(' ');

  var Direction = {
    up    : 0b1000,
    down  : 0b0100,
    left  : 0b0010,
    right : 0b0001
  }

  function controller($scope, $element){
    var direction = 0;
    var force = false;
    var config = $scope.ngModel.widgetConfig;

    $scope.fill = {
      up    : config.fill,
      down  : config.fill,
      left  : config.fill,
      right : config.fill
    };

    $scope.btn = {
      up    : config.arrow,
      down  : config.arrow,
      left  : config.arrow,
      right : config.arrow
    };
    $scope.title = config.title;

    function pub(){ if (direction) $scope.ngModel.pub(direction.toString()); }

    var t = setInterval(function(){
      if(!force) pub();
      else force = false;
    }, config.delay);

    $scope.onRelease = function(name){
      $scope.btn[name] = config.arrow;
      $scope.fill[name] = config.fill;
      direction = Direction[name] ? Direction[name] ^ direction : 0
    }

    $scope.onTouch = function(name){
      $scope.btn[name] = config.arrowPressed;
      $scope.fill[name] = config.fillPressed;
      direction = Direction[name] ? Direction[name] | direction : 0
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
  .directive( 'simpleBtn', function(  ){
    return {
      scope:{ngModel:"="},
      controller: controller,
      template:'<button style="' + btnCss + '">{{title}}</button>'
    }
  })
}
lamda(angular);

