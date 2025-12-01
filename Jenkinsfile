pipeline {
    agent any

    environment {
        DOCKER_NETWORK = "todo-net"

        // Backend URLs running in Docker
        BACKEND_UAT_URL  = "http://172.30.31.245:5001"
        BACKEND_PROD_URL = "http://172.30.31.245:5000"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'dev', url: 'https://github.com/sahilsolanki11/todo-frontend.git'
            }
        }

        stage('Build UAT Docker Image') {
            steps {
                sh '''
                echo "🔧 Creating .env for UAT build..."
                rm -f .env
                echo "REACT_APP_API_URL=$BACKEND_UAT_URL" > .env

                echo "🏗 Building UAT Docker Image..."
                docker build -t todo-frontend:uat .
                '''
            }
        }

        stage('Deploy UAT') {
            steps {
                sh '''
                echo "🔧 Ensuring network exists..."
                docker network inspect $DOCKER_NETWORK || docker network create $DOCKER_NETWORK

                echo "🚀 Deploying UAT container..."
                docker stop todo-frontend-uat || true
                docker rm todo-frontend-uat || true

                docker run -d \
                    -p 8081:80 \
                    --name todo-frontend-uat \
                    --network $DOCKER_NETWORK \
                    todo-frontend:uat
                '''
            }
        }

        stage('Approval for Production') {
            steps {
                input "✔ UAT looks good? Deploy FRONTEND to Production?"
            }
        }

        stage('Build Production Docker Image') {
            steps {
                sh '''
                echo "🔧 Creating .env for Production build..."
                rm -f .env
                echo "REACT_APP_API_URL=$BACKEND_PROD_URL" > .env

                echo "🏗 Building Production Docker Image..."
                docker build -t todo-frontend:prod .
                '''
            }
        }

        stage('Deploy Production') {
            steps {
                sh '''
                echo "🚀 Deploying Production container..."
                docker stop todo-frontend-prod || true
                docker rm todo-frontend-prod || true

                docker run -d \
                    -p 3000:80 \
                    --name todo-frontend-prod \
                    --network $DOCKER_NETWORK \
                    todo-frontend:prod
                '''
            }
        }
    }

    post {
        success { echo "✔ FRONTEND CI/CD completed successfully!" }
        failure { echo "❌ FRONTEND deployment failed!" }
    }
}
