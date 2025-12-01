pipeline {
    agent any

    environment {
        REACT_APP_API_URL = credentials('frontend-api-url') // example if you need API URL
        PORT = "3000"
        DOCKER_NETWORK = "todo-net"
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

        stage('Build UAT Docker Image') {
            steps {
                sh '''
                # Generate .env dynamically for UAT
                echo "REACT_APP_API_URL=$REACT_APP_API_URL" > .env
                echo "PORT=$PORT" >> .env

                # Build Docker image
                docker build -t todo-frontend:uat .
                '''
            }
        }

        stage('Deploy UAT') {
            steps {
                sh '''
                docker network inspect $DOCKER_NETWORK || docker network create $DOCKER_NETWORK
                docker stop todo-frontend-uat || true
                docker rm todo-frontend-uat || true
                docker run -d \
                  --name todo-frontend-uat \
                  --network $DOCKER_NETWORK \
                  -e REACT_APP_API_URL="$REACT_APP_API_URL" \
                  -e PORT="$PORT" \
                  -p 8081:3000 \
                  todo-frontend:uat
                '''
            }
        }

        stage('Approval for Production') {
            steps {
                input "Proceed to PRODUCTION deployment?"
            }
        }

        stage('Build Production Docker Image') {
            steps {
                sh '''
                docker tag todo-frontend:prod todo-frontend:previous || true
                echo "REACT_APP_API_URL=$REACT_APP_API_URL" > .env
                echo "PORT=$PORT" >> .env
                docker build -t todo-frontend:prod .
                '''
            }
        }

        stage('Deploy Production') {
            steps {
                sh '''
                docker stop todo-frontend-prod || true
                docker rm todo-frontend-prod || true
                docker run -d \
                  --name todo-frontend-prod \
                  --network $DOCKER_NETWORK \
                  -e REACT_APP_API_URL="$REACT_APP_API_URL" \
                  -e PORT="$PORT" \
                  -p 3000:3000 \
                  todo-frontend:prod
                '''
            }
        }
    }

    post {
        failure {
            echo "❌ Deployment failed. Rolling back Production..."
            sh '''
            docker stop todo-frontend-prod || true
            docker rm todo-frontend-prod || true
            docker run -d \
              --name todo-frontend-prod \
              --network $DOCKER_NETWORK \
              todo-frontend:previous || true
            '''
        }
    }
}
