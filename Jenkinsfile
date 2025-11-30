pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sahilsolanki11/todo-frontend.git'
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
                    echo "🚀 Deploying Frontend to UAT (Port 8081)"
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
                input "✅ UAT testing done? Deploy frontend to Production?"
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


        stage('Deploy to Production') {
            steps {
                script {
                    echo "🚀 Deploying Frontend Production (Port 3000)"
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
        success {
            echo "✅ Frontend pipeline completed successfully!"
        }
        failure {
            echo "❌ Frontend deployment failed!"
        }
    }
}
