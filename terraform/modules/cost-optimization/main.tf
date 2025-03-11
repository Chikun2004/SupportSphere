resource "aws_budgets_budget" "cost_budget" {
  name              = "support-sphere-monthly-budget"
  budget_type       = "COST"
  limit_amount      = var.monthly_budget_limit
  limit_unit        = "USD"
  time_period_start = "2025-01-01_00:00"
  time_unit         = "MONTHLY"

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 80
    threshold_type            = "PERCENTAGE"
    notification_type         = "ACTUAL"
    subscriber_email_addresses = var.alert_emails
  }

  cost_filters = {
    TagKeyValue = "project$support-sphere"
  }
}

resource "aws_autoscaling_schedule" "scale_down" {
  scheduled_action_name  = "scale-down-night"
  min_size              = 1
  max_size              = 2
  desired_capacity      = 1
  recurrence           = "0 20 * * *"
  autoscaling_group_name = var.eks_asg_name
}

resource "aws_autoscaling_schedule" "scale_up" {
  scheduled_action_name  = "scale-up-morning"
  min_size              = 2
  max_size              = 5
  desired_capacity      = 3
  recurrence           = "0 8 * * *"
  autoscaling_group_name = var.eks_asg_name
}

module "aws_cost_explorer" {
  source = "terraform-aws-modules/cost-explorer/aws"

  cost_explorer_enabled = true
  tags = {
    Project = "support-sphere"
  }
}
