const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

(async function(){
    const GHOST_INSPECTOR_API_KEY = core.getInput('GHOST_INSPECTOR_API_KEY');

    const requiredFieldNames = ['suiteID','maxTimeout','GHOST_INSPECTOR_API_KEY'];

    requiredFieldNames.forEach((fieldName) =>{
        if(!core.getInput(fieldName)){
            core.setFailed(`required field "${fieldName}" is missing`);
        }
    })

    async function getSuiteResult(suiteID,startURL){
        const requestConfig = {timeout: parseInt(core.getInput('startURL') || 300000)} //default timeout of 5min
        const response = await axios.get(`https://api.ghostinspector.com/v1/suites/${suiteID}/execute/?apiKey=${GHOST_INSPECTOR_API_KEY}&startUrl=${startURL}`,requestConfig)
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
            core.setOutput("SUCCESS","All test were successful (including screenshot comparison)");
        }else {
            core.setFailed(`At least one test failed. Check out https://app.ghostinspector.com/suites/${suiteID} for more details`);
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}())
