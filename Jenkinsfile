node {
	env.NODEJS_HOME = "${tool 'NodeJS 18.12.1'}"
	env.PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
	sh 'node --version'
	sh 'npm --version'
	sh 'corepack enable'
	sh 'corepack prepare yarn@stable --activate'
	sh 'corepack prepare pnpm@latest --activate'
	sh 'yarn --version'
}

def getVersion(){
	def packageJSON = readJSON file: 'info.json'
	def packageJSONVersion = packageJSON.version
	return packageJSONVersion
}

pipeline {
	agent any

	environment {
		DOCKER_CREDS = credentials('docker-creds')
		DOCKER_IMAGE = 'trentshailer/wheel-decider'
		DOCKER_COMPOSE_PROJECT = 'wheel-decider'
	}

	stages {
		stage ('Install Dependencies') {
			steps {
				sh 'cd packages/backend && yarn install'
				sh 'cd packages/frontend && pnpm install'
			}
		}
		stage ('Clean') {
			steps {
				sh 'cd packages/backend && yarn clean'
				sh 'cd packages/frontend && pnpm run clean'
			}
		}
		stage ('Build') {
			steps {
				sh 'cd packages/backend && yarn build'
				sh 'cd packages/frontend && pnpm run build'
			}
		}
		stage ('Move frontend') {
			steps {
				sh 'mkdir packages/backend/dist/frontend'
				sh 'mv packages/frontend/dist/* packages/backend/dist/frontend'
			}
		}
		stage ('Docker Build') {
			steps {
				sh "docker login -u \"$DOCKER_CREDS_USR\" -p \"$DOCKER_CREDS_PSW\""
				sh "docker build -t $DOCKER_IMAGE:${getVersion()} -t $DOCKER_IMAGE:latest ."
			}
		}
		stage ('Docker Push') {
			steps {
				sh "docker push $DOCKER_IMAGE:${getVersion()}"
				sh "docker push $DOCKER_IMAGE:latest"
			}
		}
		stage('Deploy') {
			when {
				expression {
					currentBuild.result == null || currentBuild.result == 'SUCCESS'
				}
			}
			steps {
				sh "docker compose -p $DOCKER_COMPOSE_PROJECT up -d"
			}
		}
	}
}
