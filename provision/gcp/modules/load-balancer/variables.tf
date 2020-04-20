variable "var_global_lb_ip" {
  default = "global-external-lb-ip"
}

variable "var_path_to_private_key" { default = "" }

variable "var_path_to_cert" { default = "" }

variable "var_zones" {
  type    = list
  default = ["south-carolina", "frankfurt"]
}

variable "var_backend_instance_group" {
  type = map
  default = {
    use1-ig = null
    euw3-ig = null
  }
} 

variable "var_backend_health_checks" {
  type = list
}