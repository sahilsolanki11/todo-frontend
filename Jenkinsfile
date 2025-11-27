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
                    echo "⚙️ Generating UAT environment .env file"
                    sh '''
                        rm -f .env

                        echo "REACT_APP_ENV=uat" > .env
                        echo "REACT_APP_API_URL=http://localhost:5001/api" >> .env

                        cat .env

                        echo "⚙️ Building Docker image for UAT"
                        docker build --no-cache -t todo-frontend:uat .
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
    }
}
