module "cloudwatch_dashboard" {
  source = "terraform-aws-modules/cloudwatch/aws//modules/dashboard"

  name = "support-sphere-dashboard"
  widgets = [
    {
      type = "metric"
      properties = {
        metrics = [
          ["AWS/EKS", "cluster_failed_node_count", "ClusterName", "support-sphere-cluster"],
          [".", "cluster_node_count", ".", "."]
        ]
        period = 300
        region = var.aws_region
        title  = "EKS Cluster Nodes"
      }
    }
  ]
}

module "prometheus_workspace" {
  source = "terraform-aws-modules/managed-service-prometheus/aws"

  workspace_alias = "support-sphere-prometheus"
  
  alert_manager_definition = <<EOF
alertmanager_config: |
    route:
      receiver: 'sns'
    receivers:
      - name: 'sns'
        sns_configs:
          - topic_arn: ${aws_sns_topic.alerts.arn}
EOF
}

resource "aws_sns_topic" "alerts" {
  name = "support-sphere-alerts"
}

module "grafana_workspace" {
  source = "terraform-aws-modules/managed-service-grafana/aws"

  name                      = "support-sphere-grafana"
  associate_license         = false
  grafana_version          = "9.4"
  vpc_security_group_ids   = [aws_security_group.grafana.id]
  subnet_ids               = var.private_subnet_ids
}
