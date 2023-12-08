data "aws_iam_policy_document" "lambda_assume_role_policy_document" {
  statement {
    actions = [ "sts:AssumeRole" ]
    principals {
      type = "Service"
      identifiers = [ "lambda.amazonaws.com" ]
    }
  }
}

resource "aws_iam_role" "lambda_execution_role" {
  name = "api-lambda-execution-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy_document.json
}