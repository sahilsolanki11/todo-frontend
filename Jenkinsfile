pipeline {
    agent any

    environment {
        REACT_APP_API_URL_UAT  = credentials('frontend_api_url_uat')
        REACT_APP_API_URL_PROD = credentials('frontend_api_url_prod')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sahilsolanki11/todo-frontend.git'
            }
        }

        stage('Prepare .env for UAT') {
            steps {
                script {
                    sh """
                    echo "REACT_APP_ENV=uat" > .env
                    echo "REACT_APP_API_URL=${REACT_APP_API_URL_UAT}" >> .env
                    """
                }
            }
        }

        stage('Build UAT Docker Image') {
            steps {
                script {
                    echo "⚙️ Building Frontend UAT Docker Image"
                    sh 'docker build -t todo-frontend:uat .'
                }
            }
        }

        stage('Deploy to UAT') {
            steps {
                script {
                    echo "🚀 Deploying Frontend to UAT"
                    sh """
                    docker stop todo-frontend-uat || true
                    docker rm todo-frontend-uat || true
                    docker run -d \
                      --name todo-frontend-uat \
                      --network todo-net \
                      -p 8081:80 \
                      todo-frontend:uat
                    """
                }
            }
        }

        stage('Approval for Production') {
            steps {
                input "✅ UAT testing done? Deploy frontend to Production?"
            }
        }

        stage('Prepare .env for Prod') {
            steps {
                script {
                    sh """
                    echo "REACT_APP_ENV=prod" > .env
                    echo "REACT_APP_API_URL=${REACT_APP_API_URL_PROD}" >> .env
                    """
                }
            }
        }

        stage('Build Production Docker Image') {
            steps {
                script {
                    echo "⚙️ Building Frontend Production Docker Image"
                    sh 'docker build -t todo-frontend:prod .'
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    echo "🚀 Deploying Frontend Production"
                    sh """
                    docker stop todo-frontend-prod || true
                    docker rm todo-frontend-prod || true
                    docker run -d \
                      --name todo-frontend-prod \
                      --network todo-net \
                      -p 3000:80 \
                      todo-frontend:prod
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Frontend pipeline completed successfully!"
        }
        failure {
            echo "❌ Frontend deployment failed!"
        }
    }
}
