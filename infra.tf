terraform {

  backend "s3" {
    bucket = "my-sites-terraform-remote-state"
    key    = "ea_reset_state"
    region = "us-east-2"
  }

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.7.1"
    }

  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

variable "google_client_secret" {
  type      = string
  sensitive = true
}

module "basic-deployment" {
  source  = "jdevries3133/basic-deployment/kubernetes"
  version = "0.0.9"

  app_name  = "ea-reset"
  container = "jdevries3133/ea_reset:0.0.1"
  domain    = "reset.empacadmusic.org"
  application_port = 3000

  extra_env = {
    GOOGLE_CLIENT_ID            = "440795576070-k76m982r96maq2ct0u2s8guo61ji8so3.apps.googleusercontent.com"
    GOOGLE_CLIENT_SECRET        = var.google_client_secret
    OAUTH_CALLBACK_URI          = "https://reset.empacadmusic.org/auth/google/callback"
    HOMEROOM_TO_STUDENT_MAPPING = file("./students.json")
  }
}

