resource "google_compute_global_address" "balancer-address" {
  name         = var.var_global_lb_ip
  address_type = "EXTERNAL"
}

resource "google_compute_global_forwarding_rule" "default" {
  name       = "global-rule"
  ip_address = google_compute_global_address.balancer-address.address
  target     = google_compute_target_http_proxy.default.self_link
  port_range = "80"
}

resource "google_compute_target_http_proxy" "default" {
  name    = "web-map-proxy"
  url_map = google_compute_url_map.default.self_link
}

# resource "google_compute_target_https_proxy" "default" {
#   name             = "test-proxy"
#   url_map          = google_compute_url_map.default.self_link
#   ssl_certificates = google_compute_ssl_certificate.default.self_link
# }

# resource "google_compute_ssl_certificate" "default" {
#   name        = "my-certificate"
#   private_key = file(var_path_to_private_key) 
#   certificate = file(var_path_to_cert) 
# }

resource "google_compute_url_map" "default" {
  name        = "url-map"
  description = "url-mapping for forwarding http to different regions"

  default_service = google_compute_backend_service.use1-backend.self_link

  host_rule {
    hosts        = ["34.107.200.154"]
    path_matcher = "allpaths"
  }

  path_matcher {
    name = "allpaths"
    default_service = google_compute_backend_service.use1-backend.self_link

    path_rule {
      paths = [format("%s", "/${var.var_zones[0]}"), format("%s", "/${var.var_zones[0]}/*")]
      service = google_compute_backend_service.use1-backend.self_link
    }

    path_rule {
      paths   = [format("%s", "/${var.var_zones[1]}"), format("%s", "/${var.var_zones[1]}/*")]
      service = google_compute_backend_service.euw3-backend.self_link
    }
  }
}

resource "google_compute_backend_service" "use1-backend" {
  name             = "use1-backend"
  protocol         = "HTTP"
  port_name        = "http-port" 
  timeout_sec      = 10
  session_affinity = "NONE"

  backend {
    group = var.var_backend_instance_group["use1-ig"] 
  }

  health_checks = var.var_backend_health_checks 
}

resource "google_compute_backend_service" "euw3-backend" {
  name             = "euw3-backend"
  protocol         = "HTTP"
  port_name        = "http-port" 
  timeout_sec      = 10
  session_affinity = "NONE"

  backend {
    group = var.var_backend_instance_group["euw3-ig"] 
  }

  health_checks = var.var_backend_health_checks 
}
