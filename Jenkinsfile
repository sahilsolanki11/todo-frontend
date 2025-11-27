pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'dev', url: 'https://github.com/sahilsolanki11/todo-frontend.git'
            }
        }

        /* -------------------------------------------
           🔵 UAT BUILD
        -------------------------------------------- */
        stage('Build UAT Docker Image') {
            steps {
                script {
                    echo "⚙️ Generating UAT .env"
                    sh '''
                    rm -f .env
                    echo "REACT_APP_ENV=uat" > .env
                    echo "REACT_APP_API_URL=http://localhost:5001/api" >> .env
                    
                    echo "⚙️ Building Docker image for UAT"
                    docker build -t todo-frontend:uat .
                    '''
                }
            }
        }

        stage('Deploy to UAT') {
            steps {
                script {
                    echo "🚀 Deploying Frontend to UAT (8081)"
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

        /* -------------------------------------------
           🔴 PRODUCTION BUILD
        -------------------------------------------- */
        stage('Build Production Docker Image') {
            steps {
                script {
                    echo "⚙️ Generating Production .env"
                    sh '''
                    rm -f .env
                    echo "REACT_APP_ENV=production" > .env
                    echo "REACT_APP_API_URL=http://localhost:5000/api" >> .env
                    
                    echo "⚙️ Building Docker image for PROD"
                    docker build -t todo-frontend:prod .
                    '''
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    echo "🚀 Deploying Frontend to PRODUCTION (3000)"
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
