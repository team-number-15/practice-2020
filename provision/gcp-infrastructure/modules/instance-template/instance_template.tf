resource "google_compute_instance_template" "default" {
  name_prefix = var.var_template_name_prefix

  tags   = var.var_tags
  labels = var.var_labels

  machine_type = var.var_machine_type

  region = var.var_region

  # script for testing correct provision
  metadata_startup_script = "yum -y update; yum -y install nginx;export HOSTNAME=$(hostname | tr -d '\n');export PRIVATE_IP=$(curl -sf -H 'Metadata-Flavor:Google' http://metadata/computeMetadata/v1/instance/network-interfaces/0/ip | tr -d '\n');echo \"Welcome to $HOSTNAME - $PRIVATE_IP\" > /usr/share/nginx/www/index.html;service nginx start"

  metadata = {
    ssh-keys = "${var.gcp_ssh_user}:${file(var.gcp_ssh_pub_key_file)}"
  }

  disk {
    source_image = var.var_image
    auto_delete  = true
    boot         = true
  }

  network_interface {
    subnetwork = var.var_public_subnet 
    access_config {
      // Ephemeral IP
    }
  }

  lifecycle {
    create_before_destroy = true
  }
}