resource "google_compute_instance_group_manager" "default" {
  name = "instance-group-${var.var_zone}"

  base_instance_name = "django-${var.var_zone}"
  zone               = var.var_zone

  target_size = var.var_instance_number

  version {
    name              = var.var_version_name
    instance_template = var.var_instance_template
  }

  named_port {
    name = "http-port"
    port = 80
  }

  auto_healing_policies {
    health_check      = var.var_health_check
    initial_delay_sec = 50
  }

  update_policy {
    type            = "PROACTIVE"
    minimal_action  = "REPLACE"
    max_surge_fixed = 10
    min_ready_sec   = 60
  }
}