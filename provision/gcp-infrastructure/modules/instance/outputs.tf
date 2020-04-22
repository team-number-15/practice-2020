output "instance_pub_address" { value = google_compute_instance.default.network_interface.0.access_config.0.nat_ip }

output "instance_pri_address" { value = google_compute_instance.default.network_interface.0.network_ip }

