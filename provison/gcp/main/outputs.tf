######################################################################
# Display Output Public Instance
######################################################################
output "euw3_public_address" { value = "${module.euw3.euw3_pub_address}" }

output "euw3_private_address" { value = "${module.euw3.euw3_pri_address}" }

output "use1_public_address" { value = "${module.use1.use1_pub_address}" }

output "use1_private_address" { value = "${module.use1.use1_pri_address}" }

output "vpc_self_link" { value = "${module.vpc.out_vpc_self_link}" }
