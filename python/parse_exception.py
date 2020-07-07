import boto3
import botocore.exceptions

def get_object_from_s3():

  try:
    obj = boto3.client('s3').get_object(
      Bucket="sample_bucket",
      Key="hogehoge/fugafuga/sample.txt"
    )
    return obj["Body"].read().decode("utf-8") if obj else None
  except CllientError as e:
    if e.responce['Error']['Code'] == "NoSuchKey":
      print("NoSuchKey Error %s", e)
    else
      print("Invalid Error %s", e)


def main():
  get_object_from_s3()

if __name__ == "__main__":
  main()