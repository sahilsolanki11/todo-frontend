pipeline {
    agent any

    environment {
        DOCKER_NETWORK = "todo-net"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'dev', url: 'https://github.com/sahilsolanki11/todo-frontend.git'
            }
        }

        stage('Prepare Docker Network') {
            steps {
                sh '''
                    docker network inspect $DOCKER_NETWORK >/dev/null 2>&1 || docker network create $DOCKER_NETWORK
                '''
            }
        }

        stage('Build Frontend UAT Image') {
            steps {
                script {
                    echo "⚙️ Building Frontend UAT Docker Image"

                    def commit = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    sh """
                        docker build \
                            --build-arg REACT_APP_API_URL=http://todo-backend-uat:5000 \
                            --build-arg REACT_APP_ENV=uat \
                            -t todo-frontend:uat-${commit} .
                    """
                }
            }
        }

        stage('Deploy UAT') {
            steps {
                script {
                    def commit = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()

                    sh """
                        docker stop todo-frontend-uat || true
                        docker rm todo-frontend-uat || true
                        docker run -d -p 8081:80 \
                          --name todo-frontend-uat \
                          --network $DOCKER_NETWORK \
                          -e BACKEND_HOST=todo-backend-uat \
                          -e BACKEND_PORT=5000 \
                          todo-frontend:uat-${commit}
                    """
                }
            }
        }

        stage('Manual Approval for Production') {
            steps {
                input message: "✅ Approve Frontend Deployment to Production?"
            }
        }

        stage('Build Frontend Production Image') {
            steps {
                script {
                    echo "⚙️ Building Frontend Production Docker Image"

                    def commit = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()

                    // Backup previous production image for rollback
                    sh "docker tag todo-frontend-prod todo-frontend:prod_previous || true"

                    sh """
                        docker build \
                            --build-arg REACT_APP_API_URL=http://todo-backend-prod:5000 \
                            --build-arg REACT_APP_ENV=prod \
                            -t todo-frontend:prod-${commit} .
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
                        docker run -d -p 3000:80 --name todo-frontend-prod --network $DOCKER_NETWORK todo-frontend:prod-${commit}
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Frontend pipeline finished successfully!"
        }
        failure {
            echo "❌ Frontend deployment failed! Rolling back..."
            sh """
                docker stop todo-frontend-prod || true
                docker rm todo-frontend-prod || true
                docker run -d -p 3000:80 --name todo-frontend-prod --network $DOCKER_NETWORK todo-frontend:prod_previous || true
            """
        }
    }
}
