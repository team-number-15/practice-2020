variable "var_project" {
  default = "technical-practice-2020"
}

variable "var_env" {
  default = "dev"
}

variable "var_company" {
  default = "team-15"
}

variable "euw3_private_subnet_range" {
  default = "10.26.1.0/24"
}

variable "euw3_public_subnet_range" {
  default = "10.26.2.0/24"
}

variable "use1_private_subnet_range" {
  default = "10.26.3.0/24"
}

variable "use1_public_subnet_range" {
  default = "10.26.4.0/24"
}

variable "gcp_ssh_user" {
  default = "valentain_sav99_gmail_com"
}

variable "gcp_ssh_pub_key_file" {
  default = "gcp_ce.pub"
}