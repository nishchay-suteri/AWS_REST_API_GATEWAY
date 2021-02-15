"use strict";

const AWS = require("aws-sdk");
const uuid = require("uuid");

const docClient = new AWS.DynamoDB.DocumentClient();
const groupTable = process.env.GROUPS_TABLE;

exports.handler = async (event) => {
    console.log("Processing events: ", event);
    const itemID = uuid.v4();
    const parsedBody = JSON.parse(event.body);

    const newItem = {
        id: itemID,
        ...parsedBody,
    };
    await docClient
        .put({
            TableName: groupTable,
            Item: newItem,
        })
        .promise();

    return {
        statusCode: 201,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            newItem,
        }),
    };
};
