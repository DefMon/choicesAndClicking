define(function(){
	return {
		randBetween: function(min, max) {
			return Math.floor(Math.random() * (max-min+1)) + min;
		},
		randomPick: function(array, ignoreFirstN){
			var min = ignoreFirstN || 0;
			return array[this.randBetween(min, array.length-1)];
		},
		randomSplice: function(array, ignoreFirstN){
			var min = ignoreFirstN || 0;
			return array.splice(1, this.randBetween(min, array.length-1));
		},
		doSum: function(leftSide, operator, rightSide){
			switch(operator) {
				case '+':
					return leftSide + rightSide;
				case '-':
					return leftSide - rightSide;
				case '*':
					return leftSide * rightSide;
				case '/':
					return leftSide / rightSide;
				default:
					console.log(operator +' is not an applicable operator');
			}
		},
		reverseSum: function(leftSide, operator, rightSide){
			var newOperator = '';
			switch(operator) {
				case '+':
					newOperator = '-';
					break;
				case '-':
					newOperator = '+';
					break;
				case '*':
					newOperator = '/';
					break;
				case '/':
					newOperator = '*';
					break;
				default:
					console.log(operator +' is not an invertable operator');
			}

			return this.doSum(leftSide, newOperator, rightSide);
		}
	};
});
