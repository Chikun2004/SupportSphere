resource "aws_budgets_budget" "detailed_budget" {
  name              = "support-sphere-detailed-budget"
  budget_type       = "COST"
  limit_amount      = var.monthly_budget_limit
  limit_unit        = "USD"
  time_period_start = "2025-01-01_00:00"
  time_unit         = "MONTHLY"

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 60
    threshold_type            = "PERCENTAGE"
    notification_type         = "FORECASTED"
    subscriber_email_addresses = var.alert_emails
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 80
    threshold_type            = "PERCENTAGE"
    notification_type         = "ACTUAL"
    subscriber_email_addresses = var.alert_emails
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type            = "PERCENTAGE"
    notification_type         = "ACTUAL"
    subscriber_email_addresses = concat(var.alert_emails, var.emergency_contacts)
  }

  cost_filters = {
    TagKeyValue = "project$support-sphere"
  }
}

resource "aws_autoscaling_policy" "target_tracking" {
  name                   = "target-tracking-policy"
  autoscaling_group_name = var.eks_asg_name
  policy_type           = "TargetTrackingScaling"

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }
    target_value = 70.0
  }
}

resource "aws_dlm_lifecycle_policy" "ebs_snapshot" {
  description        = "Support Sphere EBS snapshot policy"
  execution_role_arn = aws_iam_role.dlm_lifecycle_role.arn
  state             = "ENABLED"

  policy_details {
    resource_types = ["VOLUME"]

    schedule {
      name = "2 weeks of daily snapshots"
      
      create_rule {
        interval      = 24
        interval_unit = "HOURS"
        times        = ["23:45"]
      }

      retain_rule {
        count = 14
      }

      tags_to_add = {
        SnapshotCreator = "DLM"
        Project         = "support-sphere"
      }

      copy_tags = true
    }

    target_tags = {
      Backup = "true"
      Project = "support-sphere"
    }
  }
}

resource "aws_s3_lifecycle_rule" "backup_lifecycle" {
  bucket = aws_s3_bucket.backups.id

  prefix = "backups/"

  transition {
    days          = 30
    storage_class = "STANDARD_IA"
  }

  transition {
    days          = 60
    storage_class = "GLACIER"
  }

  expiration {
    days = 365
  }
}
