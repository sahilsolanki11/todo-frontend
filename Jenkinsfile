pipeline {
    agent any

    stages {

        stage('Clean Workspace') {
            steps { cleanWs() }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'dev', url: 'https://github.com/sahilsolanki11/todo-frontend.git'
            }
        }

        stage('Prepare Docker Network') {
            steps {
                sh '''
                docker network inspect todo-net >/dev/null 2>&1 || docker network create todo-net
                '''
            }
        }

        stage('Build Frontend UAT Image') {
            steps {
                script {
                    def commit = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()

                    sh """
                    echo BACKEND_URL=http://todo-backend-uat:5000 > .env
                    """

                    sh "docker build --no-cache -t todo-frontend:uat-${commit} ."
                }
            }
        }

        stage('Deploy Frontend UAT') {
            steps {
                script {
                    def commit = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()

                    sh """
                    docker stop todo-frontend-uat || true
                    docker rm todo-frontend-uat || true

                    docker run -d -p 8081:80 \
                        --name todo-frontend-uat \
                        --network todo-net \
                        -e BACKEND_URL=http://todo-backend-uat:5000 \
                        todo-frontend:uat-${commit}
                    """
                }
            }
        }

        stage('Approval for Production') {
            steps {
                input message: "Deploy frontend to PRODUCTION?"
            }
        }

        stage('Build Frontend Production Image') {
            steps {
                script {
                    def commit = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()

                    sh """
                    echo BACKEND_URL=http://todo-backend-prod:5000 > .env
                    """

                    sh """
                    docker tag todo-frontend:prod todo-frontend:previous || true
                    docker build --no-cache -t todo-frontend:prod-${commit} .
                    """
                }
            }
        }

        stage('Deploy Frontend Production') {
            steps {
                script {
                    def commit = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()

                    sh """
                    docker stop todo-frontend-prod || true
                    docker rm todo-frontend-prod || true

                    docker run -d -p 3000:80 \
                        --name todo-frontend-prod \
                        --network todo-net \
                        -e BACKEND_URL=http://todo-backend-prod:5000 \
                        todo-frontend:prod-${commit}
                    """
                }
            }
        }
    }

    post {
        failure {
            echo "❌ Frontend failed — rolling back!"
            sh """
            docker stop todo-frontend-prod || true
            docker rm todo-frontend-prod || true
            docker run -d -p 3000:80 --name todo-frontend-prod --network todo-net todo-frontend:previous || true
            """
        }
    }
}
