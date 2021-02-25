const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const GHOST_INSPECTOR_API_KEY = core.getInput('GHOST_INSPECTOR_API_KEY');

async function getSuiteResult(suiteID,startURL){
    const response = await axios.get(`https://api.ghostinspector.com/v1/suites/${suiteID}/execute/?apiKey=${GHOST_INSPECTOR_API_KEY}&startUrl=${startURL}`)
    console.log("REQUEST RESPONSE", response);
    console.log("RESULTS", response.data.data);
    return response.data.data;
}

function areAllTestsSuccessful(suiteResult){
    const allTestResults = suiteResult.map((test) => {
        return test.passing && test.screenshotComparePassing
    })
    return !allTestResults.includes(false)
}

try {
    const startURL = core.getInput('startURL');
    const suiteID = core.getInput('suiteID');

    const suiteResult = await getSuiteResult(suiteID,startURL);

    if(areAllTestsSuccessful(suiteResult)){
        core.setOutput("SUCCESS","All tests successful");
    }else {
        core.setFailed(`At least one test failed ${suiteResult}`);
    }
} catch (error) {
    core.setFailed(error.message);
}