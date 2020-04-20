resource "google_compute_instance" "default" {
  name         = var.var_instance_name
  machine_type = "n1-standard-1"
  zone         = format("%s", "${var.var_region_name}-b")
  tags         = ["ssh", "http"]
  boot_disk {
    initialize_params {
      image = var.var_image
    }
  }

  metadata_startup_script = "yum -y update; yum -y install nginx;export HOSTNAME=$(hostname | tr -d '\n');export PRIVATE_IP=$(curl -sf -H 'Metadata-Flavor:Google' http://metadata/computeMetadata/v1/instance/network-interfaces/0/ip | tr -d '\n');echo \"Welcome to $HOSTNAME - $PRIVATE_IP\" > /usr/share/nginx/www/index.html;service nginx start"

  network_interface {
    subnetwork = var.var_public_subnet 
    access_config {
      // Ephemeral IP
    }
  }
}
