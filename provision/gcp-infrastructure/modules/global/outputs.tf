output "out_vpc_self_link" { value = google_compute_network.vpc.name }

output "out_euw3_public_subnet" { value = google_compute_subnetwork.euw3_public_subnet.name }

output "out_euw3_private_subnet" { value = google_compute_subnetwork.euw3_private_subnet.name }

output "out_use1_public_subnet" { value = google_compute_subnetwork.use1_public_subnet.name }

output "out_use1_private_subnet" { value = google_compute_subnetwork.use1_private_subnet.name }