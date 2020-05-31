module "lambda" {
  source   = "../../../../hesto2-terraform-modules/lambda_app"
  app_name = "circleci-worker"
  lambda_environment_variables = {
    NODE_ENV = "production"
    NOTIFICATION_URL = "${data.aws_secretsmanager_secret_version.notification_url.secret_string}/api/slack"
    CIRCLECI_API_TOKEN = "${data.aws_secretsmanager_secret_version.circle_ci_api_token.secret_string}"
  }
}
module "sns_subscription" {
  source = "./node_modules/hesto2-terraform-modules/lambda_sns_subscription"
  lambda_function_name="${module.lambda.function_name}"
  lambda_arn="${module.lambda.arn}"
  topic_arn="${data.terraform_remote_state.notification_service.outputs.app_interaction_sns_topic_arn}"
  receiver_id="circleci-worker"
}