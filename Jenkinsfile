pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'dev', url: 'https://github.com/sahilsolanki11/todo-frontend.git'
            }
        }

        stage('Create .env for UAT') {
            steps {
                script {
                    echo "⚙️ Creating UAT .env"

                    sh '''
                        rm -f .env
                        echo "REACT_APP_ENV=uat" > .env
                        echo "REACT_APP_API_URL=http://todo-backend-uat:5000/api" >> .env

                        echo "------ USING THIS .env ------"
                        cat .env
                        echo "------------------------------"
                    '''
                }
            }
        }

        stage('Build UAT Docker Image') {
            steps {
                script {
                    sh '''
                        docker build --no-cache -t todo-frontend:uat .
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
    }
}
