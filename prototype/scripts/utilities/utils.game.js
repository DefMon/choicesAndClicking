define(function(){
	var Utils = {
		randBetween: function(min, max) {
			return Math.floor(Math.random() * max) + min;
		},
		doOperation: function(firstValue, operator, secondValue, reverse){
			if(reverse) {
				switch(operator){
					case '+':
						return firstValue - secondValue;
					case '*':
						return Math.round(firstValue / secondValue);
					case '-':
						return firstValue + secondValue;
					case '/':
						return Math.round(firstValue * secondValue);
					case '=':
						console.log('= cannot be reversed');
						return firstValue;
					default:
						console.log(operator+' is an unknown operator');
						return firstValue;
				}
			} else {
				switch(operator){
					case '+':
						return firstValue + secondValue;
					case '*':
						return Math.round(firstValue * secondValue);
					case '-':
						return firstValue - secondValue;
					case '/':
						return Math.round(firstValue / secondValue);
					case '=':
						return secondValue;
					default:
						return operator+' is an unknown operation';
				}
			}
		},
		modifyProperty: function(object, propertyName, changes, reverse) {
			var property = object.get(propertyName);
			function getNewValue(startingValue, change){
				if($.isArray(change)){
					return Utils.doOperation(startingValue, change[0], change[1], reverse);
				} else {
					return change;
				}
			}
			function getNewNestedValue(property, changes){
				var returnObject = {};
				if(!property){
					returnObject = getNewValue(0, changes);
				} else if($.isPlainObject(changes)){
					_.each(changes, function(value, name){
						returnObject[name] = getNewNestedValue(property[name], value);
					});
				} else {
					returnObject = getNewValue(property, changes);
				}
				return returnObject;
			}
			
			if (property) {
				if($.isPlainObject(changes)){
					object.set(propertyName, getNewNestedValue(property, changes));
				} else {
					object.set(propertyName, getNewValue(property, changes));
				}
			} else {
				object.set(propertyName, getNewValue(0, changes));
			}
		},
		reversePropertyModification: function(object, propertyName, changes){
			this.modifyProperty(object, propertyName, changes, reverse);
		},
		shouldObjectBeUnlocked: function(object, type){
			if(_.isEmpty(object.get('prereqs')[type])) {
				delete object.get('prereqs')[type];
				if(_.isEmpty(object.get('prereqs'))) {
					return true;
				}
			}
			object.save();
			return false;
		},
		shouldObjectBeRelocked: function(object, type) {
			if(_.isEmpty(object.get('postreqs')[type])) {
				delete object.get('postreqs')[type];
				if(_.isEmpty(object.get('postreqs'))) {
					return true;
				}
			}
			object.save();
			return false;
		}
	};
	return Utils;
});