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

        stage('Deploy Container') {
            steps {
                script {
                    bat '''
                    docker stop todo-frontend || exit 0
                    docker rm todo-frontend || exit 0
                    docker run -d -p 3000:80 --name todo-frontend todo-frontend
                    '''
                }
            }
        }
    }
}
