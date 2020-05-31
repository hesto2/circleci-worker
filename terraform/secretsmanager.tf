data "aws_secretsmanager_secret_version" "notification_url" {
  secret_id = "NOTIFICATION_SERVICE_URL"
}
data "aws_secretsmanager_secret_version" "circle_ci_api_token" {
  secret_id = "CIRCLE_CI_API_TOKEN"
}