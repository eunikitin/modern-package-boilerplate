export default {
  "presets": [
    [ "env", { "modules": false } ],
    "stage-0",
    "react",
    "flow"
  ],
  "plugins": [
    ["module-resolver", {
      "root": ["./src"]
    }]
  ]
}