module.exports = function(dependencies, func) {

	var getParameterNames = require('get-parameter-names'),
		funcParamNames = getParameterNames(func);

	return function() {

		var params = Array.prototype.slice.call(arguments),
			callParams = [],
			paramsPosition = 0;
  
		for (var i=0; i<funcParamNames.length; i++) {
			if (dependencies.hasOwnProperty(funcParamNames[i])) {
				callParams.push(dependencies[funcParamNames[i]]);
			} else {
				if ( paramsPosition < params.length) {
					callParams.push(params[paramsPosition++]);
				}
			}
		}
		
		return func.apply(this,callParams);

	};
  
};
