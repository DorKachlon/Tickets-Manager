module.exports = {
    "env": {
        "commonjs": true,
        "es2020": true,
        "node": true
    },
    "extends": [
        "airbnb-base"
    ],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        "linebreak-style": ["error", "windows"],
        "max-len": [2, 120, 4, {"ignoreUrls": true}]
    }
};
