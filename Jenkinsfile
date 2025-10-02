pipeline { 
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sahilsolanki11/todo-frontend.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker build -t todo-frontend .'
                }
            }
        }

        stage('Deploy to UAT') {
            steps {
                script {
                    bat """
                    docker stop todo-frontend-uat || exit 0
                    docker rm todo-frontend-uat || exit 0
                    docker run -d -p 8081:80 --name todo-frontend-uat todo-frontend:latest
                    """
                }
            }
        }

        stage('Approval for Production') {
            steps {
                input "UAT testing done? Deploy frontend to Production?"
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    bat """
                    docker stop todo-frontend-prod || exit 0
                    docker rm todo-frontend-prod || exit 0
                    docker run -d -p 3000:80 --name todo-frontend-prod todo-frontend:latest
                    """
                }
            }
        }
    }
}
