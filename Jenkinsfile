pipeline {
    agent any

    environment {
        DOCKER_NETWORK = "todo-net"
        BACKEND_UAT_URL = "http://<your-server-ip>:5001"   // replace <your-server-ip> with your server IP for browser access
        BACKEND_PROD_URL = "http://<your-server-ip>:5000"
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
                rm -f .env
                echo "REACT_APP_API_URL=$BACKEND_UAT_URL" > .env
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
                  -p 8081:80 \
                  --name todo-frontend-uat \
                  --network $DOCKER_NETWORK \
                  todo-frontend:uat
                '''
            }
        }

        stage('Approval for Production') {
            steps {
                input "✔ UAT looks good? Deploy frontend to Production?"
            }
        }

        stage('Build Production Docker Image') {
            steps {
                sh '''
                rm -f .env
                echo "REACT_APP_API_URL=$BACKEND_PROD_URL" > .env
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
                  -p 3000:80 \
                  --name todo-frontend-prod \
                  --network $DOCKER_NETWORK \
                  todo-frontend:prod
                '''
            }
        }
    }

    post {
        success { echo "✔ Frontend CI/CD completed successfully!" }
        failure { echo "❌ Frontend deployment failed!" }
    }
}
