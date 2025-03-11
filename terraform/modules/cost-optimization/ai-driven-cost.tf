resource "aws_sagemaker_endpoint" "cost_predictor" {
  name                 = "support-sphere-cost-predictor"
  endpoint_config_name = aws_sagemaker_endpoint_configuration.cost_predictor.name
}

resource "aws_lambda_function" "cost_optimizer" {
  filename         = "cost_optimizer.zip"
  function_name    = "support-sphere-cost-optimizer"
  role            = aws_iam_role.cost_optimizer_role.arn
  handler         = "index.handler"
  runtime         = "python3.9"
  timeout         = 300

  environment {
    variables = {
      SAGEMAKER_ENDPOINT = aws_sagemaker_endpoint.cost_predictor.name
      EKS_CLUSTER_NAME   = var.eks_cluster_name
      MIN_NODES         = "2"
      MAX_NODES         = "10"
    }
  }
}

resource "aws_cloudwatch_event_rule" "cost_optimization" {
  name                = "support-sphere-cost-optimization"
  description         = "Trigger cost optimization every 5 minutes"
  schedule_expression = "rate(5 minutes)"
}

resource "aws_cloudwatch_event_target" "cost_optimization" {
  rule      = aws_cloudwatch_event_rule.cost_optimization.name
  target_id = "CostOptimization"
  arn       = aws_lambda_function.cost_optimizer.arn
}

resource "aws_budgets_budget" "resource_budget" {
  for_each = {
    compute = { limit = 1000, service = "Amazon Elastic Compute Cloud" }
    storage = { limit = 500, service = "Amazon Simple Storage Service" }
    network = { limit = 300, service = "AWSDataTransfer" }
  }

  name              = "support-sphere-${each.key}-budget"
  budget_type       = "COST"
  limit_amount      = each.value.limit
  limit_unit        = "USD"
  time_period_start = "2025-01-01_00:00"
  time_unit         = "MONTHLY"

  cost_filter {
    name = "Service"
    values = [each.value.service]
  }

  notification {
    comparison_operator = "GREATER_THAN"
    threshold          = 80
    threshold_type     = "PERCENTAGE"
    notification_type  = "FORECASTED"
    subscriber_email_addresses = var.alert_emails
  }
}

resource "aws_s3_bucket_lifecycle_rule" "cost_tier" {
  bucket = aws_s3_bucket.storage.id

  transition {
    days          = 30
    storage_class = "INTELLIGENT_TIERING"
  }

  noncurrent_version_transition {
    days          = 60
    storage_class = "GLACIER"
  }

  expiration {
    expired_object_delete_marker = true
  }

  rule {
    id      = "log"
    enabled = true

    transition {
      days          = 90
      storage_class = "GLACIER_IR"
    }

    expiration {
      days = 365
    }
  }
}

resource "aws_autoscaling_policy" "predictive_scaling" {
  name                   = "support-sphere-predictive-scaling"
  autoscaling_group_name = var.eks_asg_name
  policy_type           = "PredictiveScaling"

  predictive_scaling_configuration {
    metric_specification {
      target_value = 70
      predefined_scaling_metric_specification {
        predefined_metric_type = "ASGAverageCPUUtilization"
        resource_label        = "support-sphere"
      }
      predefined_load_metric_specification {
        predefined_metric_type = "ASGTotalCPUUtilization"
        resource_label        = "support-sphere"
      }
    }
    mode                          = "ForecastAndScale"
    scheduling_buffer_time        = 300
    max_capacity_breach_behavior = "IncreaseMaxCapacity"
    max_capacity_buffer         = 10
  }
}
