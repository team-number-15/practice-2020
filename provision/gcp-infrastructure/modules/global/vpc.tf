resource "google_compute_network" "vpc" {
  name                    = format("%s", "${var.var_company}-${var.var_env}-vpc")
  auto_create_subnetworks = "false"
  routing_mode            = "GLOBAL"
}

resource "google_compute_subnetwork" "euw3_public_subnet" {
  name          = format("%s", "${var.var_company}-${var.var_env}-${var.var_euw3_region_name}-pub-net")
  ip_cidr_range = var.var_euw3_public_subnet_range
  network       = google_compute_network.vpc.name
  region        = var.var_euw3_region_name
}

resource "google_compute_subnetwork" "euw3_private_subnet" {
  name          = format("%s", "${var.var_company}-${var.var_env}-${var.var_euw3_region_name}-pri-net")
  ip_cidr_range = var.var_euw3_private_subnet_range
  network       = google_compute_network.vpc.name
  region        = var.var_euw3_region_name
}

resource "google_compute_subnetwork" "use1_public_subnet" {
  name          = format("%s", "${var.var_company}-${var.var_env}-${var.var_use1_region_name}-pub-net")
  ip_cidr_range = var.var_use1_public_subnet_range
  network       = google_compute_network.vpc.name
  region        = var.var_use1_region_name
}

resource "google_compute_subnetwork" "use1_private_subnet" {
  name          = format("%s", "${var.var_company}-${var.var_env}-${var.var_use1_region_name}-pri-net")
  ip_cidr_range = var.var_use1_private_subnet_range
  network       = google_compute_network.vpc.name
  region        = var.var_use1_region_name
}

resource "google_compute_firewall" "allow-internal" {
  name    = "${var.var_company}-fw-allow-internal"
  network = google_compute_network.vpc.name
  allow {
    protocol = "icmp"
  }
  allow {
    protocol = "tcp"
    ports    = ["0-65535"]
  }
  allow {
    protocol = "udp"
    ports    = ["0-65535"]
  }
  source_ranges = [
    var.var_euw3_private_subnet_range,
    var.var_use1_private_subnet_range,
    var.var_euw3_public_subnet_range,
    var.var_use1_public_subnet_range
  ]
}

resource "google_compute_firewall" "allow-icmp" {
  name    = "${var.var_company}-fw-allow-icmp"
  network = google_compute_network.vpc.name
  allow {
    protocol = "icmp"
  }
  target_tags = ["icmp"]
}

resource "google_compute_firewall" "allow-http" {
  name    = "${var.var_company}-fw-allow-http"
  network = google_compute_network.vpc.name
  allow {
    protocol = "tcp"
    ports    = ["80","8080"]
  }
  target_tags = ["http"]
}

resource "google_compute_firewall" "allow-https" {
  name    = "${var.var_company}-fw-allow-https"
  network = google_compute_network.vpc.name

  allow {
    protocol = "tcp"
    ports    = ["443"]
  }
  target_tags = ["https"]
}

resource "google_compute_firewall" "allow-ssh" {
  name    = "${var.var_company}-fw-allow-ssh"
  network = google_compute_network.vpc.name
  allow {
    protocol = "tcp"
    ports    = ["22"]
  }
  target_tags = ["ssh"]
}
