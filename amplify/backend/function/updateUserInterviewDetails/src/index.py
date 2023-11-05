import boto3
import json
from decimal import Decimal  # Import the Decimal class


# Initialize DynamoDB resource
dynamodb_resource = boto3.resource('dynamodb', region_name='ap-south-1')
table_name = 'mockman-user-details'
table = dynamodb_resource.Table(table_name)

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return str(o)  # Convert Decimal to string
        return super(DecimalEncoder, self).default(o)
def handler(event, context):
    try:
        # Parse the JSON data from the event
        # body = json.loads(event['body'])

      # Extract the new interview data and user ID
        new_interview_data = event['interviewData']
        user_id = event['userId']
        new_credit = event['credit']

            # Update the item with the modified interview data
        table.update_item(
            Key={
                'userId': user_id
            },
            UpdateExpression='SET interviewData = list_append(if_not_exists(interviewData, :empty_list), :new_data), credit = :new_credit',
            ExpressionAttributeValues={
                ':empty_list': [],
                ':new_data': [new_interview_data],
                ':new_credit': new_credit
                
            },
            ReturnValues='ALL_NEW'
            )
        response = table.get_item(
            Key={
                'userId': user_id
            }
        )

        # Extract the updated item data
        updated_item = response.get('Item', {})
        # response_dict = {"assistant_reply": 'Credit and interviewData updated successfully!'}

        return {
                'statusCode': 200,
                # 'headers': {
                #     'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                #     'Access-Control-Allow-Origin': '*',
                #     'Access-Control-Allow-Methods': 'POST'
                # },
                'body': json.dumps(updated_item, cls=DecimalEncoder),

            }

    except Exception as e:
        return {
            'statusCode': 500,
            # 'headers': {
            #     'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            #     'Access-Control-Allow-Origin': '*',
            #     'Access-Control-Allow-Methods': 'POST'
            # },
            'body': json.dumps({"error": str(e)}),

        }
