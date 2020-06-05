variable "var_template_name_prefix" {}

variable "var_tags" {
  type    = list
  default = []
}

variable "var_labels" {
  type    = map
  default = {}
}

variable "var_image" {}

variable "var_machine_type" {}

variable "var_region" {}

variable "var_public_subnet" {}

variable "var_private_subnet" {}

variable "network_self_link" {}

variable "gcp_ssh_user" {}

variable "gcp_ssh_pub_key_file" {}
