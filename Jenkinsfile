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
                    echo "⚙️ Building Frontend UAT Docker Image"
                    // ✅ Use host.docker.internal for backend access from container
                    bat '''
                    echo REACT_APP_API_URL=http://host.docker.internal:5001/api > .env
                    '''
                    bat 'npm install'
                    bat 'npm run build'
                    bat 'docker build -t todo-frontend:uat .'
                }
            }
        }

        stage('Deploy to UAT') {
            steps {
                script {
                    echo "🚀 Deploying Frontend to UAT (Port 8081)"
                    bat '''
                    docker stop todo-frontend-uat || exit 0
                    docker rm todo-frontend-uat || exit 0
                    docker run -d -p 8081:80 --add-host=host.docker.internal:host-gateway --name todo-frontend-uat todo-frontend:uat
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
                    echo "⚙️ Building Frontend Production Docker Image"
                    bat '''
                    echo REACT_APP_API_URL=http://host.docker.internal:5000/api > .env
                    '''
                    bat 'npm install'
                    bat 'npm run build'
                    bat 'docker build -t todo-frontend:prod .'
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    echo "🚀 Deploying Frontend to Production (Port 3000)"
                    bat '''
                    docker stop todo-frontend-prod || exit 0
                    docker rm todo-frontend-prod || exit 0
                    docker run -d -p 3000:80 --add-host=host.docker.internal:host-gateway --name todo-frontend-prod todo-frontend:prod
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
            echo "❌ Frontend deployment failed!"
        }
    }
}
