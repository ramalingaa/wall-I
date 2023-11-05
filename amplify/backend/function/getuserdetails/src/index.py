import boto3
import json
from decimal import Decimal  # Import the Decimal class

# Initialize DynamoDB client
dynamodb = boto3.client('dynamodb', region_name='ap-south-1')
boto3.resource('dynamodb')
deserializer = boto3.dynamodb.types.TypeDeserializer()
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return str(o)  # Convert Decimal to string
        return super(DecimalEncoder, self).default(o)
def handler(event, context):
    try:
        body = json.loads(event['body'])
        user_id = body.get('user_id')
        # Query DynamoDB to retrieve user data
        response = dynamodb.get_item(
            TableName='mockman-user-details',
            Key={
                'userId': {'S': user_id}
            }
        )

        # Check if the item was found
        if 'Item' in response:
            user_data = response['Item']
            unmarshalled_data = {k: deserializer.deserialize(v) for k, v in user_data.items()}

            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST'
                     },
                'body': json.dumps(unmarshalled_data, cls=DecimalEncoder)
            }
        else:
            return {
                'statusCode': 404,
                 'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST'
                     },
                'body': 'User not found'
            }
    except Exception as e:
        return {
            'statusCode': 500,
             'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST'
                     },
            'body': str(e)
        }
