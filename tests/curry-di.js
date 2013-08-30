var curryDi = require('../index.js'),
	expect = require('expect.js'),
	sinon = require('sinon');

describe('Curry-Di...',function() {
	// For most of the functionality here, see ResponseSelector
	
	it('Can apply from dependencies',function() {
		
		var drawer = function(a, b, c) {
			return "IDRAW: " + a + "|" + b + '-' + c;
		}
		
		var decorator = function(str) {
			return ' -> ' + str;
		}

		var testFunc = function(decoratorDep, drawDep, a, b, c) {
		  	return decoratorDep(drawDep(a, b, c));
		}

		var fu = curryDi(
			{ 
				drawDep: drawer,
				decoratorDep: decorator
			},
			testFunc
		);

		expect(fu('x', 'y', 'z')).to.equal(' -> IDRAW: x|y-z');
	});
	
});


