pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'npm ci'
            }
        }

        stage('Run Playwright API Tests') {
            steps {
                sh 'npx playwright test --project=api'
            }
        }
    }

    post {
        always {
            allure commandline: 'Allure',
                  includeProperties: false,
                  jdk: '',
                  resultPolicy: 'LEAVE_AS_IS',
                  results: [[path: 'allure-results']]
        }
    }
}
