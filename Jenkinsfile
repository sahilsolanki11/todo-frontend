pipeline {
    agent any

    environment {
        REACT_APP_API_URL = credentials('frontend-api-url')  // Jenkins secret
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'dev', url: 'https://github.com/sahilsolanki11/todo-frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Create .env') {
            steps {
                sh """
                echo REACT_APP_API_URL=${REACT_APP_API_URL} > .env
                """
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t todo-frontend:uat .'
            }
        }

        stage('Deploy UAT') {
            steps {
                sh '''
                docker stop todo-frontend-uat || true
                docker rm todo-frontend-uat || true
                docker run -d --name todo-frontend-uat --network todo-net -p 8081:3000 todo-frontend:uat
                '''
            }
        }
    }

    post {
        failure {
            echo '❌ Deployment failed. Check logs!'
        }
    }
}

