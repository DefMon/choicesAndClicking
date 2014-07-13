angular.module( 'ngAlone.utilities').service('mathsUtils', function(){
    'use strict';
    var mathsUtilities = {
        applyOperation: function(firstValue, operator, secondValue){
            switch (operator) {
                case '+':
                    return firstValue + secondValue;
                case '-':
                    return firstValue - secondValue;
                case '*':
                    return firstValue * secondValue;
                case '/':
                    return firstValue / secondValue;
                case '=':
                    return secondValue;
            }
        },
        randBetween: function(min, max) {
            return Math.floor(Math.random()*(max-min+1)+min);
        }
    };
    return mathsUtilities;
});