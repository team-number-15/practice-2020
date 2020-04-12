resource "google_compute_global_address" "balancer-address" {
  name = var.var_global_lb_ip 
  address_type = "EXTERNAL"
}

resource "google_compute_global_forwarding_rule" "default" {
  name       = "global-rule"
  ip_address = google_compute_global_address.balancer-address.self_link
  target     = google_compute_target_https_proxy.default.self_link
  port_range = "443"
}

resource "google_compute_target_https_proxy" "default" {
  name             = "test-proxy"
  url_map          = google_compute_url_map.default.self_link
  ssl_certificates = google_compute_ssl_certificate.default.self_link
}

resource "google_compute_ssl_certificate" "default" {
  name        = "my-certificate"
  private_key = file(var_path_to_private_key) # generate cert and change var
  certificate = file(var_path_to_cert) # generate and change var
}

resource "google_compute_url_map" "default" {
  name        = "url-map"
  description = "url-mapping for forwarding http to different regions"

  #default_service = google_compute_backend_service.default.self_link

  host_rule {
    hosts        = ["*"]
    path_matcher = "allpaths"
  }

  path_matcher {
    name            = "allpaths"
    #default_service = google_compute_backend_service.default.self_link

    path_rule {
      paths   = format("%s","/${var.zones[0]}/*")
      #service = google_compute_backend_service.default.self_link
      service = google_compute_backend_service.use1.self_link
    }

    path_rule {
      paths = format("%s","/${var.zones[1]}/*")
      service = google_compute_backend_service.euw3.self_link
    }
  }
}

resource "google_compute_backend_service" "use1-backend" {
  name          = "use1-backend-service"
  health_checks = [google_compute_http_health_check.default.self_link]
}

resource "google_compute_backend_service" "euw3-backend" {
  name          = "euw3-backend-service"
  health_checks = [google_compute_http_health_check.default.self_link]
}

resource "google_compute_http_health_check" "default" {
  name               = "health-check"
  request_path       = "/"
  check_interval_sec = 5
  timeout_sec        = 10
  port = 80
  unhealthy_threshold = 3
}
