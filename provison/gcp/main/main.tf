provider "google" {
  project = "${var.var_project}"
  credentials = file("technical-practice-2020-13636bd8f2e4.json")
}

module "vpc" {
  source                  = "../modules/global"
  env                     = "${var.var_env}"
  company                 = "${var.var_company}"
  var_euw3_public_subnet  = "${var.euw3_public_subnet}"
  var_euw3_private_subnet = "${var.euw3_private_subnet}"
  var_use1_public_subnet  = "${var.use1_public_subnet}"
  var_use1_private_subnet = "${var.use1_private_subnet}"
}

module "use1" {
  source                  = "../modules/use1"
  network_self_link       = "${module.vpc.out_vpc_self_link}"
  subnetwork1             = "${module.use1.use1_out_public_subnet_name}" 
  env                     = "${var.var_env}"
  company                 = "${var.var_company}"
  var_use1_public_subnet  = "${var.use1_public_subnet}"
  var_use1_private_subnet = "${var.use1_private_subnet}"
}

module "euw3" {
  source                  = "../modules/euw3"
  network_self_link       = "${module.vpc.out_vpc_self_link}"
  subnetwork1             = "${module.euw3.euw3_out_public_subnet_name}" 
  env                     = "${var.var_env}"
  company                 = "${var.var_company}"
  var_euw3_public_subnet  = "${var.euw3_public_subnet}"
  var_euw3_private_subnet = "${var.euw3_private_subnet}"
}

