pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'your-registry'
        DOCKER_CREDENTIALS = credentials('docker-cred-id')
        KUBERNETES_CONFIG = credentials('kubernetes-config')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            parallel {
                stage('Server Tests') {
                    steps {
                        dir('server') {
                            sh 'npm install'
                            sh 'npm test'
                        }
                    }
                }
                stage('Client Tests') {
                    steps {
                        dir('client') {
                            sh 'npm install'
                            sh 'npm test'
                        }
                    }
                }
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build Server') {
                    steps {
                        dir('server') {
                            sh "docker build -t ${DOCKER_REGISTRY}/support-sphere-server:${BUILD_NUMBER} ."
                        }
                    }
                }
                stage('Build Client') {
                    steps {
                        dir('client') {
                            sh "docker build -t ${DOCKER_REGISTRY}/support-sphere-client:${BUILD_NUMBER} ."
                        }
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                sh "docker login -u ${DOCKER_CREDENTIALS_USR} -p ${DOCKER_CREDENTIALS_PSW} ${DOCKER_REGISTRY}"
                sh "docker push ${DOCKER_REGISTRY}/support-sphere-server:${BUILD_NUMBER}"
                sh "docker push ${DOCKER_REGISTRY}/support-sphere-client:${BUILD_NUMBER}"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh "kubectl --kubeconfig=${KUBERNETES_CONFIG} apply -f k8s/"
                sh "kubectl --kubeconfig=${KUBERNETES_CONFIG} set image deployment/support-sphere-server server=${DOCKER_REGISTRY}/support-sphere-server:${BUILD_NUMBER}"
                sh "kubectl --kubeconfig=${KUBERNETES_CONFIG} set image deployment/support-sphere-client client=${DOCKER_REGISTRY}/support-sphere-client:${BUILD_NUMBER}"
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                sh 'ansible-playbook -i ansible/inventory.yml ansible/site.yml'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
