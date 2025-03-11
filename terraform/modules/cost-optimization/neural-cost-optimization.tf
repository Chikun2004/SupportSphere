resource "aws_sagemaker_endpoint_configuration" "neural_optimizer" {
  name = "support-sphere-neural-optimizer"

  production_variants {
    variant_name           = "neural-cost-v1"
    model_name            = aws_sagemaker_model.neural_cost_model.name
    initial_instance_count = 1
    instance_type         = "ml.c5.xlarge"
    
    serverless_config {
      max_concurrency = 50
      memory_size_in_mb = 4096
    }
  }

  async_inference_config {
    output_config {
      s3_output_path = "s3://support-sphere-ml/predictions/"
      notification_config {
        success_topic = aws_sns_topic.ml_notifications.arn
        error_topic   = aws_sns_topic.ml_notifications.arn
      }
    }
  }
}

resource "aws_lambda_function" "neural_cost_optimizer" {
  filename         = "neural_optimizer.zip"
  function_name    = "support-sphere-neural-optimizer"
  role            = aws_iam_role.neural_optimizer_role.arn
  handler         = "index.handler"
  runtime         = "python3.9"
  timeout         = 900
  memory_size     = 2048

  environment {
    variables = {
      SAGEMAKER_ENDPOINT = aws_sagemaker_endpoint.neural_optimizer.name
      TRAINING_DATA_BUCKET = aws_s3_bucket.ml_training.id
      MODEL_VERSION = "v2.0"
      MIN_CONFIDENCE = "0.90"
      OPTIMIZATION_INTERVAL = "300"
    }
  }
}

resource "aws_cloudwatch_metric_alarm" "neural_cost_alert" {
  alarm_name          = "neural-cost-optimization-alert"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "PredictionError"
  namespace           = "SupportSphere/NeuralOptimizer"
  period             = "300"
  statistic          = "Average"
  threshold          = "0.15"
  alarm_description   = "Neural cost optimization accuracy degradation"
  alarm_actions      = [aws_sns_topic.ml_alerts.arn]
}

resource "aws_autoscaling_policy" "neural_scaling" {
  name                   = "support-sphere-neural-scaling"
  autoscaling_group_name = var.eks_asg_name
  policy_type           = "PredictiveScaling"

  predictive_scaling_configuration {
    metric_specification {
      target_value = 70
      customized_capacity_metric_specification {
        metric_data_queries {
          id = "neural_prediction"
          expression = "SELECT AVG(prediction) FROM neural_cost_predictions"
          period = "300"
          return_data = true
        }
      }
      customized_load_metric_specification {
        metric_data_queries {
          id = "actual_load"
          metric_stat {
            metric {
              namespace = "AWS/ApplicationELB"
              metric_name = "RequestCount"
            }
            stat = "Sum"
            unit = "Count"
          }
          period = "300"
          return_data = true
        }
      }
    }
    mode = "ForecastAndScale"
    scheduling_buffer_time = 300
  }
}

resource "aws_dynamodb_table" "cost_predictions" {
  name           = "support-sphere-cost-predictions"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "prediction_id"
  range_key      = "timestamp"

  attribute {
    name = "prediction_id"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "N"
  }

  attribute {
    name = "accuracy"
    type = "N"
  }

  global_secondary_index {
    name               = "AccuracyIndex"
    hash_key           = "accuracy"
    range_key          = "timestamp"
    projection_type    = "ALL"
  }

  ttl {
    attribute_name = "expiry_time"
    enabled        = true
  }

  point_in_time_recovery {
    enabled = true
  }

  server_side_encryption {
    enabled = true
  }
}

resource "aws_lambda_function" "cost_feedback_loop" {
  filename         = "feedback_loop.zip"
  function_name    = "support-sphere-cost-feedback"
  role            = aws_iam_role.feedback_loop_role.arn
  handler         = "index.handler"
  runtime         = "python3.9"
  timeout         = 600

  environment {
    variables = {
      PREDICTIONS_TABLE = aws_dynamodb_table.cost_predictions.name
      TRAINING_BUCKET = aws_s3_bucket.ml_training.id
      RETRAIN_THRESHOLD = "0.85"
      FEEDBACK_WINDOW = "168" # 7 days in hours
    }
  }
}
