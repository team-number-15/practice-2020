// properties([
//     pipelineTriggers([
//         GenericTrigger(
//             causeString: 'Generic Cause',
//             regexpFilterExpression: '',
//             regexpFilterText: '',
//             token: '71B6B68DFC8C34235B642BE2EBQ12')
//         ])
//     ])

node(){

    String APP_DIR = "practice-2020"

    // stage("CHECKOUT"){
    //         checkout([$class: 'GitSCM', branches: [[name: '*/master']],
    //         doGenerateSubmoduleConfigurations: false, 
    //         extensions: [], 
    //         submoduleCfg: [], 
    //         userRemoteConfigs: [[credentialsId: '6838fe0f-1193-43cb-ae85-9dcb497ed2fb',
    //         url: 'https://github.com/Volektyn/spring-boot']]])
    // }
    
    stage("PRE_DEPLOY"){
        if (fileExists(APP_DIR)){
            dir(APP_DIR){
                deleteDir()
            }
        }

        sh "git clone https://github.com/team-number-15/practice-2020"

        sh "cd ${APP_DIR}"
    }
    
    stage("DEPLOY"){
        sh "ansible-playbook  provision/software-provision/practice-playbook.yml -i provision/software-provision/inventory.ini \
            -l deploy \
            -t django_deploy"
    }
}