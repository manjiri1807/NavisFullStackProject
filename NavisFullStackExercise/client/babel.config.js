module.exports = {
  "plugins": [
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-optional-chaining"
  ],
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
