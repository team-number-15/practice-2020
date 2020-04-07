######################################################################
# Display Output Public Instance
######################################################################
output "euw3_public_address" { value = "${module.euw3.instance_pub_address}" }

output "euw3_private_address" { value = "${module.euw3.instance_pri_address}" }

output "use1_public_address" { value = "${module.use1.instance_pub_address}" }

output "use1_private_address" { value = "${module.use1.instance_pri_address}" }

output "vpc_self_link" { value = "${module.vpc.out_vpc_self_link}" }
