const debug = require("debug")("checker.js");
const fetch = require('node-fetch')

function check(url, invocationParameters,  expectedResultData, expectedResultStatus) {
	const checkResult = { // this is the object you need to set and return
		urlChecked: url
	}

	return fetch(
			url,
			{qs: invocationParameters})
		.then((res) =>{
		debug(res);

		checkResult["resultStatus"] = res.status;
		checkResult["statusTestPassed"] = expectedResultStatus? res.status == expectedResultStatus : true
		return res.json();
	}).then((json) => {
		debug(json);
		checkResult["resultData"] = json;
		checkResult["resultDataAsExpected"] = compareResults(expectedResultData, json);

		return checkResult;
	});
}


// funzione che confronta due oggetti semplici e verifica se actual contiene tutti gli attributi di expected, e se per
// questi ha gli stessi valori
function compareResults(expected, actual) {
    if (!expected) return true //always ok if there are no expectations
    if (!actual) return false
    for (let e of Object.keys(expected)) {
        if (actual[e]===undefined || expected[e]!=actual[e]  ) return false
    }
    return true
}

module.exports = check
