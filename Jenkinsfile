pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sahilsolanki11/todo-frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build UAT Docker Image') {
            steps {
                script {
                    bat '''
                    REM Use UAT API URL
                    echo REACT_APP_API_URL=http://localhost:5001 > .env
                    npm run build
                    docker build -t todo-frontend:uat .
                    '''
                }
            }
        }

        stage('Deploy to UAT') {
            steps {
                script {
                    bat '''
                    docker stop todo-frontend-uat || exit 0
                    docker rm todo-frontend-uat || exit 0
                    docker run -d -p 8081:80 --name todo-frontend-uat todo-frontend:uat
                    '''
                }
            }
        }

        stage('Approval for Production') {
            steps {
                input "✅ UAT testing done? Deploy frontend to Production?"
            }
        }

        stage('Build Production Docker Image') {
            steps {
                script {
                    bat '''
                    REM Use Production API URL
                    echo REACT_APP_API_URL=http://localhost:5000 > .env
                    npm run build
                    docker build -t todo-frontend:prod .
                    '''
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    bat '''
                    docker commit todo-frontend-prod todo-frontend:previous || exit 0
                    docker stop todo-frontend-prod || exit 0
                    docker rm todo-frontend-prod || exit 0
                    docker run -d -p 3000:80 --name todo-frontend-prod todo-frontend:prod
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Frontend pipeline finished successfully!"
        }
        failure {
            echo "❌ Frontend deployment failed! Rolling back..."
            script {
                bat '''
                docker stop todo-frontend-prod || exit 0
                docker rm todo-frontend-prod || exit 0
                docker run -d -p 3000:80 --name todo-frontend-prod todo-frontend:previous || exit 0
                '''
            }
        }
    }
}
