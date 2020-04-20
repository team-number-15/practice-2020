######################################################################
# Display Output Public Instance
######################################################################
output "mysql_public_address" { value = module.mysql.instance_pub_address }

output "mysql_private_address" { value = module.mysql.instance_pri_address }

output "CD_public_address" { value = module.CD.instance_pub_address }

output "CD_private_address" { value = module.CD.instance_pri_address }

output "vpc_self_link" { value = module.vpc.out_vpc_self_link }
