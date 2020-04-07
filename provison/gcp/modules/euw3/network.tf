resource "google_compute_subnetwork" "public_subnet" {
  name          =  "${format("%s","${var.company}-${var.env}-${var.var_region_name}-pub-net")}"
  ip_cidr_range = "${var.var_euw3_public_subnet}"
  network       = "${var.network_self_link}"
  region        = "${var.var_region_name}"
}

resource "google_compute_subnetwork" "private_subnet" {
  name          =  "${format("%s","${var.company}-${var.env}-${var.var_region_name}-pri-net")}"
  ip_cidr_range = "${var.var_euw3_private_subnet}"
  network      = "${var.network_self_link}"
  region        = "${var.var_region_name}"
}
