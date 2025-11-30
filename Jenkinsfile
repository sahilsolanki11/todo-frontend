pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'dev', url: 'https://github.com/sahilsolanki11/todo-frontend.git'
            }
        }

        stage('Build UAT Docker Image') {
            steps {
                script {
                    sh '''
                    rm -f .env
                    echo "REACT_APP_API_URL=http://todo-backend-uat:5000" > .env
                    docker build -t todo-frontend:uat .
                    '''
                }
            }
        }

        stage('Deploy to UAT') {
            steps {
                script {
                    sh '''
                    docker stop todo-frontend-uat || true
                    docker rm todo-frontend-uat || true

                    docker run -d \
                      -p 8081:80 \
                      --name todo-frontend-uat \
                      --network todo-net \
                      todo-frontend:uat
                    '''
                }
            }
        }

        stage('Approval for Production') {
            steps {
                input "✔ UAT looks good? Deploy frontend to Production?"
            }
        }

        stage('Build Production Docker Image') {
            steps {
                script {
                    sh '''
                    rm -f .env
                    echo "REACT_APP_API_URL=http://todo-backend-prod:5000" > .env
                    docker build -t todo-frontend:prod .
                    '''
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    sh '''
                    docker stop todo-frontend-prod || true
                    docker rm todo-frontend-prod || true

                    docker run -d \
                      -p 3000:80 \
                      --name todo-frontend-prod \
                      --network todo-net \
                      todo-frontend:prod
                    '''
                }
            }
        }
    }

    post {
        success { echo "✔ Frontend CI/CD completed successfully!" }
        failure { echo "❌ FRONTEND deployment failed!" }
    }
}
