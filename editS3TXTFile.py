import boto3

# Initialize the S3 client
s3 = boto3.client('s3')

# Define bucket and file details
bucket_name = 'productsdatarepairshack'
file_key = 'products.txt'

# Step 1: Download the file
def download_file(bucket_name, file_key):
    response = s3.get_object(Bucket=bucket_name, Key=file_key)
    return response['Body'].read().decode('utf-8')

# Step 2: Edit the file content
def edit_content(content):
    # Clear existing content and add new line
    new_line = "000001,2024-08-28 13:31:11,12,$120-180,screen"
    return f"{new_line}\n"

# Step 3: Upload the edited file
def upload_file(bucket_name, file_key, content):
    s3.put_object(Bucket=bucket_name, Key=file_key, Body=content.encode('utf-8'))

def main():
    # Download the file (this step may be skipped if you are only updating content)
    download_file(bucket_name, file_key)
    
    # Edit the content to be just the new line
    edited_content = edit_content("")
    
    # Upload the edited file
    upload_file(bucket_name, file_key, edited_content)
    print("File edited and uploaded successfully.")

if __name__ == "__main__":
    main()
