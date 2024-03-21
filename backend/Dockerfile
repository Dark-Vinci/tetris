FROM golang:1.17-alpine

RUN apk add --no-cache ca-certificates git

ARG app_env
ARG GITHUB_TOKEN
ARG use_service_token
ARG service_token
ARG project
ARG config

# setup the base environment for this service
ENV APP_ENV $app_env
ENV USE_SERVICE_TOKEN $use_service_token
ENV ENV_SERVICE_TOKEN $service_token
ENV ENV_PROJECT $project
ENV ENV_CONFIG $config

ENV APP_PATH=/opt/ovalfi
ENV GOPRIVATE=github.com/dark-vinci/tetris/backend

# Verify GITHUB_TOKEN is set
RUN test -n "$GITHUB_TOKEN" # GITHUB_TOKEN is *required*

# Add the Github token to allow pulling from private, HTTPS-enabled repositories.
RUN echo "machine github.com login $GITHUB_TOKEN" > /root/.netrc \
    && chmod 400 /root/.netrc

RUN touch /tmp/runner-build-errors.log
COPY . /go/src/github.com/dark-vinci/tetris/backend
WORKDIR /go/src/github.com/dark-vinci/tetris/backend/src

#RUN go mod download
RUN go get ./
RUN go build
RUN go get github.com/pilu/fresh

# if dev setting will use pilu/fresh for code reloading via docker-compose volume sharing with local machine
# if production setting will build binary
CMD if [ ${APP_ENV} = production ]; \
	then \
	src; \
	else \
	fresh; \
	fi

EXPOSE 8080



#FROM golang:1.17-alpine
#
#RUN apk add --no-cache ca-certificates git
#
##ARG app_env
##ARG GITHUB_TOKEN
##ARG use_service_token
##ARG service_token
##ARG project
##ARG config
#
## setup the base environment for this service
##ENV APP_ENV $app_env
##ENV USE_SERVICE_TOKEN $use_service_token
##ENV ENV_SERVICE_TOKEN $service_token
##ENV ENV_PROJECT $project
##ENV ENV_CONFIG $config
#
##ENV APP_PATH=/opt/ovalfi
#ENV GOPRIVATE=github.com/dark-vinci/tetris/backend
#
## Verify GITHUB_TOKEN is set
#RUN #test -n "$GITHUB_TOKEN" # GITHUB_TOKEN is *required*
#
## Add the Github token to allow pulling from private, HTTPS-enabled repositories.
#RUN #echo "machine github.com login $GITHUB_TOKEN" > /root/.netrc \
##    && chmod 400 /root/.netrc
#
##RUN #touch /tmp/runner-build-errors.log
#COPY backend /go/src/github.com/dark-vinci/tetris/backend
## ensure the SDK is COPIED
##COPY sdk /go/src/github.com/ovalfi/api-service/sdk
#WORKDIR /go/src/github.com/dark-vinci/tetris/backend
#
##RUN go mod download
#RUN go get ./
#RUN go build
#RUN go get github.com/pilu/fresh
#
## if dev setting will use pilu/fresh for code reloading via docker-compose volume sharing with local machine
## if production setting will build binary
#CMD if [ ${APP_ENV} = production ]; \
#	then \
#	backend; \
#	else \
#	fresh; \
#	fi
#
## Expose only the GRPC server port
#EXPOSE 3001