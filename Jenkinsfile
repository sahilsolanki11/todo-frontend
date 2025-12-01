pipeline {
    agent any

    environment {
        REACT_APP_API_URL = credentials('frontend-api-url') // Jenkins credentials ID
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
                echo REACT_APP_API_URL=$REACT_APP_API_URL > .env
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
                sh """
                docker stop todo-frontend-uat || true
                docker rm todo-frontend-uat || true
                docker run -d --name todo-frontend-uat --network todo-net -p 8081:80 todo-frontend:uat
                """
            }
        }

        stage('Deploy PROD') {
            when {
                branch 'main'
            }
            steps {
                sh """
                docker stop todo-frontend-prod || true
                docker rm todo-frontend-prod || true
                docker run -d --name todo-frontend-prod --network todo-net -p 3000:80 todo-frontend:uat
                """
            }
        }
    }

    post {
        success {
            echo '✅ Frontend deployed successfully!'
        }
        failure {
            echo '❌ Frontend deployment failed!'
        }
    }
}
