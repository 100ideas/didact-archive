// FISHCO1LBC
// TCAACYAATCAYAAAGATATYGGCAC
//
// FISHCO1HBC
// ACTTCYGGGTGRCCRAARAATCA

{
  "id": 1,
  "name": "FISHCO1LBC",
  "description": "Fish CO1 barcoding primer",
  "sequence": "TCAACYAATCAYAAAGATATYGGCAC",
  "orientation": [
    "forward",
    "reverse"
  ]
}

{
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "unique id",
            "minLength": 0,
            "maxLength": 255
        },
        "name": {
            "type": "string",
            "description": "short name",
            "minLength": 4,
            "maxLength": 32
        },
        "description": {
            "type": "string"
        },
        "sequence": {
            "type": "string",
            "description": "sequence"
        },
        "orientation": {
            "type": "string",
            "default": "forward",
            "enum": [
                [
                    "forward",
                    "reverse"
                ]
            ]
        }
    },
    "required": [
        "id",
        "name",
        "sequence",
        "orientation"
    ]
}


{
  "$id": "http://example.com/example.json",
  "type": "object",
  "definitions": {},
  "$schema": "http://json-schema.org/draft-06/schema#",
  "properties": {
    "id": {
      "$id": "/properties/id",
      "type": "integer",
      "title": "id",
      "description": "id string",
      "default": ""
    },
    "name": {
      "$id": "/properties/name",
      "type": "string",
      "title": "The Name Schema",
      "description": "An explanation about the purpose of this instance.",
      "default": "",
      "examples": [
        "FISHCO1LBC"
      ]
    },
    "description": {
      "$id": "/properties/description",
      "type": "string",
      "title": "The Description Schema",
      "description": "An explanation about the purpose of this instance.",
      "default": "",
      "examples": [
        "Fish CO1 barcoding primer"
      ]
    },
    "sequence": {
      "$id": "/properties/sequence",
      "type": "string",
      "title": "The Sequene Schema",
      "description": "An explanation about the purpose of this instance.",
      "default": "",
      "examples": [
        "TCAACYAATCAYAAAGATATYGGCAC"
      ]
    },
    "orientation": {
      "$id": "/properties/orientation",
      "type": "array",
      "uniqueItems": false,
      "items": {
        "$id": "/properties/orientation/items",
        "type": "string",
        "title": "orientation",
        "description": "forward or reverse strand",
        "default": "forward",
        "examples": [
          "forward"
        ],
        "enum": [
          "forward, reverse"
        ]
      }
    }
  },
  "required": [
    "id",
    "name",
    "sequence"
  ]
}


const mobx = require("mobx")
const { types } = require('mobx-state-tree');
const jsonSchemaToTypes = require('jsonschema-to-mobx-state-tree')(types);

const eventSchema = {
  type: "object",
  title: "Event",
  properties: {
    title: {
      type: "string"
    },
    public: {
      type: "boolean",
      default: false
    },
    time: {
      type: "object",
      properties: {
        start: {
          type: "string",
          format: "datetime"
        },
        end: {
          type: "string",
          format: "datetime"
        }
      },
      required: ["start"]
    }
  },
  required: ["title", "public"]
};

const primer = {
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "unique id",
    },
    "name": {
      "type": "string",
      "description": "short name",
      "minLength": 4,
      "maxLength": 32
    },
    "description": {
      "type": "string"
    },
    "sequence": {
      "type": "string",
      "description": "sequence"
    },
    "orientation": {
      "type": "string",
      "default": "forward",
      "enum": [
        [
          "forward",
          "reverse"
        ]
      ]
    }
  },
  "required": [
    "id",
    "name",
    "sequence",
    "orientation"
  ]
}

const eventModel = jsonSchemaToTypes(primer);

console.log(eventModel);

// https://npm.runkit.com/jsonschema-to-mobx-state-tree
