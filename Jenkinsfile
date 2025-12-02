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
                sh 'npm install'
            }
        }

        stage('Create .env') {
            steps {
                sh '''
                    echo REACT_APP_API_URL=$REACT_APP_API_URL > .env
                '''
            }
        }

        stage('Build Docker Image for UAT') {
            steps {
                sh 'docker build -t todo-frontend:uat .'
            }
        }

        stage('Deploy UAT') {
            steps {
                sh '''
                    docker stop todo-frontend-uat || true
                    docker rm todo-frontend-uat || true
                    docker run -d --name todo-frontend-uat --network todo-net -p 8081:80 todo-frontend:uat
                '''
            }
        }

        stage('Manual Approval for Production') {
            steps {
                input message: 'Do you want to proceed to Production?', ok: 'Deploy'
            }
        }

        stage('Build Docker Image for Production') {
            steps {
                sh 'docker build -t todo-frontend:prod .'
            }
        }

        stage('Deploy Production') {
            steps {
                sh '''
                    docker stop todo-frontend-prod || true
                    docker rm todo-frontend-prod || true
                    docker run -d --name todo-frontend-prod --network todo-net -p 3000:3000 todo-frontend:prod
                '''
            }
        }
    }
}

