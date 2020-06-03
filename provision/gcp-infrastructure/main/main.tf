provider "google" {
  project     = var.var_project
  credentials = file("technical-practice-2020-13636bd8f2e4.json")
}

module "vpc" {
  source      = "../modules/global"
  var_env     = var.var_env
  var_company = var.var_company

  var_euw3_region_name = "europe-west3"
  var_use1_region_name = "us-east1"

  var_euw3_public_subnet_range  = var.euw3_public_subnet_range
  var_euw3_private_subnet_range = var.euw3_private_subnet_range
  var_use1_public_subnet_range  = var.use1_public_subnet_range
  var_use1_private_subnet_range = var.use1_private_subnet_range
}

module "http-load-balancer" {
  source = "../modules/load-balancer"

  var_global_lb_ip = "global-external-lb-ip"

  var_zones = ["south-carolina", "frankfurt"]

  var_backend_instance_group = {
    use1-ig = module.instance-group-us-east1.instance_group
    euw3-ig = module.instance-group-europe-west3.instance_group
  }

  var_backend_health_checks = [google_compute_http_health_check.http-check.self_link]
}

module "instance-group-us-east1" {
  source = "../modules/instance-group"

  var_zone              = "us-east1-b"
  var_health_check      = google_compute_http_health_check.http-check.self_link
  var_version_name      = "south_carolina_v1"
  var_instance_template = module.use1-django-server-instance-template.self_link
  var_instance_number   = 1
}

module "instance-group-europe-west3" {
  source = "../modules/instance-group"

  var_zone              = "europe-west3-b"
  var_health_check      = google_compute_http_health_check.http-check.self_link
  var_version_name      = "south_carolina_v1"
  var_instance_template = module.euw3-django-server-instance-template.self_link
  var_instance_number   = 1
}

module "use1-django-server-instance-template" {
  source = "../modules/instance-template"

  var_template_name_prefix = "use1-django-"
  var_machine_type         = "n1-standard-1"
  var_region               = "us-east1"
  var_tags                 = ["ssh", "http"]
  var_image                = "centos-cloud/centos-7"


  network_self_link  = module.vpc.out_vpc_self_link
  var_public_subnet  = module.vpc.out_use1_public_subnet  
  var_private_subnet = module.vpc.out_use1_private_subnet 

  gcp_ssh_user = var.gcp_ssh_user
  gcp_ssh_pub_key_file = var.gcp_ssh_pub_key_file
}

module "euw3-django-server-instance-template" {
  source = "../modules/instance-template"

  var_template_name_prefix = "euw3-django-"
  var_machine_type         = "n1-standard-1"
  var_region               = "europe-west3"
  var_tags                 = ["ssh", "http"]
  var_image                = "centos-cloud/centos-7"

  network_self_link  = module.vpc.out_vpc_self_link
  var_public_subnet  = module.vpc.out_euw3_public_subnet  
  var_private_subnet = module.vpc.out_euw3_private_subnet 

  gcp_ssh_user = var.gcp_ssh_user
  gcp_ssh_pub_key_file = var.gcp_ssh_pub_key_file
}

# continious delivery server 
module "CD" {
  source            = "../modules/instance"
  var_instance_name = "use1-cd-instance-1"
  network_self_link = module.vpc.out_vpc_self_link
  env                = var.var_env
  company            = var.var_company
  var_region_name    = "us-east1"
  var_public_subnet  = module.vpc.out_use1_public_subnet  
  var_private_subnet = module.vpc.out_use1_private_subnet 
  var_image          = "centos-cloud/centos-7"
  instance_number    = 1

  gcp_ssh_user = var.gcp_ssh_user
  gcp_ssh_pub_key_file = var.gcp_ssh_pub_key_file
}

# database server 
module "mysql" {
  source            = "../modules/instance"
  var_instance_name = "euw3-mysql-instance-1"
  network_self_link = module.vpc.out_vpc_self_link
  env                = var.var_env
  company            = var.var_company
  var_region_name    = "europe-west3"
  var_public_subnet  = module.vpc.out_euw3_public_subnet  
  var_private_subnet = module.vpc.out_euw3_private_subnet 
  var_image          = "centos-cloud/centos-7"
  instance_number    = 1

  gcp_ssh_user = var.gcp_ssh_user
  gcp_ssh_pub_key_file = var.gcp_ssh_pub_key_file
}


resource "google_compute_http_health_check" "http-check" {
  name                = "http-health-check"
  request_path        = "/"
  check_interval_sec  = 20
  timeout_sec         = 15
  port                = 80
  unhealthy_threshold = 3
}

