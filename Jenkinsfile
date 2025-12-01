pipeline {
    agent any

    environment {
        REACT_APP_API_URL = credentials('frontend-api-url')  // use Jenkins credentials
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'dev', url: 'https://github.com/sahilsolanki11/todo-frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                node {
                    sh 'npm install'
                }
            }
        }

        stage('Create .env') {
            steps {
                node {
                    sh """
                    echo REACT_APP_API_URL=${REACT_APP_API_URL} > .env
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                node {
                    sh 'docker build -t todo-frontend:uat .'
                }
            }
        }

        stage('Deploy UAT') {
            steps {
                node {
                    sh 'docker stop todo-frontend-uat || true'
                    sh 'docker rm todo-frontend-uat || true'
                    sh 'docker run -d --name todo-frontend-uat --network todo-net -p 8081:3000 todo-frontend:uat'
                }
            }
        }
    }

    post {
        failure {
            node {
                echo '❌ Deployment failed. Check logs!'
            }
        }
    }
}
