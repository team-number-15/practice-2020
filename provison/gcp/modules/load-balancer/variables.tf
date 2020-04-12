variable "var_global_lb_ip" {
    default = "global-external-lb-ip"
}

variable "var_path_to_private_key" { }

variable "var_path_to_cert" { }

variable "zones" { 
    type = list
    default = ["south-carolina", "frankfurt"]
}