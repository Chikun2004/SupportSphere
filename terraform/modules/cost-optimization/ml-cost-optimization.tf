resource "aws_sagemaker_model" "cost_optimizer" {
  name               = "support-sphere-cost-optimizer"
  execution_role_arn = aws_iam_role.sagemaker_execution_role.arn

  primary_container {
    image          = "123456789012.dkr.ecr.us-west-2.amazonaws.com/cost-optimizer:latest"
    model_data_url = "s3://support-sphere-ml-models/cost-optimizer/model.tar.gz"
  }
}

resource "aws_lambda_function" "resource_optimizer" {
  filename         = "resource_optimizer.zip"
  function_name    = "support-sphere-resource-optimizer"
  role            = aws_iam_role.resource_optimizer_role.arn
  handler         = "index.handler"
  runtime         = "python3.9"
  timeout         = 900
  memory_size     = 1024

  environment {
    variables = {
      SAGEMAKER_ENDPOINT = aws_sagemaker_endpoint.cost_predictor.name
      HISTORICAL_DATA_TABLE = aws_dynamodb_table.resource_metrics.name
      OPTIMIZATION_WINDOW = "168" # 7 days in hours
      MIN_CONFIDENCE_SCORE = "0.85"
    }
  }
}

resource "aws_dynamodb_table" "resource_metrics" {
  name           = "support-sphere-resource-metrics"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "resource_id"
  range_key      = "timestamp"

  attribute {
    name = "resource_id"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "N"
  }

  ttl {
    attribute_name = "expiry_time"
    enabled        = true
  }

  point_in_time_recovery {
    enabled = true
  }
}

resource "aws_cloudwatch_metric_alarm" "cost_spike" {
  for_each = {
    compute = { threshold = 200, metric = "CPUUtilization" }
    memory  = { threshold = 85, metric = "MemoryUtilization" }
    storage = { threshold = 90, metric = "DiskUtilization" }
  }

  alarm_name          = "support-sphere-${each.key}-spike"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = each.value.metric
  namespace           = "AWS/ECS"
  period             = "300"
  statistic          = "Average"
  threshold          = each.value.threshold
  alarm_description   = "This metric monitors ${each.key} spikes"
  alarm_actions      = [aws_sns_topic.cost_alerts.arn]

  dimensions = {
    ClusterName = var.eks_cluster_name
    ServiceName = "support-sphere"
  }
}

resource "aws_lambda_function" "cost_anomaly_detector" {
  filename         = "anomaly_detector.zip"
  function_name    = "support-sphere-cost-anomaly-detector"
  role            = aws_iam_role.anomaly_detector_role.arn
  handler         = "index.handler"
  runtime         = "python3.9"
  timeout         = 300

  environment {
    variables = {
      ANOMALY_DETECTION_MODEL = aws_sagemaker_endpoint.anomaly_detector.name
      ALERT_TOPIC = aws_sns_topic.cost_alerts.arn
      CONFIDENCE_THRESHOLD = "0.95"
    }
  }
}

resource "aws_autoscaling_policy" "ml_optimized_scaling" {
  name                   = "support-sphere-ml-scaling"
  autoscaling_group_name = var.eks_asg_name
  policy_type           = "TargetTrackingScaling"

  target_tracking_configuration {
    customized_metric_specification {
      metric_dimension {
        name  = "AutoScalingGroupName"
        value = var.eks_asg_name
      }
      metric_name = "OptimizedTargetValue"
      namespace   = "support-sphere/scaling"
      statistic   = "Average"
    }
    target_value = 70.0
  }
}

resource "aws_s3_bucket_intelligent_tiering_configuration" "deep_archive" {
  bucket = aws_s3_bucket.storage.id
  name   = "DeepArchive"

  tiering {
    access_tier = "DEEP_ARCHIVE_ACCESS"
    days        = 180
  }

  tiering {
    access_tier = "ARCHIVE_ACCESS"
    days        = 90
  }
}
