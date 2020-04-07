output "use1_pub_address" { value = google_compute_instance.default.network_interface.0.access_config.0.nat_ip  }

output "use1_pri_address" { value =  google_compute_instance.default.network_interface.0.network_ip }

output "use1_out_public_subnet_name" { value = google_compute_subnetwork.public_subnet.name }