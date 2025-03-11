variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "mongodb_username" {
  description = "MongoDB admin username"
  type        = string
}

variable "mongodb_password" {
  description = "MongoDB admin password"
  type        = string
  sensitive   = true
}

variable "environment" {
  description = "Environment (dev/staging/prod)"
  type        = string
  default     = "dev"
}
