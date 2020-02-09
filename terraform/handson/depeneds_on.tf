resource "aws_s3_bucket" "example" {
  bucket = "terraform-getting-started-guide"
  acl    = "private"
}

resource "aws_instance" "sandbox" {
  ami           = "ami-785c491f"
  instance_type = "t2.micro"

  depends_on = [aws_s3_bucket.example] # S3バケットと関連付け
}

resource "aws_eip" "ip" {
  vpc      = true
  instance = aws_instance.sandbox.id
}
