properties([
    pipelineTriggers([
        GenericTrigger(
            causeString: 'Generic Cause',
            regexpFilterExpression: '',
            regexpFilterText: '',
            token: '71B6B68DFC8C34235B642BE2EBQ12')
        ])
    ])

node(){

    String APP_DIR = "practice-2020/django_backend_practice_2020/"

    stage("CHECKOUT"){
            checkout([$class: 'GitSCM', branches: [[name: '*/master']],
            doGenerateSubmoduleConfigurations: false, 
            extensions: [], 
            submoduleCfg: [], 
            userRemoteConfigs: [[credentialsId: '6838fe0f-1193-43cb-ae85-9dcb497ed2fb',
            url: 'https://github.com/Volektyn/spring-boot']]])
    }
    
    stage(""){

    }
    
    stage("DEPLOY"){

        if (fileExists("practice-2020")){
            dir("practice-2020"){
                deleteDir()
            }
        }

        sh "git clone https://github.com/team-number-15/practice-2020"

        sh "cd ${APP_DIR}"

        // sh 'virtualenv env -p python3.5'
        // sh '. env/bin/activate'
        // sh 'env/bin/pip install -r requirements.txt'


            // DEPLOY TO QA & CI
        sh "ansible-playbook GW/ansible_deploy/deploy-playbook.yml -i GW/ansible_deploy/inventory.ini \
            -l deploy \
            -u ec2-user ${environment_vars} -t simple_deploy"
    }
}