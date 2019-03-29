const browsers = {
    "chrome": 
    [
        "chrome",
        [
            "disable-infobars", // hide "Chrome is being controlled by automated test software"
            "headless" // run tests in headless chrome
        ]
    ],
    "firefox": "firefox"
    // could set up more browser configs here
}

const config = {
    rootURL: "http://localhost:3000",
    browser: browsers.chrome[0],
    browserArguments: browsers.chrome[1]
}

module.exports = config;