const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const GHOST_INSPECTOR_API_KEY = process.env.GHOST_INSPECTOR_API_KEY;

async function getTestResults(suiteID,startURL){
    const response = await axios.get(`https://api.ghostinspector.com/v1/suites/${suiteID}/execute/?apiKey=${GHOST_INSPECTOR_API_KEY}&startUrl=${startURL}`)
    console.log(response);
    console.log(response.data);
    // TODO: return only test results
    return {
        allTestsSuccessful: true
    }
}

try {
    const startURL = core.getInput('startURL');
    const suiteID = core.getInput('suiteID');

    const testResults = getTestResults(startURL,suiteID);

    if(testResults.allTestsSuccessful){
        core.setOutput("All tests successful");
    }else {
        core.setFailed("At least one test failed");
    }
} catch (error) {
    core.setFailed(error.message);
}