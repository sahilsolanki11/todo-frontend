pipeline {
    agent any

    environment {
        REACT_APP_API_URL = credentials('frontend-api-url') // Jenkins secret
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'dev', url: 'https://github.com/sahilsolanki11/todo-frontend.git'
            }
        }

        stage('Prepare Docker Network') {
            steps {
                script {
                    sh '''
                    docker network inspect todo-net >/dev/null 2>&1 || docker network create todo-net
                    '''
                }
            }
        }

        stage('Install Dependencies & Build UAT Docker Image') {
            steps {
                script {
                    echo "⚙️ Building Frontend UAT Docker Image"

                    // Create .env for UAT
                    sh '''
                    echo REACT_APP_ENV=uat > .env
                    echo REACT_APP_API_URL=http://todo-backend-uat:5000/api >> .env
                    '''

                    // Build Docker image tagged with commit SHA
                    def commit = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    sh "docker build -t todo-frontend:uat-${commit} ."
                }
            }
        }

        stage('Deploy UAT') {
            steps {
                script {
                    echo "🚀 Deploying Frontend to UAT (Port 8081)"
                    def commit = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()

                    sh """
                    docker stop todo-frontend-uat || true
                    docker rm todo-frontend-uat || true
                    docker run -d -p 8081:80 --name todo-frontend-uat --network todo-net todo-frontend:uat-${commit}
                    """
                }
            }
        }

        stage('Build Production Docker Image') {
            steps {
                script {
                    echo "⚙️ Building Frontend Production Docker Image"

                    // Create .env for Production
                    sh '''
                    echo REACT_APP_ENV=prod > .env
                    echo REACT_APP_API_URL=http://todo-backend-prod:5000/api >> .env
                    '''

                    def commit = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()

                    // Backup current production image for rollback
                    sh "docker tag todo-frontend-prod todo-frontend:prod_previous || true"

                    // Build new production image
                    sh "docker build -t todo-frontend:prod-${commit} ."
                }
            }
        }

        stage('Manual Approval & Deploy Production') {
            steps {
                input message: "✅ Approve Deployment to Production?"

                script {
                    def commit = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()

                    echo "🚀 Deploying Frontend to Production (Port 3000)"
                    sh """
                    docker stop todo-frontend-prod || true
                    docker rm todo-frontend-prod || true
                    docker run -d -p 3000:80 --name todo-frontend-prod --network todo-net todo-frontend:prod-${commit}
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
            docker run -d -p 3000:80 --name todo-frontend-prod --network todo-net todo-frontend:prod_previous || true
            """
        }
    }
}
