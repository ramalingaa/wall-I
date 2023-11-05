import boto3
import json

# Initialize DynamoDB client
dynamodb_resource = boto3.resource('dynamodb', region_name='ap-south-1')
table_name = 'mockman-user-details'
table = dynamodb_resource.Table(table_name)


def handler(event, context):
    try:
        # Parse the JSON data from the event
        # Extract user ID and feedback data
        user_id = event['userId']
        feedback = event['feedback']

        # Update the user data in DynamoDB with the new feedback
        table.update_item(
            Key={
                'userId': user_id
            },
            UpdateExpression='SET feedback = list_append(if_not_exists(feedback, :empty_list), :feedback_data)',
            ExpressionAttributeValues={
                ':empty_list': [],
                ':feedback_data': [feedback]
            },
            ReturnValues='ALL_NEW'
        )

        # Return a successful response
        response = {
            'statusCode': 200,
            'body': json.dumps({'message': 'Feedback added successfully'})
        }

        return response

    except Exception as e:
        # Return an error response
        response = {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
        return response
