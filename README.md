# PDFTOTEXT Lambda

Local setup to test uploading pdf to s3 bucket, that triggers a Lambda with Poppler layer (contains pdftotext) to download pdf and extract bbox-layout and perform Xpath query.

### Getting started

#### Required installation
- [awslocal](https://docs.localstack.cloud/user-guide/integrations/aws-cli/) - Localstack wrapper on aws cli to direct command to Localstack server
- [Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
- [tflocal](https://docs.localstack.cloud/user-guide/integrations/terraform/#tflocal-wrapper-script) - Terraform wrapper to run terraform on Localstack server

#### Start Localstack
```
docker compose up
```

#### Build Typescript
`pnpm dev` runs a watcher on .ts file, but can be stopped after first build, so continued to test Lambda Hot-Reload working
```
pnpm i
pnpm dev
```

#### Extract Poppler layer
For local development extract poppler lambda layer into root on the project. This works the same as adding layer to lambda. -> NEED CLEANER SOLUTION
```
unzip poppler.zip
```

#### Apply Terraform to Localstack
```
cd infrastructure
tflocal init
tflocal apply -var "LAMBDA_MOUNT_CWD=$(pwd)/.." -auto-approve 
```

### Upload Statement/PDF to S3 Bucket
```
awslocal s3 cp ./statement.pdf s3://statements/statement.pdf
```

### View Lambda Logs
```
awslocal logs tail /aws/lambda/process --follow --format json
```