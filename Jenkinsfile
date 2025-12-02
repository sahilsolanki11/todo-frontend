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

        stage('Install Dependencies') {
            steps {
                script {
                    echo "⚙️ Building Frontend UAT Docker Image"
                    // ✅ Corrected API base URL (no /auth)
                    bat '''
                    echo REACT_APP_ENV=uat > .env
                    echo REACT_APP_API_URL=http://todo-backend-uat:5000/api >> .env
                    '''
                    bat 'docker build -t todo-frontend:uat .'
                }
            }
        }

        stage('Create .env') {
            steps {
                script {
                    echo "🚀 Deploying Frontend to UAT (Port 8081)"
                    bat '''
                    docker stop todo-frontend-uat || exit 0
                    docker rm todo-frontend-uat || exit 0
                    docker run -d -p 8081:80 --name todo-frontend-uat --network todo-net todo-frontend:uat
                    '''
                }
            }
        }

        stage('Build Docker Image for UAT') {
            steps {
                sh 'docker build -t todo-frontend:uat .'
            }
        }

        stage('Deploy UAT') {
            steps {
                script {
                    echo "⚙️ Building Frontend Production Docker Image"
                    // ✅ Corrected API base URL (no /auth)
                    bat '''
                    echo REACT_APP_ENV=prod > .env
                    echo REACT_APP_API_URL=http://todo-backend-prod:5000/api >> .env
                    '''
                    bat 'docker build -t todo-frontend:prod .'
                }
            }
        }

        stage('Manual Approval for Production') {
            steps {
                script {
                    echo "🚀 Deploying Frontend to Production (Port 3000)"
                    bat '''
                    docker stop todo-frontend-prod || exit 0
                    docker rm todo-frontend-prod || exit 0
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
