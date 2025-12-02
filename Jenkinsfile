pipeline {
    agent any

    environment {
        REACT_APP_API_URL = credentials('frontend-api-url') // Your secret in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'dev', url: 'https://github.com/sahilsolanki11/todo-frontend.git'
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

                    // Build Docker image
                    sh 'docker build -t todo-frontend:uat .'
                }
            }
        }

        stage('Deploy UAT') {
            steps {
                script {
                    echo "🚀 Deploying Frontend to UAT (Port 8081)"

                    sh '''
                    docker stop todo-frontend-uat || true
                    docker rm todo-frontend-uat || true
                    docker run -d -p 8081:80 --name todo-frontend-uat --network todo-net todo-frontend:uat
                    '''
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

                    // Build Docker image
                    sh 'docker build -t todo-frontend:prod .'
                }
            }
        }

        stage('Manual Approval & Deploy Production') {
            steps {
                input message: "Approve Deployment to Production?"

                script {
                    echo "🚀 Deploying Frontend to Production (Port 3000)"

                    sh '''
                    docker stop todo-frontend-prod || true
                    docker rm todo-frontend-prod || true
                    docker run -d -p 3000:80 --name todo-frontend-prod --network todo-net todo-frontend:prod
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Frontend pipeline finished successfully!"
        }
        failure {
            echo "❌ Frontend deployment failed!"
        }
    }
}
