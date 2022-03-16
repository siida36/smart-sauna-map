module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-use-before-define": ["error", { "functions": false, "classes": false, "variables": true }],
        "react/jsx-filename-extension": ["error", { "extensions": [".js", ".ts"] }],
        "react/prop-types": "off",
    }
};
