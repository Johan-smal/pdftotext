resource "aws_lambda_function" "process" {
    s3_bucket     = "hot-reload"
    s3_key        = "${var.LAMBDA_MOUNT_CWD}/"
    function_name = "process"
    role          = aws_iam_role.lambda_execution_role.arn
    handler       = "dist/app.handler"
    runtime       = "nodejs18.x"
    timeout       = 30
    environment {
      variables = {
        APP_ENV           = "local"
        IS_OFFLINE        = true
        STATEMENT_BUCKET  = aws_s3_bucket.statement.bucket
      }
    }
}